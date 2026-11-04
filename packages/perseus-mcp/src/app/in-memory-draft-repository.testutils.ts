import type {Draft} from "../domain/draft";
import type {DraftRepository, SkippedDraft} from "../ports/draft-repository";

/** A DraftRepository for use-case tests: no disk, insertion order. */
export function inMemoryRepository(
    skipped: SkippedDraft[] = [],
): DraftRepository {
    const drafts = new Map<string, Draft>();
    const history = new Map<string, Draft[]>();
    return {
        get: (itemId) => drafts.get(itemId),
        list: () => [...drafts.values()],
        save(draft) {
            drafts.set(draft.itemId, draft);
            history.set(draft.itemId, [
                ...(history.get(draft.itemId) ?? []),
                draft,
            ]);
        },
        getRevision: (itemId, revision) =>
            history.get(itemId)?.find((d) => d.revision === revision),
        revisions: (itemId) =>
            (history.get(itemId) ?? []).map(
                ({revision, updatedAt, change}) => ({
                    revision,
                    updatedAt,
                    change,
                }),
            ),
        locationOf: (itemId) => `memory://${itemId}`,
        skipped: () => skipped,
    };
}
