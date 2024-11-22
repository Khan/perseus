import {
    array,
    boolean,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {MatrixWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseMatrixWidget: Parser<MatrixWidget> = parseWidget(
    constant("matrix"),
    object({
        prefix: string,
        suffix: string,
        answers: array(array(number)),
        cursorPosition: array(number),
        matrixBoardSize: array(number),
        static: boolean,
    }),
);
