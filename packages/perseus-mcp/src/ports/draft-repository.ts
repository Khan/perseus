import type {Draft} from "../domain/draft";

/** A saved draft that couldn't be loaded, and why. */
export type SkippedDraft = {location: string; reason: string};

/** Where drafts are kept between tool calls and restarts. */
export interface DraftRepository {
    get(itemId: string): Draft | undefined;
    /** Every draft, most recently changed first. */
    list(): Draft[];
    /** Adds the draft, or replaces the one with the same `itemId`. */
    save(draft: Draft): void;
    /**
     * Where the draft is stored (for files, its path), so people can open it
     * themselves.
     */
    locationOf(itemId: string): string;
    /** Saved drafts that couldn't be loaded. */
    skipped(): SkippedDraft[];
}
