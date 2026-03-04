import {
    array,
    number,
    constant,
    strictObject,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseTableWidget = parseWidget(
    constant("table"),
    strictObject({
        headers: array(string),
        rows: number,
        columns: number,
        answers: defaulted(array(array(string)), () => []),
    }),
);
