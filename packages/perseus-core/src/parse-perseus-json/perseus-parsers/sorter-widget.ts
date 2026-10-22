import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

const parseLegendCap = enumeration("arrow", "bar", "none");

export const parseSorterWidget = parseWidget(
    constant("sorter"),
    object({
        correct: array(string),
        padding: boolean,
        layout: enumeration("horizontal", "vertical"),
        legend: optional(
            object({
                startCap: optional(parseLegendCap),
                endCap: optional(parseLegendCap),
                startLabel: optional(string),
                endLabel: optional(string),
                screenReaderLabel: optional(string),
                position: optional(enumeration("above", "below")),
            }),
        ),
    }),
);
