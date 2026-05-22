import type {
    InputNumberWidget,
    PerseusInputNumberAnswer,
    PerseusInputNumberWidgetOptions,
} from "../../data-schema";

// TODO(LEMS-4085): Delete this file.

export function generateInputNumberWidget(
    inputNumberWidgetProperties?: Partial<Omit<InputNumberWidget, "type">>,
): InputNumberWidget {
    return {
        type: "input-number",
        graded: true,
        static: false,
        options: generateInputNumberOptions(),
        ...inputNumberWidgetProperties,
    };
}

export function generateInputNumberAnswer(
    params: Partial<PerseusInputNumberAnswer> = {},
): PerseusInputNumberAnswer {
    return {
        value: 42,
        simplify: "required",
        status: "correct",
        strict: true,
        answerForms: ["integer", "decimal", "proper", "improper", "mixed"],
        message: "",
        maxError: 0,
        ...params,
    };
}

export function generateInputNumberOptions(
    options?: Partial<PerseusInputNumberWidgetOptions>,
): PerseusInputNumberWidgetOptions {
    const defaults: PerseusInputNumberWidgetOptions = {
        answers: [generateInputNumberAnswer()],
        size: "normal",
        coefficient: false,
    };
    // FIXME: can we go back to using `inputNumberWidgetLogic.defaultWidgetOptions` here?
    return {
        ...defaults,
        ...options,
    };
}
