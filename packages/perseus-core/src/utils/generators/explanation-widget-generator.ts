import explanationWidgetLogic from "../../widgets/explanation";

import type {
    ExplanationWidget,
    PerseusExplanationWidgetOptions,
} from "../../data-schema";

export function generateExplanationOptions(
    options?: Partial<PerseusExplanationWidgetOptions>,
): PerseusExplanationWidgetOptions {
    return {
        ...(explanationWidgetLogic.initializeWidgetOptions?.() as any),
        ...options,
    };
}

export function generateExplanationWidget(
    explanationWidgetProperties?: Partial<Omit<ExplanationWidget, "type">>,
): ExplanationWidget {
    return {
        type: "explanation",
        // Explanations are not graded
        graded: false,
        version: {major: 0, minor: 0},
        // NOTE: The explanation widget doesn't consume this directly,
        // instead, Perseus renders an overlay <div /> over top of the
        // widget that intercepts interactions to it.
        static: false,
        alignment: "default",
        options: generateExplanationOptions(),
        ...explanationWidgetProperties,
    };
}
