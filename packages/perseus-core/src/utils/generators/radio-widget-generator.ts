import radioWidgetLogic from "../../widgets/radio";
import {generateTestPerseusRenderer} from "../test-utils";

import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
    PerseusRenderer,
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

export function generateSingleRadioQuestion(options?: {
    rendererOptions?: Partial<Omit<PerseusRenderer, "widgets">>;
    radioWidgetOptions?: Partial<PerseusRadioWidgetOptions>;
}): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions(options?.radioWidgetOptions),
            }),
        },
        ...options?.rendererOptions,
    });
}
