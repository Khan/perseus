import {
    array,
    boolean,
    constant,
    number,
    looseObject,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";

export const parseCategorizerWidget = parseWidget(
    constant("categorizer"),
    looseObject({
        items: array(string),
        categories: array(string),
        randomizeItems: defaulted(boolean, () => false),
        static: defaulted(boolean, () => false),
        values: defaulted(array(defaulted(number, () => 0)), () => []),
        highlightLint: optional(boolean),
        linterContext: optional(
            looseObject({
                contentType: string,
                paths: array(string),
                stack: array(string),
            }),
        ),
    }),
);
