import type {
    ContentDocument,
    Placement,
} from "../domain/search/content-document";
import type {
    Facet,
    HitFields,
    QueryOptions,
} from "../domain/search/content-query";

/** Where content is searched: published content, or the person's drafts. */
export type SearchSource = "published" | "drafts";

/** A source to search, with the filter for it (each filters differently). */
export type SourceQuery = {source: SearchSource; filter: string};

/** Whether search can be used, and what it holds when it can. */
export type SearchStatus =
    | {
          available: true;
          url: string;
          documents: number;
          /** Draft documents, when drafts are indexed. */
          drafts?: number;
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
        /** One source, or several searched together and ranked as one. */
        sources: ReadonlyArray<SourceQuery>;
        options: QueryOptions;
        limit: number;
        offset: number;
        /** Document fields to return besides the hit's own. */
        fields?: ReadonlyArray<keyof ContentDocument>;
    }): Promise<{
        total: number;
        hits: Array<{
            document: HitFields & Partial<ContentDocument>;
            snippet: string;
            source: SearchSource;
        }>;
    }>;
    /**
     * How many matching documents have each value of each facet.
     *
     * @throws SearchUnavailableError
     */
    facets(request: {
        query: string;
        sources: ReadonlyArray<SourceQuery>;
        options: QueryOptions;
        facets: ReadonlyArray<Facet>;
    }): Promise<{
        total: number;
        counts: Partial<Record<Facet, Record<string, number>>>;
    }>;
    /**
     * Where a published item is in the content tree, or undefined if the
     * index has no such item.
     */
    placementOf(contentId: string): Promise<Placement | undefined>;
    /**
     * Every matching published document, up to `limit`, whole.
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

/** The drafts' search index, kept up to date as drafts change. */
export interface DraftSearchIndex {
    /** Replaces every draft document with these. */
    replaceAll(documents: ReadonlyArray<ContentDocument>): Promise<void>;
    /** Adds these, replacing documents with the same ids. */
    upsert(documents: ReadonlyArray<ContentDocument>): Promise<void>;
}
