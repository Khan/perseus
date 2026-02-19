import gradedGroupWidgetLogic from "../../widgets/graded-group";

import type {
    GradedGroupWidget,
    PerseusGradedGroupWidgetOptions,
} from "../../data-schema";

export function generateGradedGroupOptions(
    options?: Partial<PerseusGradedGroupWidgetOptions>,
): PerseusGradedGroupWidgetOptions {
    return {
        ...(gradedGroupWidgetLogic.initializeWidgetOptions?.() as any),
        ...options,
    };
}

export function generateGradedGroupWidget(
    gradedGroupWidgetProperties?: Partial<Omit<GradedGroupWidget, "type">>,
): GradedGroupWidget {
    return {
        type: "graded-group",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateGradedGroupOptions(),
        ...gradedGroupWidgetProperties,
    };
}
