import type {Draft} from "../domain/draft";
import type {DraftRepository, SkippedDraft} from "../ports/draft-repository";

/** A DraftRepository for use-case tests: no disk, insertion order. */
export function inMemoryRepository(
    skipped: SkippedDraft[] = [],
): DraftRepository {
    const drafts = new Map<string, Draft>();
    return {
        get: (itemId) => drafts.get(itemId),
        list: () => [...drafts.values()],
        save: (draft) => void drafts.set(draft.itemId, draft),
        locationOf: (itemId) => `memory://${itemId}`,
        skipped: () => skipped,
    };
}
