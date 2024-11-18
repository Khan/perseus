import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {SorterWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseSorterWidget: Parser<SorterWidget> = parseWidget(
    constant("sorter"),
    object({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
