import {
    array,
    boolean,
    booleanOrFalse,
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import {parseWidget} from "./widget";

import type {CategorizerWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseCategorizerWidget: Parser<CategorizerWidget> = parseWidget(
    constant("categorizer"),
    object({
        items: array(string),
        categories: array(string),
        randomizeItems: booleanOrFalse,
        static: booleanOrFalse,
        values: array(number),
        highlightLint: optional(boolean),
        linterContext: optional(
            object({
                contentType: string,
                paths: array(string),
                stack: array(string),
            }),
        ),
    }),
);
