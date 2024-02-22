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
    | {type: "next"}
    | {type: "previous"}
    | {type: "set-questions"; questions: string};

export const next: Action = {type: "next"};

export const previous: Action = {type: "previous"};

export function setQuestions(questions: string): Action {
    return {type: "set-questions", questions};
}

// Reducer
// ---------------------------------------------------------------------------

export function flipbookModelReducer(
    state: FlipbookModel,
    action: Action,
): FlipbookModel {
    switch (action.type) {
        case "next": {
            return {
                ...state,
                requestedIndex: clampIndex(
                    state.requestedIndex + 1,
                    selectQuestions(state),
                ),
            };
        }
        case "previous": {
            return {
                ...state,
                requestedIndex: clampIndex(
                    state.requestedIndex - 1,
                    selectQuestions(state),
                ),
            };
        }
        case "set-questions": {
            return {
                ...state,
                questions: action.questions,
            };
        }
    }
    return state;
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

export const selectQuestions = cache(
    (state: FlipbookModel): PerseusRenderer[] => {
        return state.questions
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .map(parseQuestion)
            .filter(Boolean);
    },
);

export const selectCurrentQuestion = cache(
    (state: FlipbookModel): PerseusRenderer | null => {
        const questions = selectQuestions(state);
        return questions[clampIndex(state.requestedIndex, questions)] ?? null;
    },
);

// General-purpose
// ---------------------------------------------------------------------------

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
