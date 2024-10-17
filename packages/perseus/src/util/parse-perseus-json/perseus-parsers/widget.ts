import {boolean} from "../general-purpose-parsers/boolean";
import {number} from "../general-purpose-parsers/number";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {string} from "../general-purpose-parsers/string";

import type {WidgetOptions} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export function parseWidget<Type extends string, Options>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
): Parser<WidgetOptions<Type, Options>> {
    return object({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: optional(string),
        options: parseOptions,
        key: optional(number),
        version: object({
            major: number,
            minor: number,
        }),
    });
}
