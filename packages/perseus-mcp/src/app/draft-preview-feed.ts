import {diagramIdsIn} from "../domain/graffiti/diagram";

import type {DraftUseCases} from "./drafts";
import type {GraffitiUseCases} from "./graffiti";
import type {Draft} from "../domain/draft";

/**
 * Calls `listener` with a draft and the latest revision of each diagram it
 * shows: now, after every change to the draft, and after every new revision
 * of one of its diagrams, until the returned function is called. A preview
 * follows this, so a diagram's change shows without the draft changing.
 *
 * @throws DraftNotFoundError
 */
export function watchDraftPreview(
    {
        drafts,
        graffiti,
    }: {
        drafts: Pick<DraftUseCases, "watchItem">;
        graffiti?: Pick<GraffitiUseCases, "latestRevisions" | "watchDiagrams">;
    },
    itemId: string,
    listener: (draft: Draft, diagrams: Record<string, number>) => void,
): () => void {
    let current: Draft | null = null;
    let unfollowDiagrams = () => {};

    function send() {
        if (current != null) {
            const ids = diagramIdsIn(current.item);
            listener(current, graffiti?.latestRevisions(ids) ?? {});
        }
    }

    const unfollowDraft = drafts.watchItem(itemId, (draft) => {
        current = draft;
        // An edit may add or remove diagrams.
        unfollowDiagrams();
        unfollowDiagrams =
            graffiti?.watchDiagrams(diagramIdsIn(draft.item), send) ??
            (() => {});
        send();
    });
    return () => {
        unfollowDraft();
        unfollowDiagrams();
    };
}
