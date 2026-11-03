import {renderChecklist} from "../domain/review/checklist";
import {reviewPrompt} from "../domain/review/procedure";

import {DraftNotFoundError} from "./errors";

import type {DraftRepository} from "../ports/draft-repository";

export type ReviewDependencies = {drafts: DraftRepository};

/** The use cases behind the review prompt and checklist. */
export function createReviewUseCases(deps: ReviewDependencies) {
    return {
        /** @throws DraftNotFoundError */
        reviewPrompt(itemId: string): string {
            if (deps.drafts.get(itemId) == null) {
                throw new DraftNotFoundError(itemId);
            }
            return reviewPrompt(itemId);
        },

        /** The review checklist, as Markdown. */
        checklist(): string {
            return renderChecklist();
        },
    };
}

export type ReviewUseCases = ReturnType<typeof createReviewUseCases>;
