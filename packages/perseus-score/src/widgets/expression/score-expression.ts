import * as KAS from "@khanacademy/kas";
import {
    ErrorCodes,
    Errors,
    getDecimalSeparator,
    getDivideSymbol,
    PerseusError,
} from "@khanacademy/perseus-core";

import KhanAnswerTypes from "../../util/answer-types";

import type {Score} from "../../util/answer-types";
import type {
    PerseusExpressionAnswerForm,
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

/**
 * Checks whether the student used variables that don't appear in the answer.
 * Returns an error code describing the mismatch, or undefined if valid.
 */
function getVarError(
    studentVars: string[],
    answerVars: string[],
    extraKeys: readonly string[],
): string | undefined {
    // All student variables must appear in the answer, but the answer may
    // contain variables the student didn't use.
    if (studentVars.every((v) => answerVars.includes(v))) {
        return;
    }

    // The student used at least one variable not in the answer.
    // Check if it's just a casing issue (e.g. "X" instead of "x").
    const studentVarsLower = [
        ...new Set(studentVars.map((v) => v.toLowerCase())),
    ];
    const answerVarsLower = answerVars.map((v) => v.toLowerCase());
    if (studentVarsLower.every((v) => answerVarsLower.includes(v))) {
        return ErrorCodes.WRONG_CASE_ERROR;
    }

    // Check if any of the unrecognized variables aren't accounted for by extraKeys.
    const extraVars = studentVars.filter((v) => !answerVars.includes(v));
    if (extraVars.some((v) => !extraKeys.includes(v))) {
        return ErrorCodes.WRONG_LETTER_ERROR;
    }

    return;
}

/* Content creators input a list of answers which are matched from top to
 * bottom. The intent is that they can include specific solutions which should
 * be graded as correct or incorrect (or ungraded!) first, then get more
 * general.
 *
 * We iterate through each answer, trying to match it with the user's input
 * using the following algorithm:
 * - Try to parse the user's input. If it doesn't parse then return "not
 *   graded".
 * - For each answer:
 *   ~ Try to validate the user's input against the answer. The answer is
 *     expected to parse.
 *   ~ If the user's input validates (the validator judges it "correct"), we've
 *     matched and can stop considering answers.
 * - If there were no matches or the matching answer is considered "ungraded",
 *   show the user an error.
 * - Otherwise, pass through the resulting points and message.
 */
function scoreExpression(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusExpressionUserInput | undefined,
    rubric: PerseusExpressionRubric,
    locale: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const options = {
        ...rubric,
        decimal_separator: getDecimalSeparator(locale),
        divide_symbol: getDivideSymbol(locale),
    };

    const parsedStudent = KAS.parse(userInput, options);
    if (!parsedStudent.parsed) {
        return {
            type: "invalid",
            message: ErrorCodes.EXTRA_SYMBOLS_ERROR,
        };
    }

    const studentVars = parsedStudent.expr.getVars();

    const createValidator = (answer: PerseusExpressionAnswerForm) => {
        // We parse with `rubric` (not `options`) so the solution isn't
        // affected by the student's locale (e.g. a different decimal separator).
        const expression = KAS.parse(answer.value, rubric);
        // An answer may not parse if the expression was defined incorrectly,
        // for example if a symbol from the function variables list was used.
        if (!expression.parsed) {
            /* c8 ignore next */
            throw new PerseusError(
                "Unable to parse solution answer for expression",
                Errors.InvalidInput,
                {metadata: {rubric: JSON.stringify(rubric)}},
            );
        }

        // Check whether the student used variables that don't appear in this answer form.
        // If so, surface the error without penalizing them.
        const varError = getVarError(
            studentVars,
            expression.expr.getVars(),
            rubric.extraKeys ?? [],
        );
        if (varError != null) {
            return (input: string): Score => ({
                correct: false,
                empty: false,
                ungraded: true,
                suppressAlmostThere: true,
                message: varError,
                guess: input,
            });
        }

        return KhanAnswerTypes.expression.createValidatorFunctional(
            expression.expr,
            {...options, simplify: answer.simplify, form: answer.form},
        );
    };

    // Find the first answer form that matches the user's input and that
    // is considered correct. Also, track whether the input is
    // considered "empty" for all answer forms, and keep the validation
    // result for the first answer form for which the user's input was
    // considered "ungraded".
    // (Terminology reminder: the answer forms are provided by the
    // assessment items; they are not the user's input. Each one might
    // represent a correct answer, an incorrect one (if the exercise
    // creator has predicted certain common wrong answers and wants to
    // provide guidance via a message), or an ungraded one (same idea,
    // but without giving the user an incorrect mark for the question).

    let matchingAnswerForm: PerseusExpressionAnswerForm | undefined;
    let matchMessage: string | undefined;
    let allEmpty = true;
    let firstUngradedResult: Score | undefined;
    for (const answerForm of rubric.answerForms ?? []) {
        const validator = createValidator(answerForm);
        if (validator == null) {
            continue;
        }

        const result = validator(userInput);

        // Short-circuit as soon as the user's input matches some answer
        // (independently of whether the answer is correct)
        if (result.correct) {
            matchingAnswerForm = answerForm;
            matchMessage = result.message || "";
            break;
        }

        allEmpty = allEmpty && result.empty;
        // If this answer form is correct and the user's input is considered
        // "ungraded" for it, we'll want to keep the evaluation result for
        // later. If the user's input doesn't match any answer forms, we'll
        // show the message from this validation.
        if (
            answerForm.considered === "correct" &&
            result.ungraded &&
            !firstUngradedResult
        ) {
            firstUngradedResult = result;
        }
    }

    // Now check to see if we matched any answer form at all, and if
    // we did, whether it's considered correct, incorrect, or ungraded
    if (!matchingAnswerForm) {
        if (firstUngradedResult) {
            // While we didn't directly match with any answer form, we
            // did at some point get an "ungraded" validation result,
            // which might indicate e.g. a mismatch in variable casing.
            // We'll return "invalid", which will let the user try again
            // with no penalty, and the hopefully helpful validation
            // message.
            return {
                type: "invalid",
                message: firstUngradedResult.message,
                suppressAlmostThere: firstUngradedResult.suppressAlmostThere,
            };
        }
        if (allEmpty) {
            // If everything graded as empty, it's invalid.
            return {
                type: "invalid",
                message: null,
            };
        }
        // We fell through all the possibilities and we're not empty,
        // so the answer is considered incorrect.
        return {
            type: "points",
            earned: 0,
            total: 1,
        };
    }
    if (matchingAnswerForm.considered === "ungraded") {
        return {
            type: "invalid",
            message: matchMessage,
        };
    }
    // We matched a graded answer form, so we can now tell the user
    // whether their input was correct or incorrect, and hand out
    // points accordingly
    return {
        type: "points",
        earned: matchingAnswerForm.considered === "correct" ? 1 : 0,
        total: 1,
        message: matchMessage,
    };
}

export default scoreExpression;
