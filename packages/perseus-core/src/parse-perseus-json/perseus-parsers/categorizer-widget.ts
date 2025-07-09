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

export const parseCategorizerWidget = parseWidget(
    constant("categorizer"),
    object({
        items: array(string),
        categories: array(string),
        randomizeItems: defaulted(boolean, () => false),
        static: defaulted(boolean, () => false),
        values: defaulted(array(defaulted(number, () => 0)), () => []),
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
