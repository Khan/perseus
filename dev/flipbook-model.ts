// State type
// ---------------------------------------------------------------------------

import {cache} from "./cache";

import type {PerseusRenderer} from "@khanacademy/perseus";

export type FlipbookModel = {
    questions: string;
    requestedIndex: number;
};

// Actions
// ---------------------------------------------------------------------------

export type Action =
    | {type: "noop"}
    | {type: "next"}
    | {type: "previous"}
    | {type: "set-questions"; questions: string}
    | {type: "remove-current-question"}
    | {type: "jump-to-index"; index: number}
    | {type: "load-questions-from-storage"; questions: string};

export const next: Action = {type: "next"};

export const previous: Action = {type: "previous"};

export const jumpToQuestion = (rawUserInput: string): Action => {
    if (!isPositiveInteger(rawUserInput)) {
        return {type: "noop"};
    }

    return {
        type: "jump-to-index",
        index: parseInt(rawUserInput, 10) - 1,
    };
};

export function setQuestions(questions: string): Action {
    return {type: "set-questions", questions};
}

export function loadQuestionsFromStorage(questions: string): Action {
    return {type: "load-questions-from-storage", questions};
}

export const removeCurrentQuestion: Action = {type: "remove-current-question"};

// Reducer
// ---------------------------------------------------------------------------

export function flipbookModelReducer(
    state: FlipbookModel,
    action: Action,
): FlipbookModel {
    switch (action.type) {
        case "next":
            return updateIndex(state, (index) => index + 1);
        case "previous":
            return updateIndex(state, (index) => index - 1);
        case "jump-to-index":
            return updateIndex(state, () => action.index);
        case "set-questions": {
            return {
                ...state,
                questions: action.questions,
            };
        }
        case "load-questions-from-storage": {
            return state.questions || !action.questions
                ? state
                : {
                      ...state,
                      questions: action.questions,
                  };
        }
        case "remove-current-question": {
            const indexToRemove = selectCurrentQuestionIndex(state);
            return {
                ...state,
                questions: state.questions
                    .split("\n")
                    .filter((_, i) => i !== indexToRemove)
                    .join("\n"),
            };
        }
    }
    return state;
}

// updateIndex immutably updates the `requestedIndex` of the given `state`,
// ensuring that the resulting index is valid and in-bounds.
// The given `update` function is used to determine the new index. The index
// passed to `update` is the current *effective* index, which may be different
// from the requested index. Unlike the requested index, the effective index is
// guaranteed to be in-bounds.
function updateIndex(state: FlipbookModel, update: (index: number) => number) {
    const currIndex = selectCurrentQuestionIndex(state);
    const questions = selectQuestions(state);
    return {
        ...state,
        requestedIndex: clampIndex(update(currIndex), questions),
    };
}

function clampIndex(index: number, array: unknown[]): number {
    if (array.length === 0) {
        return 0;
    }
    if (index < 0) {
        return 0;
    }
    if (index >= array.length) {
        return array.length - 1;
    }
    return index;
}

// Selectors
// ---------------------------------------------------------------------------

const selectQuestionsAsJSON = cache((state: FlipbookModel): string[] => {
    return state.questions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
});

export const selectQuestions = cache(
    (state: FlipbookModel): PerseusRenderer[] => {
        return selectQuestionsAsJSON(state).map(parseQuestion);
    },
);

export const selectCurrentQuestion = cache(
    (state: FlipbookModel): PerseusRenderer | null => {
        const questions = selectQuestions(state);
        return questions[selectCurrentQuestionIndex(state)] ?? null;
    },
);

export const selectCurrentQuestionAsJSON = cache(
    (state: FlipbookModel): string | null => {
        const questions = selectQuestionsAsJSON(state);
        return questions[selectCurrentQuestionIndex(state)] ?? null;
    },
);

export const selectNumQuestions = cache(
    (state: FlipbookModel): number => selectQuestions(state).length,
);

export const selectCurrentQuestionIndex = (state: FlipbookModel): number => {
    return clampIndex(state.requestedIndex, selectQuestions(state));
};

function parseQuestion(json): PerseusRenderer {
    try {
        return JSON.parse(json);
    } catch {
        return {
            content:
                "**Could not parse the JSON for this question.**\n\n```\n" +
                json +
                "\n```",
            widgets: {},
            images: {},
        };
    }
}

function isPositiveInteger(s: string): boolean {
    return /^\d+$/.test(s) && +s > 0;
}
