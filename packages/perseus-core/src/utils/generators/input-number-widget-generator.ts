import inputNumberWidgetLogic from "../../widgets/input-number";

import type {
    InputNumberWidget,
    PerseusInputNumberWidgetOptions,
    PerseusInputNumberAnswer,
} from "../../data-schema";

export function generateInputNumberWidget(
    inputNumberWidgetProperties?: Partial<
        Omit<InputNumberWidget, "type" | "version">
    >,
): InputNumberWidget {
    return {
        type: "input-number",
        graded: true,
        static: false,
        version: {major: 1, minor: 0},
        options: generateInputNumberOptions(),
        ...inputNumberWidgetProperties,
    };
}

export function generateInputNumberOptions(
    options?: Partial<PerseusInputNumberWidgetOptions>,
): PerseusInputNumberWidgetOptions {
    return {
        ...inputNumberWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateInputNumberAnswer(
    params?: Partial<PerseusInputNumberAnswer>,
): PerseusInputNumberAnswer {
    return {
        ...inputNumberWidgetLogic.defaultWidgetOptions.answers[0],
        ...params,
    };
}
