import {
    array,
    boolean,
    constant,
    enumeration,
    looseObject,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

export const parseSorterWidget = parseWidget(
    constant("sorter"),
    looseObject({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
    }),
);
