import type {DraftFeed, DraftListener} from "../ports/draft-feed";
import type {DraftRepository} from "../ports/draft-repository";

/**
 * Wraps a repository so every save is announced on a feed. Wrapping the
 * repository, rather than announcing from each use case, means no change can
 * be saved without its previews hearing about it.
 */
export function withDraftFeed(repository: DraftRepository): {
    drafts: DraftRepository;
    feed: DraftFeed;
} {
    const listeners = new Map<string, Set<DraftListener>>();

    const drafts: DraftRepository = {
        get: (itemId) => repository.get(itemId),
        list: () => repository.list(),
        locationOf: (itemId) => repository.locationOf(itemId),
        skipped: () => repository.skipped(),
        getRevision: (itemId, revision) =>
            repository.getRevision(itemId, revision),
        revisions: (itemId) => repository.revisions(itemId),
        save(draft) {
            repository.save(draft);
            for (const listener of listeners.get(draft.itemId) ?? []) {
                listener(draft);
            }
        },
    };

    const feed: DraftFeed = {
        subscribe(itemId, listener) {
            const forItem = listeners.get(itemId) ?? new Set();
            forItem.add(listener);
            listeners.set(itemId, forItem);
            return () => {
                forItem.delete(listener);
                if (forItem.size === 0) {
                    listeners.delete(itemId);
                }
            };
        },
    };

    return {drafts, feed};
}
