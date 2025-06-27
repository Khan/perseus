import {
    array,
    number,
    constant,
    object,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseTableWidget = parseWidget(
    constant("table"),
    object({
        headers: array(string),
        rows: number,
        columns: number,
        answers: defaulted(array(array(string)), () => []),
    }),
);
