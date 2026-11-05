import {
    contentIdFilter,
    filterExpression,
    toHit,
    topValues,
} from "../domain/search/content-query";

import {SearchUnavailableError} from "./errors";

import type {ExerciseUseCases, SkippedItem} from "./exercises";
import type {ImportedProblemType} from "../domain/exercises/import-shapes";
import type {ContentDocument} from "../domain/search/content-document";
import type {
    ContentFilters,
    ContentHit,
    Facet,
    QueryOptions,
} from "../domain/search/content-query";
import type {ContentSearch, ContentSource} from "../ports/content-search";

/** The most items one import brings in: the exercise editor reviews 50. */
export const MAX_IMPORT = 50;

export type SearchDependencies = {
    search: ContentSearch;
    content: ContentSource;
    exercises: Pick<ExerciseUseCases, "importItems">;
    /**
     * The content snapshot's folder, when it's set where the server runs;
     * otherwise the one the index says it was built from.
     */
    snapshotDir?: string;
};

/** What an import left out, and why. */
export type SkippedContent = {contentId: string; reason: string};

export function createSearchUseCases(deps: SearchDependencies) {
    const {search} = deps;

    async function snapshotDir(): Promise<string> {
        if (deps.snapshotDir != null) {
            return deps.snapshotDir;
        }
        const status = await search.status();
        if (!status.available) {
            throw new SearchUnavailableError(status.reason);
        }
        if (status.snapshotDir == null) {
            throw new SearchUnavailableError(
                "the index doesn't say which content snapshot it was built " +
                    "from; set PERSEUS_MCP_CONTENT_SNAPSHOT to its folder, " +
                    "or rebuild the index.",
            );
        }
        return status.snapshotDir;
    }

    return {
        status: () => search.status(),

        async searchContent(input: {
            query?: string;
            filters?: ContentFilters;
            options?: QueryOptions;
            limit: number;
            offset?: number;
        }): Promise<{total: number; offset: number; hits: ContentHit[]}> {
            const offset = input.offset ?? 0;
            const result = await search.search({
                query: input.query ?? "",
                filter: filterExpression(input.filters ?? {}),
                options: input.options ?? {},
                limit: input.limit,
                offset,
            });
            return {
                total: result.total,
                offset,
                hits: result.hits.map(({document, snippet}) =>
                    toHit(document, snippet),
                ),
            };
        },

        async facetContent(input: {
            query?: string;
            filters?: ContentFilters;
            options?: QueryOptions;
            facets: ReadonlyArray<Facet>;
            top: number;
        }) {
            const result = await search.facets({
                query: input.query ?? "",
                filter: filterExpression(input.filters ?? {}),
                options: input.options ?? {},
                // Always exercises, to count them.
                facets: [...new Set([...input.facets, "exerciseId" as const])],
            });
            return {
                total: result.total,
                // How many exercises the matching items are in.
                exercises: Object.keys(result.counts.exerciseId ?? {}).length,
                facets: Object.fromEntries(
                    input.facets.map((facet) => [
                        facet,
                        topValues(result.counts[facet] ?? {}, input.top),
                    ]),
                ),
            };
        },

        /**
         * Copies items found by search into drafts, one new exercise per
         * exercise they're from, grouped by problem type. Each draft keeps
         * its item's id as its contentId, so an export writes it back as
         * an edit. Articles aren't items and are skipped.
         */
        async importFromSearch(input: {
            contentIds?: ReadonlyArray<string>;
            query?: string;
            filters?: ContentFilters;
            options?: QueryOptions;
            limit: number;
        }): Promise<{
            matched: number;
            exercises: Array<{
                exerciseId: string;
                name: string;
                fromExerciseId: string;
                imported: number;
            }>;
            skipped: Array<SkippedContent | SkippedItem>;
        }> {
            const filters = input.filters ?? {};
            const filter =
                input.contentIds != null
                    ? [
                          contentIdFilter(input.contentIds),
                          filterExpression({
                              ...filters,
                              // Named items are imported however listed.
                              includeUnlisted: true,
                          }),
                      ]
                          .filter((part) => part !== "")
                          .join(" AND ")
                    : filterExpression(filters);
            const documents = await search.documents({
                query: input.query ?? "",
                filter,
                options: input.options ?? {},
                limit: input.limit,
            });
            const dir = await snapshotDir();

            const skipped: Array<SkippedContent | SkippedItem> = [];
            // By the exercise each item is first in, in the order found.
            const groups = new Map<string, ContentDocument[]>();
            for (const document of documents) {
                const exerciseId = document.exerciseId?.[0];
                if (document.kind !== "item" || exerciseId == null) {
                    skipped.push({
                        contentId: document.contentId,
                        reason: "an article, not an item",
                    });
                    continue;
                }
                groups.set(exerciseId, [
                    ...(groups.get(exerciseId) ?? []),
                    document,
                ]);
            }

            const made: Array<{
                exerciseId: string;
                name: string;
                fromExerciseId: string;
                imported: number;
            }> = [];
            for (const [exerciseId, group] of groups) {
                const problemTypes = new Map<string, ImportedProblemType>();
                for (const document of group) {
                    const itemData = await deps.content.readItem(
                        dir,
                        document.sourceFile,
                        document.contentId,
                    );
                    if (itemData === undefined) {
                        skipped.push({
                            contentId: document.contentId,
                            reason: `not in ${document.sourceFile} in ${dir}`,
                        });
                        continue;
                    }
                    const name = document.problemType?.[0] ?? null;
                    const key = name ?? "";
                    const problemType = problemTypes.get(key) ?? {
                        name,
                        items: [],
                    };
                    problemType.items.push({
                        itemData,
                        contentId: document.contentId,
                    });
                    problemTypes.set(key, problemType);
                }
                if (problemTypes.size === 0) {
                    continue;
                }
                const first = group[0];
                const title = first.title[0] ?? exerciseId;
                const result = deps.exercises.importItems(
                    [...problemTypes.values()],
                    {
                        name: title,
                        notes:
                            `Items of "${title}" (exercise ${exerciseId}, ` +
                            `${first.url[0] ?? ""}) found by content ` +
                            `search in snapshot ${first.snapshotVersion}.`,
                        change: `Imported by search from exercise ${exerciseId}`,
                    },
                );
                skipped.push(...result.skipped);
                made.push({
                    exerciseId: result.exercise.exerciseId,
                    name: result.exercise.name,
                    fromExerciseId: exerciseId,
                    imported: result.imported,
                });
            }
            return {matched: documents.length, exercises: made, skipped};
        },
    };
}

export type SearchUseCases = ReturnType<typeof createSearchUseCases>;
