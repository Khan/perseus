import type {
    MathFormat,
    PerseusInputNumberAnswerType,
    PerseusInputNumberWidgetOptions,
    PerseusNumericInputWidgetOptions,
} from "../../data-schema";

// NOTE: the information in mathFormatsForAnswerType is duplicated in
// score-input-number.ts. I think this is okay because inputNumber is
// deprecated and the scoring logic will be removed as part of this project.
const mathFormatsForAnswerType: Record<
    PerseusInputNumberAnswerType,
    MathFormat[]
> = {
    number: ["integer", "decimal", "proper", "improper", "mixed"],
    decimal: ["decimal"],
    integer: ["integer"],
    rational: ["integer", "proper", "improper", "mixed"],
    improper: ["integer", "proper", "improper"],
    mixed: ["integer", "proper", "mixed"],
    percent: ["integer", "decimal", "proper", "improper", "mixed", "percent"],
    pi: ["pi"],
};

export function convertInputNumberOptionsToNumericInput(
    inputNumberOptions: PerseusInputNumberWidgetOptions,
): PerseusNumericInputWidgetOptions {
    const answerForms: MathFormat[] = inputNumberOptions.answerType
        ? mathFormatsForAnswerType[inputNumberOptions.answerType]
        : ["integer", "proper", "improper", "mixed", "decimal"];

    return {
        coefficient: false,
        rightAlign: inputNumberOptions.rightAlign,
        size: inputNumberOptions.size,
        static: false,
        answers: [
            {
                status: "correct",
                value: Number(inputNumberOptions.value),
                simplify: inputNumberOptions.simplify,
                message: "",
                maxError: getMaxError(inputNumberOptions),
                strict: true,
                answerForms,
            },
        ],
    };
}

function getMaxError(inputNumberOptions: PerseusInputNumberWidgetOptions): number | undefined {
    if (!inputNumberOptions.inexact) {
        return 0;
    }

    if (inputNumberOptions.maxError == null) {
        return undefined;
    }

    return Number(inputNumberOptions.maxError);
}
