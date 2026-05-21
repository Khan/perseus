import type {
    MathFormat,
    PerseusInputNumberAnswerType,
    PerseusInputNumberWidgetOptions,
    PerseusInputNumberWidgetOptionsV0,
} from "../../data-schema";

// FIXME: move to parser, derive return type from parser function type.
export function convertInputNumberOptionsToNumericInput(
    inputNumberOptions: PerseusInputNumberWidgetOptionsV0,
): PerseusInputNumberWidgetOptions {
    // FIXME: use Number.parseFloat here so "" gets converted to NaN, not 0.
    const numericValue = Number(inputNumberOptions.value);
    return {
        coefficient: false,
        rightAlign: inputNumberOptions.rightAlign,
        size: inputNumberOptions.size,
        answers: [
            {
                status: "correct",
                // Use undefined for NaN (e.g. when the original value was a
                // boolean), since NaN is not a valid JSON value and would fail
                // to round-trip through JSON serialization.
                value: Number.isFinite(numericValue) ? numericValue : undefined,
                simplify: inputNumberOptions.simplify,
                message: "",
                maxError: getMaxError(inputNumberOptions),
                strict: true,
                answerForms: getAnswerForms(inputNumberOptions),
            },
        ],
    };
}

function getMaxError(
    inputNumberOptions: PerseusInputNumberWidgetOptionsV0,
): number | undefined {
    if (!inputNumberOptions.inexact) {
        return 0;
    }

    if (inputNumberOptions.maxError == null) {
        return undefined;
    }

    return Number(inputNumberOptions.maxError);
}

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

function getAnswerForms(
    options: PerseusInputNumberWidgetOptionsV0,
): MathFormat[] {
    const value = Number(options.value);
    const {inexact} = options;
    const precision = 1e10;
    const rounded = Math.round(value * precision) / precision;

    const answerType = options.answerType ?? "number";
    if (answerType === "number" && !inexact && !equalFloats(rounded, value)) {
        // Disallow decimal answers when the correct answer has more than 10
        // decimal places. This is for compatibility with legacy input-number
        // behavior.
        return ["proper", "improper", "mixed"];
    }

    return mathFormatsForAnswerType[answerType];
}

function equalFloats(a: number, b: number): boolean {
    return Math.abs(a - b) < Math.pow(2, -42);
}
