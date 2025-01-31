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

const matrixWidgetLogic: WidgetLogic = {
    name: "matrix",
    defaultWidgetOptions,
};

export default matrixWidgetLogic;
