import type {
    PerseusInputNumberAnswer,
    PerseusInputNumberWidgetOptions,
} from "../../data-schema";

type InputNumberAnswerPublicData = Pick<
    PerseusInputNumberAnswer,
    "answerForms" | "simplify" | "status"
>;

export type InputNumberPublicWidgetOptions = {
    labelText?: PerseusInputNumberWidgetOptions["labelText"];
    size: PerseusInputNumberWidgetOptions["size"];
    coefficient: PerseusInputNumberWidgetOptions["coefficient"];
    rightAlign?: PerseusInputNumberWidgetOptions["rightAlign"];
    answers: ReadonlyArray<InputNumberAnswerPublicData>;
};

function getInputNumberAnswerPublicData(
    answer: PerseusInputNumberAnswer,
): InputNumberAnswerPublicData {
    const {answerForms, simplify, status} = answer;
    return {answerForms, simplify, status};
}

export function getInputNumberPublicWidgetOptions(
    options: PerseusInputNumberWidgetOptions,
): InputNumberPublicWidgetOptions {
    const {answers, ...publicWidgetOptions} = options;
    return {
        ...publicWidgetOptions,
        answers: answers.map(getInputNumberAnswerPublicData),
    };
}
