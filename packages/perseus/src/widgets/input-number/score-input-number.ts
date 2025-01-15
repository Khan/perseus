import {KhanAnswerTypes} from "@khanacademy/perseus-score";

import TexWrangler from "../../tex-wrangler";

import type {PerseusStrings} from "../../strings";
import type {
    PerseusInputNumberScoringData,
    PerseusInputNumberUserInput,
} from "../../validation.types";
import type {PerseusScore} from "@khanacademy/perseus";

const ParseTex = TexWrangler.parseTex;

export const answerTypes = {
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

function scoreInputNumber(
    userInput: PerseusInputNumberUserInput,
    scoringData: PerseusInputNumberScoringData,
    strings: PerseusStrings,
): PerseusScore {
    if (scoringData.answerType == null) {
        scoringData.answerType = "number";
    }

    // note(matthewc): this will get immediately parsed again by
    // `KhanAnswerTypes.number.convertToPredicate`, but a string is
    // expected here
    const stringValue = `${scoringData.value}`;
    const val = KhanAnswerTypes.number.createValidatorFunctional(stringValue, {
        simplify: scoringData.simplify,
        inexact: scoringData.inexact || undefined,
        maxError: scoringData.maxError,
        forms: answerTypes[scoringData.answerType].forms,
    });

    // We may have received TeX; try to parse it before grading.
    // If `currentValue` is not TeX, this should be a no-op.
    const currentValue = ParseTex(userInput.currentValue);

    const result = val(currentValue);

    if (result.empty) {
        return {
            type: "invalid",
            message: result.message,
        };
    }
    return {
        type: "points",
        earned: result.correct ? 1 : 0,
        total: 1,
        message: result.message,
    };
}

export default scoreInputNumber;
