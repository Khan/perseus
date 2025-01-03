import {
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {stringToNumber} from "../general-purpose-parsers/string-to-number";

import {parseWidget} from "./widget";

import type {MatrixWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

const numberOrString = union(number).or(string).parser;
const numeric = pipeParsers(defaulted(numberOrString, () => 0)).then(
    stringToNumber,
).parser;

export const parseMatrixWidget: Parser<MatrixWidget> = parseWidget(
    defaulted(constant("matrix"), () => "matrix"),
    object({
        prefix: optional(string),
        suffix: optional(string),
        answers: array(array(numeric)),
        cursorPosition: optional(array(number)),
        matrixBoardSize: array(number),
        static: optional(boolean),
    }),
);
