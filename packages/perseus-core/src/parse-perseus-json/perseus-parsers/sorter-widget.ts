import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseSorterWidget = parseWidget(
    constant("sorter"),
    object({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
