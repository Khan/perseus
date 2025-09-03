import {getDecimalSeparator, getDivideSymbol} from "@khanacademy/perseus-core";

import KhanAnswerTypes from "../../util/answer-types";
import {parseTex} from "../../util/tex-wrangler";

import type {Score} from "../../util/answer-types";
import type {
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
    PerseusScore,
    MathFormat,
    PerseusNumericInputAnswer,
} from "@khanacademy/perseus-core";

const answerFormButtons: ReadonlyArray<{
    title: string;
    value: MathFormat;
    content: string;
}> = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {
        title: "Improper fractions",
        value: "improper",
        content: "\u2077\u2044\u2084",
    },
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"},
];

// This function checks if the user inputted a percent value, parsing
// it as a number (and maybe scaling) so that it can be graded.
// NOTE(michaelpolyak): Unlike `KhanAnswerTypes.number.percent()` which
// can accept several input forms with or without "%", the decision
// to parse based on the presence of "%" in the input, is so that we
// don't accidently scale the user typed value before grading, CP-930.
export function maybeParsePercentInput(
    inputValue: string | number,
    normalizedAnswerExpected: boolean,
): string | number {
    // If the input value is not a string ending with "%", then there's
    // nothing more to do. The value will be graded as inputted by user.
    if (!(typeof inputValue === "string" && inputValue.endsWith("%"))) {
        return inputValue;
    }

    const value = parseFloat(inputValue.slice(0, -1));
    // If the input value stripped of the "%" cannot be parsed as a
    // number (the slice is not really necessary for parseFloat to work
    // if the string starts with a number) then return the original
    // input for grading.
    if (isNaN(value)) {
        return inputValue;
    }

    // Next, if all correct answers are in the range of |0,1| then we
    // scale the user typed value. We assume this is the correct thing
    // to do since the input value ends with "%".
    if (normalizedAnswerExpected) {
        return value / 100;
    }

    // Otherwise, we return input value (number) stripped of the "%".
    return value;
}

function scoreNumericInput(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusNumericInputUserInput | undefined,
    rubric: PerseusNumericInputRubric,
    locale?: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const defaultAnswerForms = answerFormButtons
        .map((e) => e["value"])
        // Don't default to validating the answer as a pi answer
        // if answerForm isn't set on the answer
        // https://khanacademy.atlassian.net/browse/LC-691
        .filter((e) => e !== "pi");

    const createValidator = (answer: PerseusNumericInputAnswer) => {
        const stringAnswer = `${answer.value}`;

        // Always validate against the provided answer forms (pi, decimal, etc.)
        const validatorForms = [...(answer.answerForms ?? [])];

        // When an answer is set to strict, we validate using ONLY
        // the provided answerForms. If strict is false, or if there
        // were no provided answer forms, we will include all
        // of the default answer forms in our validator.
        if (!answer.strict || validatorForms.length === 0) {
            validatorForms.push(...defaultAnswerForms);
        }

        return KhanAnswerTypes.number.createValidatorFunctional(stringAnswer, {
            message: answer.message,
            simplify:
                answer.status === "correct" ? answer.simplify : "optional",
            inexact: true, // TODO(merlob) backfill / delete
            maxError: answer.maxError,
            forms: validatorForms,
            // Pass locale-specific decimal separator to ensure that
            // we're properly parsing numbers according to the locale.
            ...(locale && {
                decimal_separator: getDecimalSeparator(locale),
                divide_symbol: getDivideSymbol(locale),
            }),
        });
    };

    // We may have received TeX; try to parse it before grading.
    // If `currentValue` is not TeX, this should be a no-op.
    const currentValue = parseTex(userInput.currentValue);

    const normalizedAnswerExpected = rubric.answers
        .filter((answer) => answer.status === "correct")
        .every((answer) => answer.value != null && Math.abs(answer.value) <= 1);

    // The coefficient is an attribute of the widget
    let localValue: string | number = currentValue;
    if (rubric.coefficient) {
        if (!localValue) {
            localValue = 1;
        } else if (localValue === "-") {
            localValue = -1;
        }
    }
    const matchedAnswer:
        | (PerseusNumericInputAnswer & {score: Score})
        | undefined = rubric.answers
        .map((answer) => {
            const validateFn = createValidator(answer);
            const score = validateFn(
                maybeParsePercentInput(localValue, normalizedAnswerExpected),
            );
            return {...answer, score};
        })
        .find((answer) => {
            // NOTE: "answer.score.correct" indicates a match via the validate function.
            //       It does NOT indicate that the answer itself is correct.
            return (
                answer.score.correct ||
                (answer.status === "correct" && answer.score.empty)
            );
        });

    const result: Score =
        matchedAnswer?.status === "correct"
            ? matchedAnswer.score
            : {
                  empty: matchedAnswer?.status === "ungraded",
                  correct: matchedAnswer?.status === "correct",
                  message: matchedAnswer?.message ?? null,
                  guess: localValue,
              };

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

export default scoreNumericInput;
