import {CategorizerWidget} from "../../../perseus-types";
import {Parser} from "../parser-types";
import {parseWidget} from "./widget";
import {constant} from "../general-purpose-parsers/constant";
import {object} from "../general-purpose-parsers/object";
import {string} from "../general-purpose-parsers/string";
import {array} from "../general-purpose-parsers/array";
import {boolean} from "../general-purpose-parsers/boolean";
import {number} from "../general-purpose-parsers/number";
import {optional} from "../general-purpose-parsers/optional";

export const parseCategorizerWidget: Parser<CategorizerWidget> = parseWidget(
    constant("categorizer"),
    object({
        items: array(string),
        categories: array(string),
        randomizeItems: boolean,
        static: boolean,
        values: array(number),
        highlightLint: optional(boolean),
        linterContext: optional(object({
            contentType: string,
            paths: array(string),
            stack: array(string),
        }))
    }),
)
