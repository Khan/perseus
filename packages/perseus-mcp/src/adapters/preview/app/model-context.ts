// What the in-chat preview tells the model about how the person is using it.
// Hosts keep only the latest description and send it with the person's next
// message, so it describes the whole state, not what changed.
import type {OfferedOptions} from "../page/controls";
import type {HintsState} from "@khanacademy/perseus-preview";

/** The answer the person last checked, and what Perseus made of it. */
export type AnswerCheck = {
    /** The renderer's user input, by widget ID. */
    userInput: unknown;
    /** The result shown to the person, e.g. "Correct." */
    result: string;
};

export type PreviewState = {
    itemId: string;
    revision: number;
    options: OfferedOptions;
    hintsState: HintsState;
    /** Null until the person checks an answer on this revision. */
    lastCheck: AnswerCheck | null;
};

function describeOptions(options: OfferedOptions): string {
    const on = [
        options.isMobile && "as on a phone",
        options.reviewMode && "review mode",
        options.answerless && "without answers",
        options.readOnly && "read only",
        options.showSolutions !== "none" &&
            `showing solutions (${options.showSolutions})`,
    ].filter((option): option is string => typeof option === "string");
    return on.length === 0 ? "none" : on.join(", ");
}

function describeHints({hintsVisible, total}: HintsState): string {
    if (total === 0) {
        return "the item has none";
    }
    return `${hintsVisible} of ${total} revealed`;
}

/** The description of the preview's state that the model gets. */
export function describePreview({
    itemId,
    revision,
    options,
    hintsState,
    lastCheck,
}: PreviewState): string {
    const check =
        lastCheck == null
            ? "The person hasn't checked an answer on this revision."
            : "The person checked this answer: " +
              `${JSON.stringify(lastCheck.userInput)}. ` +
              `Result: ${lastCheck.result}`;
    return [
        `The person is previewing draft ${itemId} (revision ${revision}) ` +
            "in the chat, as a learner would see it.",
        check,
        `Hints: ${describeHints(hintsState)}.`,
        `Preview options on: ${describeOptions(options)}.`,
    ].join("\n");
}
