import {parseItem} from "../domain/items/parse";
import {
    contentIdFilter,
    EXTRA_FIELDS,
    extraAttributes,
    filterExpression,
    partsAt,
    shortenField,
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
    ExtraField,
    Facet,
    QueryOptions,
} from "../domain/search/content-query";
import type {ContentSearch, ContentSource} from "../ports/content-search";

/** The most items one import brings in: the exercise editor reviews 50. */
export const MAX_IMPORT = 50;

/** The most hits a search reads item parts for: each is a file read. */
export const MAX_ITEM_HITS = 10;

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

    /** An item's parts at `pointers`, from its snapshot file, migrated. */
    async function readParts(
        dir: string,
        document: Partial<ContentDocument> & {contentId: string},
        pointers: ReadonlyArray<string>,
    ): Promise<Record<string, unknown>> {
        const raw =
            document.sourceFile == null
                ? undefined
                : await deps.content.readItem(
                      dir,
                      document.sourceFile,
                      document.contentId,
                  );
        const parsed = raw === undefined ? null : parseItem(raw);
        return partsAt(parsed?.ok === true ? parsed.item : null, pointers);
    }

    return {
        status: () => search.status(),

        async searchContent(input: {
            query?: string;
            filters?: ContentFilters;
            options?: QueryOptions;
            /** Index fields to return in full in each hit. */
            fields?: ReadonlyArray<ExtraField>;
            /**
             * JSON Pointers into each item, read from the snapshot: at
             * most MAX_ITEM_HITS hits are returned when given.
             */
            itemPaths?: ReadonlyArray<string>;
            limit: number;
            offset?: number;
        }): Promise<{total: number; offset: number; hits: ContentHit[]}> {
            const offset = input.offset ?? 0;
            const fields = input.fields ?? [];
            const itemPaths = input.itemPaths ?? [];
            const result = await search.search({
                query: input.query ?? "",
                filter: filterExpression(input.filters ?? {}),
                options: input.options ?? {},
                limit:
                    itemPaths.length > 0
                        ? Math.min(input.limit, MAX_ITEM_HITS)
                        : input.limit,
                offset,
                fields: [
                    ...extraAttributes(fields),
                    ...(itemPaths.length > 0 ? ["sourceFile" as const] : []),
                ],
            });
            const dir = itemPaths.length > 0 ? await snapshotDir() : null;
            const hits: ContentHit[] = [];
            for (const {document, snippet} of result.hits) {
                const hit = toHit(document, snippet);
                if (fields.length > 0) {
                    hit.fields = Object.fromEntries(
                        fields.map((field) => [
                            field,
                            field === "exercises"
                                ? (document.exerciseId ?? []).map(
                                      (exerciseId, i) => ({
                                          exerciseId,
                                          title: document.title[i],
                                          problemType:
                                              document.problemType?.[i],
                                      }),
                                  )
                                : shortenField(document[EXTRA_FIELDS[field]]),
                        ]),
                    );
                }
                if (dir != null && document.kind === "item") {
                    hit.item = await readParts(dir, document, itemPaths);
                }
                hits.push(hit);
            }
            return {total: result.total, offset, hits};
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
