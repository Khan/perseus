import * as KAS from "@khanacademy/kas";
import {
    Errors,
    getDecimalSeparator,
    PerseusError,
} from "@khanacademy/perseus-core";
import _ from "underscore";

import ErrorCodes from "../../error-codes";
import KhanAnswerTypes from "../../util/answer-types";

import type {Score} from "../../util/answer-types";
import type {
    PerseusExpressionAnswerForm,
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

/* Content creators input a list of answers which are matched from top to
 * bottom. The intent is that they can include spcific solutions which should
 * be graded as correct or incorrect (or ungraded!) first, then get more
 * general.
 *
 * We iterate through each answer, trying to match it with the user's input
 * using the following angorithm:
 * - Try to parse the user's input. If it doesn't parse then return "not
 *   graded".
 * - For each answer:
 *   ~ Try to validate the user's input against the answer. The answer is
 *     expected to parse.
 *   ~ If the user's input validates (the validator judges it "correct"), we've
 *     matched and can stop considering answers.
 * - If there were no matches or the matching answer is considered "ungraded",
 *   show the user an error. TODO(joel) - what error?
 * - Otherwise, pass through the resulting points and message.
 */
function scoreExpression(
    userInput: PerseusExpressionUserInput,
    rubric: PerseusExpressionRubric,
    locale: string,
): PerseusScore {
    const options = _.clone(rubric);
    _.extend(options, {
        decimal_separator: getDecimalSeparator(locale),
    });

    const userInputExpression = KAS.parse(userInput, options);
    if (!userInputExpression.parsed) {
        return {
            type: "invalid",
            message: ErrorCodes.EXTRA_SYMBOLS_ERROR,
        };
    }

    const createValidator = (answer: PerseusExpressionAnswerForm) => {
        // We give options to KAS.parse here because it is parsing the
        // solution answer, not the student answer, and we don't want a
        // solution to work if the student is using a different language
        // (different from the content creation language, ie. English).
        const expression = KAS.parse(answer.value, rubric);
        // An answer may not be parsed if the expression was defined
        // incorrectly. For example if the answer is using a symbol defined
        // in the function variables list for the expression.
        if (!expression.parsed) {
            /* c8 ignore next */
            throw new PerseusError(
                "Unable to parse solution answer for expression",
                Errors.InvalidInput,
                {metadata: {rubric: JSON.stringify(rubric)}},
            );
        }

        return KhanAnswerTypes.expression.createValidatorFunctional(
            expression.expr,
            _({}).extend(options, {
                simplify: answer.simplify,
                form: answer.form,
            }),
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    for (const answerForm of rubric.answerForms || []) {
        const validator = createValidator(answerForm);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!validator) {
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
