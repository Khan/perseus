import type {PerseusMatrixWidgetOptions} from "@khanacademy/perseus-core";

type MatrixPublicWidgetOptions = Pick<
    PerseusMatrixWidgetOptions,
    "prefix" | "suffix" | "cursorPosition" | "matrixBoardSize" | "static"
>;

export default function getMatrixPublicWidgetOptions(
    options: PerseusMatrixWidgetOptions,
): MatrixPublicWidgetOptions {
    const {answers: _, ...publicOptions} = options;
    return publicOptions;
}
