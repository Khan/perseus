import {
    DraftNotFoundError,
    ExerciseNotFoundError,
    PreviewUnavailableError,
} from "./errors";

import type {DraftRepository} from "../ports/draft-repository";
import type {ExerciseRepository} from "../ports/exercise-repository";
import type {PreviewLinks} from "../ports/preview-links";

export type PreviewDependencies = {
    drafts: DraftRepository;
    exercises: ExerciseRepository;
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

        /**
         * The URL of an exercise's page: its tree, and a preview of the
         * selected item, following both as they change.
         *
         * @throws ExerciseNotFoundError
         * @throws PreviewUnavailableError
         */
        exerciseUrl(exerciseId: string): string {
            if (deps.exercises.get(exerciseId) == null) {
                throw new ExerciseNotFoundError(exerciseId);
            }
            const url = deps.links.exerciseUrlFor(exerciseId);
            if (url == null) {
                throw new PreviewUnavailableError();
            }
            return url;
        },
    };
}

export type PreviewUseCases = ReturnType<typeof createPreviewUseCases>;
