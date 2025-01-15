import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {SorterWidget} from "@khanacademy/perseus-core";

export const parseSorterWidget: Parser<SorterWidget> = parseWidget(
    constant("sorter"),
    object({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
