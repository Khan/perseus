import grapherWidgetLogic from "../../widgets/grapher";

import type {
    GrapherWidget,
    PerseusGrapherWidgetOptions,
} from "../../data-schema";

export function generateGrapherWidget(
    options: Partial<PerseusGrapherWidgetOptions> = {},
): GrapherWidget {
    return {
        type: "grapher",
        options: generateGrapherWidgetOptions(options),
    };
}

export function generateGrapherWidgetOptions(
    options: Partial<PerseusGrapherWidgetOptions> = {},
): PerseusGrapherWidgetOptions {
    return {
        ...grapherWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}
