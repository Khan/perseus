import type {PerseusGrapherWidgetOptions} from "@khanacademy/perseus-core";

type GrapherPublicWidgetOptions = Pick<
    PerseusGrapherWidgetOptions,
    "availableTypes" | "graph"
>;

export default function getGrapherPublicWidgetOptions(
    options: PerseusGrapherWidgetOptions,
): GrapherPublicWidgetOptions {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}
