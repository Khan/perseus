import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {string} from "../general-purpose-parsers/string";

import {parseWidget} from "./widget";

import type {CategorizerWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseCategorizerWidget: Parser<CategorizerWidget> = parseWidget(
    constant("categorizer"),
    object({
        items: array(string),
        categories: array(string),
        randomizeItems: boolean,
        static: boolean,
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
