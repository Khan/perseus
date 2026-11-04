import type {Draft} from "../domain/draft";

/** One kept revision of a draft, without its item. */
export type RevisionSummary = {
    revision: number;
    updatedAt: string;
    change?: string;
};

/** A saved draft that couldn't be loaded, and why. */
export type SkippedDraft = {location: string; reason: string};

/** Where drafts are kept between tool calls and restarts. */
export interface DraftRepository {
    get(itemId: string): Draft | undefined;
    /** Every draft, most recently changed first. */
    list(): Draft[];
    /**
     * Adds the draft, or replaces the one with the same `itemId`. Every
     * revision saved is kept, for `getRevision`.
     */
    save(draft: Draft): void;
    /** The draft as it was at `revision`, if that revision was kept. */
    getRevision(itemId: string, revision: number): Draft | undefined;
    /** The draft's kept revisions, oldest first. */
    revisions(itemId: string): RevisionSummary[];
    /**
     * Where the draft is stored (for files, its path), so people can open it
     * themselves.
     */
    locationOf(itemId: string): string;
    /** Saved drafts that couldn't be loaded. */
    skipped(): SkippedDraft[];
}
