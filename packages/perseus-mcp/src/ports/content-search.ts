import type {ContentDocument} from "../domain/search/content-document";
import type {
    Facet,
    HitFields,
    QueryOptions,
} from "../domain/search/content-query";

/** Whether search can be used, and what it holds when it can. */
export type SearchStatus =
    | {
          available: true;
          url: string;
          documents: number;
          snapshotVersion?: string;
          /** The content snapshot the index was built from. */
          snapshotDir?: string;
          builtAt?: string;
      }
    | {
          available: false;
          url: string;
          /** Why not, and how to make it available. */
          reason: string;
      };

/** The content search index: published content, a document per item. */
export interface ContentSearch {
    status(): Promise<SearchStatus>;
    /**
     * Matching documents, best first, with a snippet of each one's text;
     * `total` counts every match, not only those returned.
     *
     * @throws SearchUnavailableError
     */
    search(request: {
        query: string;
        filter: string;
        options: QueryOptions;
        limit: number;
        offset: number;
    }): Promise<{
        total: number;
        hits: Array<{document: HitFields; snippet: string}>;
    }>;
    /**
     * How many matching documents have each value of each facet.
     *
     * @throws SearchUnavailableError
     */
    facets(request: {
        query: string;
        filter: string;
        options: QueryOptions;
        facets: ReadonlyArray<Facet>;
    }): Promise<{
        total: number;
        counts: Partial<Record<Facet, Record<string, number>>>;
    }>;
    /**
     * Every matching document, up to `limit`, whole.
     *
     * @throws SearchUnavailableError
     */
    documents(request: {
        query: string;
        filter: string;
        options: QueryOptions;
        limit: number;
    }): Promise<ContentDocument[]>;
}

/** Reads an item from the content snapshot the index was built from. */
export interface ContentSource {
    /**
     * The item's data from a content file, or undefined when the file or
     * the item isn't there.
     */
    readItem(
        snapshotDir: string,
        sourceFile: string,
        itemId: string,
    ): Promise<unknown>;
}
