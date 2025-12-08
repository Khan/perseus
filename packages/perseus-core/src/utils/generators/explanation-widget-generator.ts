import explanationWidgetLogic from "../../widgets/explanation";

import type {
    ExplanationWidget,
    PerseusExplanationWidgetOptions,
} from "../../data-schema";

export function generateExplanationOptions(
    options?: Partial<PerseusExplanationWidgetOptions>,
): PerseusExplanationWidgetOptions {
    return {
        ...explanationWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateExplanationWidget(
    explanationWidgetProperties?: Partial<Omit<ExplanationWidget, "type">>,
): ExplanationWidget {
    return {
        type: "explanation",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateExplanationOptions(),
        ...explanationWidgetProperties,
    };
}
