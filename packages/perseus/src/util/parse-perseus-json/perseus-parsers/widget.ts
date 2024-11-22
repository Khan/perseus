import {
    boolean,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

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
