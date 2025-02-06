import type {PerseusMatrixWidgetOptions} from "@khanacademy/perseus-core";

export default function getMatrixPublicWidgetOptions(
    options: PerseusMatrixWidgetOptions,
) {
    const {answers: _, ...publicOptions} = options;
    return publicOptions;
}
