import categorizerWidgetLogic from "../../widgets/categorizer";

import type {
    CategorizerWidget,
    PerseusCategorizerWidgetOptions,
} from "../../data-schema";

export function generateCategorizerOptions(
    options?: Partial<PerseusCategorizerWidgetOptions>,
): PerseusCategorizerWidgetOptions {
    return {
        ...categorizerWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateCategorizerWidget(
    categorizerWidgetProperties?: Partial<Omit<CategorizerWidget, "type">>,
): CategorizerWidget {
    return {
        type: "categorizer",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateCategorizerOptions(),
        ...categorizerWidgetProperties,
    };
}
