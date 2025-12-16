import labelImageWidgetLogic from "../../widgets/label-image";

import type {
    PerseusLabelImageWidgetOptions,
    LabelImageWidget,
} from "../../data-schema";

export function generateLabelImageOptions(
    options?: Partial<PerseusLabelImageWidgetOptions>,
): PerseusLabelImageWidgetOptions {
    return {
        ...labelImageWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateLabelImageWidget(
    labelImageWidgetProperties?: Partial<Omit<LabelImageWidget, "type">>,
): LabelImageWidget {
    return {
        type: "label-image",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateLabelImageOptions(), // default options
        ...labelImageWidgetProperties,
    };
}
