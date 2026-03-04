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

const numberOrString = union(number).or(string).parser;
const numeric = pipeParsers(defaulted(numberOrString, () => NaN)).then(
    stringToNumber,
).parser;

export const parseMatrixWidget = parseWidget(
    defaulted(constant("matrix"), () => "matrix" as const),
    object({
        prefix: optional(string),
        suffix: optional(string),
        answers: defaulted(array(array(numeric)), () => []),
        cursorPosition: optional(array(number)),
        matrixBoardSize: array(number),
        static: optional(boolean),
    }),
);
