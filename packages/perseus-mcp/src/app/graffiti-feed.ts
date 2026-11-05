import type {DiagramListener, GraffitiFeed} from "../ports/graffiti-feed";
import type {GraffitiRepository} from "../ports/graffiti-repository";

/**
 * Wraps a repository so every new revision is announced on a feed, as
 * withDraftFeed does for drafts.
 */
export function withGraffitiFeed(repository: GraffitiRepository): {
    diagrams: GraffitiRepository;
    feed: GraffitiFeed;
} {
    const listeners = new Map<string, Set<DiagramListener>>();

    const diagrams: GraffitiRepository = {
        get: (graffitiId) => repository.get(graffitiId),
        getRevision: (graffitiId, revision) =>
            repository.getRevision(graffitiId, revision),
        list: () => repository.list(),
        save(diagram) {
            repository.save(diagram);
            for (const listener of listeners.get(diagram.graffitiId) ?? []) {
                listener(diagram);
            }
        },
    };

    const feed: GraffitiFeed = {
        subscribe(graffitiId, listener) {
            const forDiagram = listeners.get(graffitiId) ?? new Set();
            forDiagram.add(listener);
            listeners.set(graffitiId, forDiagram);
            return () => {
                forDiagram.delete(listener);
                if (forDiagram.size === 0) {
                    listeners.delete(graffitiId);
                }
            };
        },
    };

    return {diagrams, feed};
}
