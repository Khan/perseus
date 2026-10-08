import {Errors} from "@khanacademy/perseus-core";
import * as React from "react";

import {Log} from "../logging/log";
import {isDifferentQuestion} from "../renderer";
import {isCorrect} from "../util/scoring";

import type {ServerItemRenderer} from "../server-item-renderer";
import type {
    PerseusItem,
    PerseusScore,
    UserInputMap,
} from "@khanacademy/perseus-core";

export type PerseusQuestionResult = {
    score: PerseusScore;
    /**
     * The full item (with answers). Returning it reveals the solutions and
     * finishes the question, even when the answer is incorrect.
     */
    solutions?: PerseusItem;
};

export type PerseusQuestionStatus =
    | {type: "answering"}
    | {type: "checking"}
    | {type: "invalid"; score: Extract<PerseusScore, {type: "invalid"}>}
    | {type: "incorrect"; finished: boolean}
    | {type: "correct"}
    | {type: "error"};

export type UsePerseusQuestionOptions = {
    /**
     * The item to render. May be answerless; if so it must be
     * `splitPerseusItem(fullItem)` so that revealing the solutions keeps the
     * learner's input.
     */
    item: PerseusItem;
    /**
     * Required. Called every time `check()` runs, so you choose where scoring
     * happens (in the browser or on a server). Sync or async.
     */
    onCheck: (
        userInput: UserInputMap,
    ) => PerseusQuestionResult | Promise<PerseusQuestionResult>;
};

/**
 * Returned by `usePerseusQuestion`. Pass it to `<PerseusQuestion>` (and
 * optionally `<PerseusQuestionFeedback>`), and drive your own Check button
 * with `check`, `isChecking` and `isFinished`.
 */
export type PerseusQuestionState = {
    status: PerseusQuestionStatus;
    /** True while `onCheck` is running. Show a spinner on your button. */
    isChecking: boolean;
    /** True once the question is correct or solutions were revealed. */
    isFinished: boolean;
    /** Reads the learner's input and calls `onCheck`. Wire to your button. */
    check: () => Promise<void>;
    /**
     * Used by PerseusQuestion; not part of the public API.
     * @internal
     */
    _internal: {
        item: PerseusItem;
        revealedItem: PerseusItem | null;
        rendererRef: React.RefObject<ServerItemRenderer>;
    };
};

// Lets the result be announced again when a learner re-checks and gets the
// same result (same idea as the delay in radio-widget.tsx).
const ANNOUNCEMENT_DELAY_MS = 100;

const toQuestion = (item: PerseusItem) => ({
    content: item.question.content,
    widgets: item.question.widgets,
    problemNum: 0,
});

/**
 * Owns a question's check / feedback / reveal state, so the host can render
 * its own Check button wherever its design puts it.
 *
 * The host must provide `DependenciesContext` (without it, `generateUrl` and
 * `useVideo` throw, e.g. on any image) and `PerseusI18nContextProvider`.
 */
export function usePerseusQuestion({
    item,
    onCheck,
}: UsePerseusQuestionOptions): PerseusQuestionState {
    const rendererRef = React.useRef<ServerItemRenderer>(null);
    const requestIdRef = React.useRef(0);
    const isMountedRef = React.useRef(false);

    const [status, setStatus] = React.useState<PerseusQuestionStatus>({
        type: "answering",
    });
    const [revealedItem, setRevealedItem] = React.useState<PerseusItem | null>(
        null,
    );
    const [prevItem, setPrevItem] = React.useState(item);

    // Start over when the host passes a different question. This compares
    // content rather than identity, so re-parsing the same JSON on every
    // render doesn't wipe the learner's progress. Only the host's item is
    // compared, never revealedItem.
    if (
        prevItem !== item &&
        isDifferentQuestion(toQuestion(prevItem), toQuestion(item))
    ) {
        setPrevItem(item);
        setStatus({type: "answering"});
        setRevealedItem(null);
    }

    // Drop the result of any check that was in flight for the old question.
    // Done in an effect (not during render) to keep render pure.
    React.useEffect(() => {
        requestIdRef.current++;
    }, [prevItem]);

    React.useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const isChecking = status.type === "checking";
    const isFinished =
        status.type === "correct" ||
        (status.type === "incorrect" && status.finished);

    async function check() {
        const renderer = rendererRef.current;
        if (isChecking || isFinished || !renderer) {
            return;
        }
        const id = ++requestIdRef.current;
        // Clears the previous result so the next one is announced.
        setStatus({type: "checking"});
        const userInput = renderer.getUserInput();

        let nextStatus: PerseusQuestionStatus;
        let solutions: PerseusItem | null = null;
        try {
            // Promise.resolve().then() turns a synchronous throw into a
            // rejection, so both are handled below.
            const result = await Promise.resolve().then(() =>
                onCheck(userInput),
            );
            const {score} = result;
            if (score.type === "invalid") {
                nextStatus = {type: "invalid", score};
            } else if (isCorrect(score)) {
                nextStatus = {type: "correct"};
                solutions = result.solutions ?? null;
            } else {
                solutions = result.solutions ?? null;
                nextStatus = {type: "incorrect", finished: solutions != null};
            }
        } catch (e) {
            Log.error("PerseusQuestion: onCheck failed", Errors.Service, {
                cause: e instanceof Error ? e : undefined,
            });
            nextStatus = {type: "error"};
        }

        await new Promise((resolve) =>
            setTimeout(resolve, ANNOUNCEMENT_DELAY_MS),
        );
        if (id !== requestIdRef.current || !isMountedRef.current) {
            return;
        }
        setRevealedItem(solutions);
        setStatus(nextStatus);
    }

    return {
        status,
        isChecking,
        isFinished,
        check,
        _internal: {item, revealedItem, rendererRef},
    };
}
