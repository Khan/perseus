import radioWidgetLogic from "../../widgets/radio";
import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "../test-utils";

import type {
    PerseusItem,
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
        id: `radio-choice-${Math.random()}`,
        correct: false,
        ...options,
    };
}

/**
 * A simple question (PerseusRenderer) with a single radio widget,
 * in which the `content` is only "[[☃ radio 1]]" and the widget has
 * no properties other than the options.
 */
export function generateSimpleRadioQuestion(
    options?: Partial<PerseusRadioWidgetOptions>,
) {
    return generateTestPerseusRenderer({
        content: "[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions(options),
            }),
        },
    });
}

/**
 * A simple item (PerseusItem) with a single radio widget,
 * in which the `content` is only "[[☃ radio 1]]" and the widget has
 * no properties other than the options.
 */
export function generateSimpleRadioItem(
    options?: Partial<PerseusRadioWidgetOptions>,
): PerseusItem {
    return generateTestPerseusItem({
        question: generateSimpleRadioQuestion(options),
    });
}
