import type {PerseusMatrixWidgetOptions} from "../../data-schema";

export type MatrixPublicWidgetOptions = Pick<
    PerseusMatrixWidgetOptions,
    "prefix" | "suffix" | "matrixBoardSize"
>;

export function getMatrixPublicWidgetOptions(
    options: PerseusMatrixWidgetOptions,
): MatrixPublicWidgetOptions {
    const {answers, ...publicOptions} = options;
    return publicOptions;
}
