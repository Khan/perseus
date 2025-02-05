import type {PerseusGrapherWidgetOptions} from "@khanacademy/perseus-core";

export default function getGrapherPublicWidgetOptions(
    options: PerseusGrapherWidgetOptions,
) {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}
