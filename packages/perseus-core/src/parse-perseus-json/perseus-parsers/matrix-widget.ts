import {
    array,
    constant,
    number,
    object,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {stringToNumber} from "../general-purpose-parsers/string-to-number";

import {parseWidget} from "./widget";

const numberOrStringOrNaN = union(number).or(string).or(constant(NaN)).parser;
const numeric = pipeParsers(defaulted(numberOrStringOrNaN, () => NaN)).then(
    stringToNumber,
).parser;

export const parseMatrixWidget = parseWidget(
    defaulted(constant("matrix"), () => "matrix" as const),
    object({
        prefix: defaulted(string, () => ""),
        suffix: defaulted(string, () => ""),
        answers: defaulted(array(array(numeric)), () => []),
        matrixBoardSize: array(number),
    }),
);
