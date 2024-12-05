import {
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

import type {CategorizerWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseCategorizerWidget: Parser<CategorizerWidget> = parseWidget(
    constant("categorizer"),
    object({
        items: array(string),
        categories: array(string),
        randomizeItems: boolean,
        static: defaulted(boolean, () => false),
        // `values` contains indexes into the `categories` array, which are
        // either compared using ===, or used for array lookups. -1 is
        // equivalent to null for either of these purposes.
        values: array(defaulted(number, () => -1)),
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
