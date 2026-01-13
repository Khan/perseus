import getMatrixPublicWidgetOptions from "./matrix-util";

import type {MatrixPublicWidgetOptions} from "./matrix-util";
import type {PerseusMatrixWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type MatrixDefaultWidgetOptions = Pick<
    PerseusMatrixWidgetOptions,
    "matrixBoardSize" | "answers" | "prefix" | "suffix" | "cursorPosition"
>;

const defaultWidgetOptions: MatrixDefaultWidgetOptions = {
    matrixBoardSize: [3, 3],
    answers: [[]],
    prefix: "",
    suffix: "",
    cursorPosition: [0, 0],
};

const matrixWidgetLogic: WidgetLogic<
    PerseusMatrixWidgetOptions,
    MatrixPublicWidgetOptions
> = {
    name: "matrix",
    defaultWidgetOptions,
    getPublicWidgetOptions: getMatrixPublicWidgetOptions,
    accessible: false,
};

export default matrixWidgetLogic;
