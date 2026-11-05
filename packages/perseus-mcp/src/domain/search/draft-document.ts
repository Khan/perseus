import {itemContentFields} from "./content-fields";
import {speakAll} from "./math-speech";

import type {ContentDocument, Placement} from "./content-document";
import type {Draft} from "../draft";

/** The search index drafts go in, beside the published content's. */
export const DRAFT_INDEX_UID = "perseus-drafts";

/** An exercise a draft is in, as its search document names it. */
export type DraftExercise = {
    exerciseId: string;
    name: string;
    problemType: string | null;
    /** The published item the draft was imported from, if it was. */
    publishedId?: string;
};

const NO_PLACEMENT: Placement = {
    domain: [],
    domainTitle: [],
    course: [],
    courseTitle: [],
    unit: [],
    unitTitle: [],
    lesson: [],
    lessonTitle: [],
};

/**
 * A draft's search document, built as a published item's is, so drafts are
 * searched the same way. Its exercises give its titles and problem types;
 * its place in the content tree is the published item's it was imported
 * from, when it was. Drafts count as listed: there's nobody they're hidden
 * from.
 */
export function draftDocument(
    draft: Draft,
    exercises: ReadonlyArray<DraftExercise>,
    placement: Placement | undefined,
    speak?: (tex: string) => string,
): ContentDocument & {publishedId?: string} {
    const fields = itemContentFields(draft.item);
    const publishedId = exercises.find(
        (e) => e.publishedId != null,
    )?.publishedId;
    const unique = (values: ReadonlyArray<string>) => [...new Set(values)];
    return {
        id: `draft-${draft.itemId}`,
        kind: "item",
        contentId: draft.itemId,
        title: unique(exercises.map((e) => e.name)),
        url: [],
        listed: true,
        exerciseId: unique(exercises.map((e) => e.exerciseId)),
        problemType: unique(
            exercises.flatMap((e) =>
                e.problemType == null ? [] : [e.problemType],
            ),
        ),
        sourceFile: "",
        snapshotVersion: "",
        ...(placement ?? NO_PLACEMENT),
        ...fields,
        mathSpeech: speak == null ? [] : speakAll(fields.math, speak),
        ...(publishedId != null ? {publishedId} : {}),
    };
}
