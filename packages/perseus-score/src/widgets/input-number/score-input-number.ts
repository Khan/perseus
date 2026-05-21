import {getDecimalSeparator} from "@khanacademy/perseus-core";

import KhanAnswerTypes from "../../util/answer-types";
import {parseTex} from "../../util/tex-wrangler";

import type {
    PerseusInputNumberRubric,
    PerseusInputNumberUserInput,
    PerseusInputNumberWidgetOptions,
    PerseusScore,
} from "@khanacademy/perseus-core";

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

/**
 * Normalize V1 widget options (with `answers[]`) to V0-style rubric fields so
 * the existing scoring logic can operate on them unchanged.
 */
// FIXME: NO! This is bad!
function toV0Rubric(
    rubric: PerseusInputNumberRubric | PerseusInputNumberWidgetOptions,
): PerseusInputNumberRubric {
    // V1 format has an `answers` array; V0 format has a top-level `value`.
    if ("answers" in rubric && Array.isArray(rubric.answers)) {
        const answer = rubric.answers[0];
        // Reverse-map answerForms back to an answerType.
        const formsKey = answer?.answerForms?.join(", ");
        let answerType: PerseusInputNumberRubric["answerType"] = "number";
        for (const [type, config] of Object.entries(inputNumberAnswerTypes)) {
            if (config.forms === formsKey) {
                // eslint-disable-next-line no-restricted-syntax
                answerType = type as PerseusInputNumberRubric["answerType"];
                break;
            }
        }
        return {
            value: answer?.value ?? 0,
            simplify: answer?.simplify ?? "required",
            answerType,
            inexact:
                answer?.maxError != null && answer.maxError !== 0
                    ? true
                    : undefined,
            maxError: answer?.maxError,
        };
    }
    // eslint-disable-next-line no-restricted-syntax
    return rubric as PerseusInputNumberRubric;
}

function scoreInputNumber(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusInputNumberUserInput | undefined,
    // FIXME: use only PerseusInputNumberRubric here.
    rawRubric: PerseusInputNumberRubric | PerseusInputNumberWidgetOptions,
    locale?: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    // FIXME: NO NO NO!
    const rubric = toV0Rubric(rawRubric);

    if (rubric.answerType == null) {
        rubric.answerType = "number";
    }

    // note(matthewc): this will get immediately parsed again by
    // `KhanAnswerTypes.number.convertToPredicate`, but a string is
    // expected here
    const stringValue = `${rubric.value}`;
    const val = KhanAnswerTypes.number.createValidatorFunctional(stringValue, {
        simplify: rubric.simplify,
        inexact: rubric.inexact || undefined,
        maxError: rubric.maxError,
        forms: inputNumberAnswerTypes[rubric.answerType].forms,
        // Pass locale-specific decimal separator to ensure that
        // we're properly parsing numbers according to the locale.
        ...(locale && {decimal_separator: getDecimalSeparator(locale)}),
    });

    // We may have received TeX; try to parse it before grading.
    // If `currentValue` is not TeX, this should be a no-op.
    const currentValue = parseTex(userInput.currentValue);

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
