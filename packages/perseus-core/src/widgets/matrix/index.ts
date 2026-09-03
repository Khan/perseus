import {getMatrixPublicWidgetOptions} from "./matrix-util";

import type {MatrixPublicWidgetOptions} from "./matrix-util";
import type {PerseusMatrixWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusMatrixWidgetOptions = {
    matrixBoardSize: [3, 3],
    answers: [[]],
    prefix: "",
    suffix: "",
};

const matrixWidgetLogic = {
    name: "matrix",
    defaultWidgetOptions,
    getPublicWidgetOptions: getMatrixPublicWidgetOptions,
    accessible: false,
} satisfies WidgetLogic<
    "matrix",
    PerseusMatrixWidgetOptions,
    MatrixPublicWidgetOptions
>;

export default matrixWidgetLogic;
