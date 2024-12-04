import {
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {MatrixWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseMatrixWidget: Parser<MatrixWidget> = parseWidget(
    defaulted(constant("matrix"), () => "matrix"),
    object({
        prefix: optional(string),
        suffix: optional(string),
        answers: array(array(number)),
        cursorPosition: optional(array(number)),
        matrixBoardSize: array(number),
        static: optional(boolean),
    }),
);
