import type {PerseusGrapherWidgetOptions} from "../../data-schema";

export type GrapherPublicWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "availableTypes" | "graph"
>;

export default function getGrapherPublicWidgetOptions(
    options: PerseusGrapherWidgetOptions,
): GrapherPublicWidgetOptions {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}
