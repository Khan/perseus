import type {
    PerseusNumericInputAnswer,
    PerseusNumericInputWidgetOptions,
} from "../../data-schema";

type NumericInputAnswerPublicData = Pick<
    PerseusNumericInputAnswer,
    "answerForms" | "simplify" | "status"
>;

/**
 * For details on the individual options, see the
 * PerseusNumericInputWidgetOptions type
 */
export type NumericInputPublicWidgetOptions = {
    labelText?: PerseusNumericInputWidgetOptions["labelText"];
    size: PerseusNumericInputWidgetOptions["size"];
    coefficient: PerseusNumericInputWidgetOptions["coefficient"];
    rightAlign?: PerseusNumericInputWidgetOptions["rightAlign"];
    static: PerseusNumericInputWidgetOptions["static"];
    answers: ReadonlyArray<NumericInputAnswerPublicData>;
};

/**
 * This data from `answers` is used pre-scoring to give hints
 * to the learner regarding the format of accepted answers
 */
function getNumericInputAnswerPublicData(
    answer: PerseusNumericInputAnswer,
): NumericInputAnswerPublicData {
    const {answerForms, simplify, status} = answer;
    return {
        answerForms,
        simplify,
        status,
    };
}

/**
 * Given a PerseusNumericInputWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getNumericInputPublicWidgetOptions(
    options: PerseusNumericInputWidgetOptions,
): NumericInputPublicWidgetOptions {
    const {answers, ...publicWidgetOptions} = options;
    return {
        ...publicWidgetOptions,
        answers: answers.map(getNumericInputAnswerPublicData),
    };
}

export default getNumericInputPublicWidgetOptions;
