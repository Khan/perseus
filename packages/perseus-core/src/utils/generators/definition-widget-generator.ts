import definitionWidgetLogic from "../../widgets/definition";

import type {
    DefinitionWidget,
    PerseusDefinitionWidgetOptions,
} from "../../data-schema";

export function generateDefinitionOptions(
    options?: Partial<PerseusDefinitionWidgetOptions>,
): PerseusDefinitionWidgetOptions {
    return {
        ...definitionWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateDefinitionWidget(
    definitionWidgetProperties?: Partial<Omit<DefinitionWidget, "type">>,
): DefinitionWidget {
    return {
        type: "definition",
        // Definitions are not graded
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateDefinitionOptions(),
        ...definitionWidgetProperties,
    };
}
