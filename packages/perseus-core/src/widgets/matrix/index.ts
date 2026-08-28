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
