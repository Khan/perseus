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
                startCap: parseLegendCap,
                endCap: parseLegendCap,
                startLabel: string,
                endLabel: string,
                ariaLabel: string,
                position: enumeration("above", "below"),
            }),
        ),
    }),
);
