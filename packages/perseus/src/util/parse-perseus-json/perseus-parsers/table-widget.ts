import {
    array,
    number,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {TableWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseTableWidget: Parser<TableWidget> = parseWidget(
    constant("table"),
    object({
        headers: array(string),
        rows: number,
        columns: number,
        answers: array(array(string)),
    }),
);
