import TexWrangler from "../../tex-wrangler";
import KhanAnswerTypes from "../../util/answer-types";

import type {Rubric, UserInput} from "./numeric-input.types";
import type {MathFormat, PerseusNumericInputAnswer} from "../../perseus-types";
import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";

const ParseTex = TexWrangler.parseTex;

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

    // Otherwise, we return input valuåe (number) stripped of the "%".
    return value;
}

function numericInputValidator(
    userInput: UserInput,
    rubric: Rubric,
    strings: PerseusStrings,
): PerseusScore {
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

        return KhanAnswerTypes.number.createValidatorFunctional(
            stringAnswer,
            {
                message: answer.message,
                simplify:
                    answer.status === "correct" ? answer.simplify : "optional",
                inexact: true, // TODO(merlob) backfill / delete
                maxError: answer.maxError,
                forms: validatorForms,
            },
            strings,
        );
    };

    // We may have received TeX; try to parse it before grading.
    // If `currentValue` is not TeX, this should be a no-op.
    const currentValue = ParseTex(userInput.currentValue);
    const correctAnswers = rubric.answers.filter(
        (answer) => answer.status === "correct",
    );

    const normalizedAnswerExpected = correctAnswers.every(
        (answer) => Math.abs(answer.value) <= 1,
    );

    // Look through all correct answers for one that matches either
    // precisely or approximately and return the appropriate message:
    // - if precise, return the message that the answer came with
    // - if it needs to be simplified, etc., show that message
    let result = correctAnswers
        .map((answer) => {
            // The coefficient is an attribute of the widget
            let localValue: string | number = currentValue;
            if (rubric.coefficient) {
                if (!localValue) {
                    localValue = 1;
                } else if (localValue === "-") {
                    localValue = -1;
                }
            }
            const validate = createValidator(answer);
            return validate(
                maybeParsePercentInput(localValue, normalizedAnswerExpected),
            );
        })
        .find((match) => match.correct || match.empty);

    if (!result) {
        // Otherwise, if the guess is not correct
        const otherAnswers = [].concat(
            // @ts-expect-error - TS2769 - No overload matches this call.
            rubric.answers.filter((answer) => answer.status === "ungraded"),
            rubric.answers.filter((answer) => answer.status === "wrong"),
        );

        // Look through all other answers and if one matches either
        // precisely or approximately return the answer's message
        const match = otherAnswers.find((answer) => {
            const validate = createValidator(answer);
            return validate(
                maybeParsePercentInput(currentValue, normalizedAnswerExpected),
            ).correct;
        });
        result = {
            // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'never'.
            empty: match ? match.status === "ungraded" : false,
            // @ts-expect-error - TS2339 - Property 'status' does not exist on type 'never'.
            correct: match ? match.status === "correct" : false,
            // @ts-expect-error - TS2339 - Property 'message' does not exist on type 'never'.
            message: match ? match.message : null,
            guess: currentValue,
        };
    }

    // TODO(eater): Seems silly to translate result to this
    // invalid/points thing and immediately translate it
    // back in ItemRenderer.scoreInput()
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

export default numericInputValidator;
