import matrixLogic from "../../widgets/matrix";

import type {MatrixWidget, PerseusMatrixWidgetOptions} from "../../data-schema";

export function generateMatrixOptions(
    options?: Partial<PerseusMatrixWidgetOptions>,
): PerseusMatrixWidgetOptions {
    return {
        ...matrixLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateMatrixWidget(
    matrixWidgetProperties?: Partial<Omit<MatrixWidget, "type">>,
): MatrixWidget {
    return {
        type: "matrix",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateMatrixOptions(),
        ...matrixWidgetProperties,
    };
}
