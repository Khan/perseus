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

export function generateRadioChoices(
    choices: Partial<PerseusRadioChoice>[] | number,
): PerseusRadioChoice[] {
    if (typeof choices === "number") {
        return Array.from({length: choices}, (_, index) => ({
            content: `Choice ${index + 1}`,
            id: `radio-choice-${index}`,
            correct: false,
        }));
    }

    return choices.map((choice, index) => ({
        content: `Choice ${index + 1}`,
        id: `radio-choice-${index}`,
        correct: false,
        ...choice,
    }));
}
