import type {
    PerseusNumericInputAnswer,
    PerseusNumericInputWidgetOptions,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusNumericInputWidgetOptions type
 */
export type NumericInputPublicWidgetOptions = PerseusNumericInputWidgetOptions;

/**
 * This data from `answers` is used pre-scoring to give hints
 * to the learner regarding the format of accepted answers
 */
function getNumericInputAnswerPublicData(
    answer: PerseusNumericInputAnswer,
): PerseusNumericInputAnswer {
    return {
        status: answer.status,
        answerForms: answer.answerForms,
        simplify: answer.simplify,
        value: null,
        strict: false,
        message: "",
    };
}

/**
 * Given a PerseusNumericInputWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getNumericInputPublicWidgetOptions(
    options: PerseusNumericInputWidgetOptions,
): NumericInputPublicWidgetOptions {
    const {answers, ...publicWidgetOptions} = options;
    return {
        ...publicWidgetOptions,
        answers: answers.map(getNumericInputAnswerPublicData),
    };
}
