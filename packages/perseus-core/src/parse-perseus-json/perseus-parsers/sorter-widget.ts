import {
    array,
    boolean,
    constant,
    enumeration,
    object,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

import {parseWidget} from "./widget";

const MAX_SORTER_CARDS = 10;

const parseDeprecatedStandin = parseWidget(
    constant("deprecated-standin"),
    object({}),
);

const parseSorter = pipeParsers(
    parseWidget(
        constant("sorter"),
        object({
            correct: array(string),
            padding: boolean,
            layout: enumeration("horizontal", "vertical"),
        }),
    ),
).then(
    convert((widget) => {
        if (widget.options.correct.length <= MAX_SORTER_CARDS) {
            return widget;
        }

        return {...widget, type: "deprecated-standin" as const, options: {}};
    }),
).parser;

export const parseSorterWidget = union(parseDeprecatedStandin).or(
    parseSorter,
).parser;
