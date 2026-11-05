import {SearchUnavailableError} from "../../app/errors";
import {
    CONTENT_INDEX_UID,
    CONTENT_META_INDEX_UID,
    INDEX_META_ID,
} from "../../domain/search/content-document";
import {HIT_FIELDS} from "../../domain/search/content-query";

import {createMeilisearchClient, MeilisearchRequestError} from "./meilisearch";

import type {
    ContentDocument,
    IndexMeta,
} from "../../domain/search/content-document";
import type {HitFields} from "../../domain/search/content-query";
import type {ContentSearch, SearchStatus} from "../../ports/content-search";

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
    hits: Array<HitFields & {_formatted?: {text?: unknown}}>;
    facetDistribution?: Record<string, Record<string, number>>;
};

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

    async function search(body: object): Promise<SearchReply> {
        return guarded(() =>
            client.search<SearchReply>(CONTENT_INDEX_UID, body),
        );
    }

    return {
        async status(): Promise<SearchStatus> {
            try {
                const documents = await client.documentCount(CONTENT_INDEX_UID);
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

        async search({query, filter, limit, offset}) {
            const reply = await search({
                q: query,
                filter,
                limit,
                offset,
                attributesToRetrieve: HIT_FIELDS,
                attributesToCrop: ["text"],
                cropLength: SNIPPET_WORDS,
                facets: ["kind"],
            });
            return {
                total: totalOf(reply),
                hits: reply.hits.map((hit) => {
                    const {_formatted: formatted, ...fields} = hit;
                    const snippet = formatted?.text;
                    return {
                        document: fields,
                        snippet: typeof snippet === "string" ? snippet : "",
                    };
                }),
            };
        },

        async facets({query, filter, facets}) {
            const reply = await search({
                q: query,
                filter,
                limit: 0,
                facets: [...new Set(["kind", ...facets])],
            });
            return {
                total: totalOf(reply),
                counts: reply.facetDistribution ?? {},
            };
        },

        async documents({query, filter, limit}) {
            const reply = await guarded(() =>
                client.search<{hits: ContentDocument[]}>(CONTENT_INDEX_UID, {
                    q: query,
                    filter,
                    limit,
                }),
            );
            return reply.hits;
        },
    };
}
