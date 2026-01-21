import numericInputWidgetLogic from "../../widgets/numeric-input";

import type {
    PerseusNumericInputWidgetOptions,
    NumericInputWidget,
    PerseusNumericInputAnswer,
} from "../../data-schema";

export function generateNumericInputOptions(
    options?: Partial<PerseusNumericInputWidgetOptions>,
): PerseusNumericInputWidgetOptions {
    return {
        ...numericInputWidgetLogic.defaultWidgetOptions,
        static: false,
        ...options,
    };
}

export function generateNumericInputAnswer(
    answerOptions?: Partial<PerseusNumericInputAnswer>,
): PerseusNumericInputAnswer {
    return {
        ...numericInputWidgetLogic.defaultWidgetOptions.answers[0],
        ...answerOptions,
    };
}

export function generateNumericInputWidget(
    numericInputWidgetProperties?: Partial<Omit<NumericInputWidget, "type">>,
): NumericInputWidget {
    return {
        type: "numeric-input",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateNumericInputOptions(),
        ...numericInputWidgetProperties,
    };
}
