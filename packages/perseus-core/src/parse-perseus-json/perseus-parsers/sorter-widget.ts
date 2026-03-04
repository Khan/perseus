import {
    array,
    boolean,
    constant,
    enumeration,
    strictObject,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseSorterWidget = parseWidget(
    constant("sorter"),
    strictObject({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
