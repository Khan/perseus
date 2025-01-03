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
        randomizeItems: defaulted(boolean, () => false),
        static: defaulted(boolean, () => false),
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
