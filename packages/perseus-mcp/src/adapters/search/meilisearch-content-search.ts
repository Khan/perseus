import {SearchUnavailableError} from "../../app/errors";
import {
    CONTENT_INDEX_SETTINGS,
    CONTENT_INDEX_UID,
    CONTENT_META_INDEX_UID,
    INDEX_META_ID,
} from "../../domain/search/content-document";
import {HIT_FIELDS, searchedFields} from "../../domain/search/content-query";
import {DRAFT_INDEX_UID} from "../../domain/search/draft-document";

import {createMeilisearchClient, MeilisearchRequestError} from "./meilisearch";

import type {
    ContentDocument,
    IndexMeta,
    Placement,
} from "../../domain/search/content-document";
import type {HitFields, QueryOptions} from "../../domain/search/content-query";
import type {
    ContentSearch,
    DraftSearchIndex,
    SearchSource,
    SearchStatus,
    SourceQuery,
} from "../../ports/content-search";

/** How to start Meilisearch and fill it, for when search isn't available. */
const HOW_TO_START =
    "Start it with `docker run -d --name perseus-search -p " +
    "127.0.0.1:7700:7700 -v perseus-search:/meili_data " +
    "getmeili/meilisearch:v1.15` (or `docker start perseus-search`), then " +
    "build the index with `pnpm --filter @khanacademy/perseus-mcp " +
    "build:search-index <content snapshot folder>` (see perseus-mcp's " +
    "README).";

// Words of the text around the match a snippet shows.
const SNIPPET_WORDS = 30;

type SearchReply = {
    hits: Array<
        HitFields &
            Partial<ContentDocument> & {
                _formatted?: {text?: unknown};
                _federation?: {indexUid: string};
            }
    >;
    facetDistribution?: Record<string, Record<string, number>>;
};

const INDEX_OF: Record<SearchSource, string> = {
    published: CONTENT_INDEX_UID,
    drafts: DRAFT_INDEX_UID,
};

function sourceOf(indexUid: string | undefined): SearchSource {
    return indexUid === DRAFT_INDEX_UID ? "drafts" : "published";
}

const PLACEMENT_FIELDS = [
    "domain",
    "domainTitle",
    "course",
    "courseTitle",
    "unit",
    "unitTitle",
    "lesson",
    "lessonTitle",
] as const satisfies ReadonlyArray<keyof Placement>;

/** Meilisearch's search parameters for how a query matches. */
function matching(query: string, options: QueryOptions): object {
    const fields = searchedFields(options.searchIn);
    return {
        q: query,
        matchingStrategy: options.matchAny === true ? "last" : "all",
        ...(fields != null ? {attributesToSearchOn: fields} : {}),
        ...(options.onePerExercise === true ? {distinct: "exerciseId"} : {}),
    };
}

/** The total from a reply's `kind` counts: exact, unlike its hit count. */
function totalOf(reply: SearchReply): number {
    return Object.values(reply.facetDistribution?.kind ?? {}).reduce(
        (sum, count) => sum + count,
        0,
    );
}

/**
 * Content search in a Meilisearch index built by `build:search-index`.
 * Every call checks nothing in advance: a Meilisearch that isn't running,
 * or has no index, makes the call throw SearchUnavailableError.
 */
export function createMeilisearchContentSearch(options: {
    url: string;
    apiKey?: string;
}): ContentSearch {
    const client = createMeilisearchClient(options);

    /** Why Meilisearch couldn't answer, for a person to act on. */
    function unavailableReason(e: unknown): string | null {
        if (e instanceof MeilisearchRequestError) {
            if (e.code === "index_not_found") {
                return (
                    `Meilisearch at ${options.url} has no content index. ` +
                    HOW_TO_START
                );
            }
            if (e.status === 401 || e.status === 403) {
                return (
                    `Meilisearch at ${options.url} refused the key; set ` +
                    "PERSEUS_MCP_SEARCH_KEY to its master key."
                );
            }
            return null;
        }
        // fetch rejects with a TypeError when nothing answers.
        if (e instanceof TypeError) {
            return `nothing answered at ${options.url}. ${HOW_TO_START}`;
        }
        return null;
    }

    async function guarded<T>(call: () => Promise<T>): Promise<T> {
        try {
            return await call();
        } catch (e) {
            const reason = unavailableReason(e);
            throw reason == null ? e : new SearchUnavailableError(reason);
        }
    }

    /**
     * Searches one source's index, or several federated into one ranked
     * list. `body` is the per-query part; `limit`, `offset` and `facets`
     * go where each kind of search takes them.
     */
    async function search(
        sources: ReadonlyArray<SourceQuery>,
        body: object,
        page: {limit: number; offset?: number; facets: string[]},
    ): Promise<SearchReply> {
        if (sources.length === 1) {
            const [{source, filter}] = sources;
            const reply = await guarded(() =>
                client.search<SearchReply>(INDEX_OF[source], {
                    ...body,
                    filter,
                    ...page,
                }),
            );
            return {
                ...reply,
                hits: reply.hits.map((hit) => ({
                    ...hit,
                    _federation: {indexUid: INDEX_OF[source]},
                })),
            };
        }
        return guarded(() =>
            client.multiSearch<SearchReply>({
                federation: {
                    limit: page.limit,
                    offset: page.offset ?? 0,
                    facetsByIndex: Object.fromEntries(
                        sources.map(({source}) => [
                            INDEX_OF[source],
                            page.facets,
                        ]),
                    ),
                    mergeFacets: {},
                },
                queries: sources.map(({source, filter}) => ({
                    indexUid: INDEX_OF[source],
                    ...body,
                    filter,
                })),
            }),
        );
    }

    return {
        async status(): Promise<SearchStatus> {
            try {
                const documents = await client.documentCount(CONTENT_INDEX_UID);
                const drafts = (await client.indexExists(DRAFT_INDEX_UID))
                    ? await client.documentCount(DRAFT_INDEX_UID)
                    : undefined;
                // An index built before the meta index existed has none.
                const meta = await client
                    .getDocument<IndexMeta>(
                        CONTENT_META_INDEX_UID,
                        INDEX_META_ID,
                    )
                    .catch(() => undefined);
                return {
                    available: true,
                    url: options.url,
                    documents,
                    ...(drafts != null ? {drafts} : {}),
                    snapshotVersion: meta?.snapshotVersion,
                    snapshotDir: meta?.snapshotDir,
                    builtAt: meta?.builtAt,
                };
            } catch (e) {
                return {
                    available: false,
                    url: options.url,
                    reason:
                        unavailableReason(e) ??
                        (e instanceof Error ? e.message : String(e)),
                };
            }
        },

        async search({
            query,
            sources,
            options: queryOptions,
            limit,
            offset,
            fields = [],
        }) {
            const reply = await search(
                sources,
                {
                    ...matching(query, queryOptions),
                    attributesToRetrieve: [
                        ...new Set([...HIT_FIELDS, ...fields]),
                    ],
                    attributesToCrop: ["text"],
                    cropLength: SNIPPET_WORDS,
                },
                {limit, offset, facets: ["kind"]},
            );
            return {
                total: totalOf(reply),
                hits: reply.hits.map((hit) => {
                    const {
                        _formatted: formatted,
                        _federation: federation,
                        ...fields
                    } = hit;
                    const snippet = formatted?.text;
                    return {
                        document: fields,
                        snippet: typeof snippet === "string" ? snippet : "",
                        source: sourceOf(federation?.indexUid),
                    };
                }),
            };
        },

        async facets({query, sources, options: queryOptions, facets}) {
            const reply = await search(sources, matching(query, queryOptions), {
                limit: 0,
                facets: [...new Set(["kind", ...facets])],
            });
            return {
                total: totalOf(reply),
                counts: reply.facetDistribution ?? {},
            };
        },

        async placementOf(contentId) {
            const document = await guarded(() =>
                client.getDocument<Placement>(
                    CONTENT_INDEX_UID,
                    `item-${contentId}`,
                ),
            );
            if (document == null) {
                return undefined;
            }
            const placement: Placement = {
                domain: [],
                domainTitle: [],
                course: [],
                courseTitle: [],
                unit: [],
                unitTitle: [],
                lesson: [],
                lessonTitle: [],
            };
            for (const field of PLACEMENT_FIELDS) {
                placement[field] = document[field] ?? [];
            }
            return placement;
        },

        async documents({query, filter, options: queryOptions, limit}) {
            const reply = await guarded(() =>
                client.search<{hits: ContentDocument[]}>(CONTENT_INDEX_UID, {
                    ...matching(query, queryOptions),
                    filter,
                    limit,
                }),
            );
            return reply.hits;
        },
    };
}

/** How many draft documents go in one request. */
const DRAFT_BATCH = 500;

/**
 * The drafts' index in Meilisearch, made with the published index's
 * settings the first time it's written to.
 */
export function createMeilisearchDraftIndex(options: {
    url: string;
    apiKey?: string;
}): DraftSearchIndex {
    const client = createMeilisearchClient(options);
    let ready: Promise<void> | null = null;

    function ensureIndex(): Promise<void> {
        ready ??= (async () => {
            if (!(await client.indexExists(DRAFT_INDEX_UID))) {
                await client.createIndex(DRAFT_INDEX_UID, "id");
            }
            await client.updateSettings(
                DRAFT_INDEX_UID,
                CONTENT_INDEX_SETTINGS,
            );
        })().catch((e: unknown) => {
            // Try again next time: Meilisearch may start later.
            ready = null;
            throw e;
        });
        return ready;
    }

    async function add(documents: ReadonlyArray<ContentDocument>) {
        for (let i = 0; i < documents.length; i += DRAFT_BATCH) {
            await client.waitForTask(
                await client.addDocuments(
                    DRAFT_INDEX_UID,
                    documents.slice(i, i + DRAFT_BATCH),
                ),
            );
        }
    }

    return {
        async replaceAll(documents) {
            await ensureIndex();
            await client.deleteAllDocuments(DRAFT_INDEX_UID);
            await add(documents);
        },
        async upsert(documents) {
            await ensureIndex();
            await add(documents);
        },
    };
}
