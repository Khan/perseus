import radioWidgetLogic from "../../widgets/radio";

import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
    RadioWidget,
} from "../../data-schema";

export function generateRadioOptions(
    options?: Partial<PerseusRadioWidgetOptions>,
): PerseusRadioWidgetOptions {
    return {
        ...radioWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateRadioWidget(
    radioWidgetProperties?: Partial<Omit<RadioWidget, "type">>,
): RadioWidget {
    return {
        type: "radio",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateRadioOptions(), // default options
        ...radioWidgetProperties,
    };
}

export function generateRadioChoice(
    text: string,
    options?: Partial<PerseusRadioChoice>,
): PerseusRadioChoice {
    return {
        content: text,
        id: `radio-choice-${text}`,
        correct: false,
        ...options,
    };
}
