import {diagramIdsIn} from "../domain/graffiti/diagram";
import {validateItem} from "../domain/items/validate";
import {checklistFor, renderChecklist} from "../domain/review/checklist";
import {reviewProcedure, reviewPrompt} from "../domain/review/procedure";
import {itemContentFields} from "../domain/search/content-fields";

import {DraftNotFoundError} from "./errors";

import type {Catalog} from "./catalog";
import type {GraffitiUseCases} from "./graffiti";
import type {Issue} from "../domain/items/validate";
import type {ChecklistEntry} from "../domain/review/checklist";
import type {DraftRepository} from "../ports/draft-repository";

export type ReviewDependencies = {
    drafts: DraftRepository;
    catalog: Catalog;
    /** Checks the Graffiti diagrams an item shows, when there are diagrams. */
    diagrams?: Pick<GraffitiUseCases, "checkDiagrams">;
};

/** What review_item gives the agent for one draft. */
export type ItemReview = {
    itemId: string;
    revision: number;
    procedure: string;
    /** validate_item's issues for this revision. */
    issues: Issue[];
    /** The checklist entries that apply, without the issue codes. */
    checklist: Array<Omit<ChecklistEntry, "issueCodes">>;
    /** What the item's diagrams should fix, if anything. */
    diagrams?: Array<{graffitiId: string; problems: string[]}>;
};

/** The use cases behind reviewing a draft: the tool, prompt and checklist. */
export function createReviewUseCases(deps: ReviewDependencies) {
    function getDraft(itemId: string) {
        const draft = deps.drafts.get(itemId);
        if (draft == null) {
            throw new DraftNotFoundError(itemId);
        }
        return draft;
    }

    return {
        /**
         * The review procedure for a draft, with its validation issues and
         * the checklist entries it needs, for the review_item tool.
         *
         * @throws DraftNotFoundError
         */
        async reviewItem(itemId: string): Promise<ItemReview> {
            const draft = getDraft(itemId);
            const {issues} = validateItem(draft.item, deps.catalog.widgets());
            const diagrams =
                (await deps.diagrams?.checkDiagrams(
                    diagramIdsIn(draft.item),
                )) ?? [];
            return {
                itemId,
                revision: draft.revision,
                procedure: reviewProcedure(itemId),
                issues,
                checklist: checklistFor(
                    issues.map((issue) => issue.code),
                    {
                        hasImages: itemContentFields(draft.item).imageCount > 0,
                    },
                ).map(({issueCodes: _, forImages: __, ...entry}) => entry),
                ...(diagrams.length > 0 && {diagrams}),
            };
        },

        /** @throws DraftNotFoundError */
        reviewPrompt(itemId: string): string {
            getDraft(itemId);
            return reviewPrompt(itemId);
        },

        /** The review checklist, as Markdown. */
        checklist(): string {
            return renderChecklist();
        },
    };
}

export type ReviewUseCases = ReturnType<typeof createReviewUseCases>;
