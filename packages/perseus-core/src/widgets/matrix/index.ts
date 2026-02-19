import getMatrixPublicWidgetOptions from "./matrix-util";

import type {PerseusMatrixWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type MatrixDefaultWidgetOptions = Pick<
    PerseusMatrixWidgetOptions,
    "matrixBoardSize" | "answers" | "prefix" | "suffix" | "cursorPosition"
>;

function initializeWidgetOptions(): MatrixDefaultWidgetOptions {
    return {
        matrixBoardSize: [3, 3],
        answers: [[]],
        prefix: "",
        suffix: "",
        cursorPosition: [0, 0],
    };
}

const matrixWidgetLogic: WidgetLogic<MatrixDefaultWidgetOptions> = {
    name: "matrix",
    initializeWidgetOptions,
    getPublicWidgetOptions: getMatrixPublicWidgetOptions,
    accessible: false,
};

export default matrixWidgetLogic;
