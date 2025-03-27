import type {TableWidget} from "../../data-schema";
import {
    array,
    constant,
    number,
    object,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseTableWidget: Parser<TableWidget> = parseWidget(
    constant("table"),
    object({
        headers: array(string),
        rows: number,
        columns: number,
        answers: array(array(string)),
    }),
);
