import type {SorterWidget} from "../../data-schema";
import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    string,
} from "../general-purpose-parsers";
import type {Parser} from "../parser-types";
import {parseWidget} from "./widget";

export const parseSorterWidget: Parser<SorterWidget> = parseWidget(
    constant("sorter"),
    object({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
