import grapherWidgetLogic from "../../widgets/grapher";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";

export function generateGrapherWidgetOptions(
    options: Partial<PerseusGrapherWidgetOptions> = {},
): PerseusGrapherWidgetOptions {
    return {
        ...grapherWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}
