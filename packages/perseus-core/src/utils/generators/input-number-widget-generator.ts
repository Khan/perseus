import inputNumberWidgetLogic from "../../widgets/input-number";

import type {
    InputNumberWidget,
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

export function generateInputNumberOptions(
    options?: Partial<PerseusInputNumberWidgetOptions>,
): PerseusInputNumberWidgetOptions {
    return {
        ...inputNumberWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}
