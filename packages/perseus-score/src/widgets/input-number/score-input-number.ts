import {convertInputNumberOptionsToNumericInput} from "@khanacademy/perseus-core";

import scoreNumericInput from "../numeric-input/score-numeric-input";

import type {
    PerseusInputNumberUserInput,
    PerseusScore,
    PerseusInputNumberWidgetOptions,
} from "@khanacademy/perseus-core";

// TODO(LEMS-4085): Delete inputNumberAnswerTypes.
export const inputNumberAnswerTypes = {
    number: {
        name: "Numbers",
        forms: "integer, decimal, proper, improper, mixed",
    },
    decimal: {
        name: "Decimals",
        forms: "decimal",
    },
    integer: {
        name: "Integers",
        forms: "integer",
    },
    rational: {
        name: "Fractions and mixed numbers",
        forms: "integer, proper, improper, mixed",
    },
    improper: {
        name: "Improper numbers (no mixed)",
        forms: "integer, proper, improper",
    },
    mixed: {
        name: "Mixed numbers (no improper)",
        forms: "integer, proper, mixed",
    },
    percent: {
        name: "Numbers or percents",
        forms: "integer, decimal, proper, improper, mixed, percent",
    },
    pi: {
        name: "Numbers with pi",
        forms: "pi",
    },
} as const;

// TODO(LEMS-4085): Delete; scoreInputNumber will be replaced by
//  scoreNumericInput in the registry once the parser migrates input-number
//  widget options to a numeric-input compatible form.
function scoreInputNumber(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusInputNumberUserInput | undefined,
    rubric: PerseusInputNumberWidgetOptions,
    locale?: string,
): PerseusScore {
    return scoreNumericInput(
        userInput,
        convertInputNumberOptionsToNumericInput(rubric),
        locale,
    );
}

export default scoreInputNumber;
