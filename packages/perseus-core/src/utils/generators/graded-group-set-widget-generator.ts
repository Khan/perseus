import gradedGroupSetWidgetLogic from "../../widgets/graded-group-set";

import type {
    GradedGroupSetWidget,
    PerseusGradedGroupSetWidgetOptions,
} from "../../data-schema";

export function generateGradedGroupSetOptions(
    options?: Partial<PerseusGradedGroupSetWidgetOptions>,
): PerseusGradedGroupSetWidgetOptions {
    return {
        ...gradedGroupSetWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateGradedGroupSetWidget(
    gradedGroupSetWidgetProperties?: Partial<
        Omit<GradedGroupSetWidget, "type">
    >,
): GradedGroupSetWidget {
    return {
        type: "graded-group-set",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateGradedGroupSetOptions(),
        ...gradedGroupSetWidgetProperties,
    };
}
