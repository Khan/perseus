import type {Draft} from "../domain/draft";

export type DraftListener = (draft: Draft) => void;

/** Tells interested parties (such as open previews) when a draft changes. */
export interface DraftFeed {
    /**
     * Calls `listener` with the draft each time it's saved, until the
     * returned function is called.
     */
    subscribe(itemId: string, listener: DraftListener): () => void;
}
