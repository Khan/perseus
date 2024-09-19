import TexWrangler from "../../tex-wrangler";
import KhanAnswerTypes from "../../util/answer-types";

import type {Rubric} from "./input-number.types";
import type {PerseusStrings} from "../../strings";
import type {APIOptions, PerseusScore} from "@khanacademy/perseus";

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

function inputNumberValidator(
    state: {
        currentValue: string;
    },
    rubric: Rubric,
    strings: PerseusStrings,
    onInputError: APIOptions["onInputError"] = () => {},
): PerseusScore {
    if (rubric.answerType == null) {
        rubric.answerType = "number";
    }

    // note(matthewc): this will get immediately parsed again by
    // `KhanAnswerTypes.number.convertToPredicate`, but a string is
    // expected here
    const stringValue = `${rubric.value}`;
    const val = KhanAnswerTypes.number.createValidatorFunctional(
        stringValue,
        {
            simplify: rubric.simplify,
            inexact: rubric.inexact || undefined,
            maxError: rubric.maxError,
            forms: answerTypes[rubric.answerType].forms,
        },
        strings,
    );

    // We may have received TeX; try to parse it before grading.
    // If `currentValue` is not TeX, this should be a no-op.
    const currentValue = ParseTex(state.currentValue);

    const result = val(currentValue);

    // TODO(eater): Seems silly to translate result to this invalid/points
    // thing and immediately translate it back in ItemRenderer.scoreInput()
    if (result.empty) {
        // TODO(FEI-3867): remove null-check once we have APIOptionsInternal
        const apiResult = onInputError?.(
            null, // reserved for some widget identifier
            state.currentValue,
            result.message,
        );
        return {
            type: "invalid",
            message: apiResult === false ? null : result.message,
        };
    }
    return {
        type: "points",
        earned: result.correct ? 1 : 0,
        total: 1,
        message: result.message,
    };
}

export default inputNumberValidator;
