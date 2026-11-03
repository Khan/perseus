import {DraftNotFoundError, PreviewUnavailableError} from "./errors";

import type {DraftRepository} from "../ports/draft-repository";
import type {PreviewLinks} from "../ports/preview-links";

export type PreviewDependencies = {
    drafts: DraftRepository;
    links: PreviewLinks;
};

/** The use cases behind the draft preview. */
export function createPreviewUseCases(deps: PreviewDependencies) {
    return {
        /**
         * The URL of a draft's preview page, which follows the draft as it
         * changes.
         *
         * @throws DraftNotFoundError
         * @throws PreviewUnavailableError
         */
        previewUrl(itemId: string): string {
            if (deps.drafts.get(itemId) == null) {
                throw new DraftNotFoundError(itemId);
            }
            const url = deps.links.urlFor(itemId);
            if (url == null) {
                throw new PreviewUnavailableError();
            }
            return url;
        },
    };
}

export type PreviewUseCases = ReturnType<typeof createPreviewUseCases>;
