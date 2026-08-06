import type {PerseusGrapherWidgetOptions} from "../../data-schema";

export type GrapherPublicWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "availableTypes" | "graph"
>;

export function getGrapherPublicWidgetOptions(
    options: PerseusGrapherWidgetOptions,
): GrapherPublicWidgetOptions {
    const {correct, ...publicOptions} = options;
    return publicOptions;
}
