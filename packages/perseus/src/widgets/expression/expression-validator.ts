import * as KAS from "@khanacademy/kas";
import {Errors} from "@khanacademy/perseus-core";
import _ from "underscore";

import {Log} from "../../logging/log";
import KhanAnswerTypes from "../../util/answer-types";

import getDecimalSeparator from "./get-decimal-separator";

import type {Rubric, OnInputErrorFunctionType} from "./expression.d";
import type {PerseusExpressionAnswerForm} from "../../perseus-types";
import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";

export default function validate(
    userInput: string,
    rubric: Rubric,
    // @ts-expect-error - TS2322 - Type '() => void' is not assignable to type 'OnInputErrorFunctionType'.
    onInputError: OnInputErrorFunctionType = function () {},
    strings: PerseusStrings,
    locale: string,
): PerseusScore {
    const options = _.clone(rubric);
    _.extend(options, {
        decimal_separator: getDecimalSeparator(locale),
    });

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
            Log.error(
                "Unable to parse solution answer for expression",
                Errors.InvalidInput,
                {loggedMetadata: {rubric: JSON.stringify(rubric)}},
            );
            return null;
        }
        return KhanAnswerTypes.expression.createValidatorFunctional(
            expression.expr,
            _({}).extend(options, {
                simplify: answer.simplify,
                form: answer.form,
            }),
            strings,
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
    let matchingAnswerForm;
    let matchMessage;
    let allEmpty = true;
    let firstUngradedResult;
    for (const answerForm of rubric.answerForms || []) {
        const validate = createValidator(answerForm);
        if (!validate) {
            continue;
        }

        const result = validate(userInput);

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
        // We matched an ungraded answer form - return "invalid", which
        // will let the user try again with no penalty
        const apiResult = onInputError(
            null, // Reserved for some widget identifier
            userInput,
            matchMessage,
        );
        return {
            type: "invalid",
            message: apiResult === false ? null : matchMessage,
        };
    }
    // We matched a graded answer form, so we can now tell the user
    // whether their input was correct or incorrect, and hand out
    // points accordingly
    // TODO(eater): Seems silly to translate result to this
    // invalid/points thing and immediately translate it back in
    // ItemRenderer.scoreInput()
    return {
        type: "points",
        earned: matchingAnswerForm.considered === "correct" ? 1 : 0,
        total: 1,
        message: matchMessage,
    };
}
