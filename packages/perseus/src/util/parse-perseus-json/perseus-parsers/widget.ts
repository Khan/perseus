import {Parser} from "../parser-types";
import {WidgetOptions} from "../../../perseus-types";
import {object} from "../general-purpose-parsers/object";
import {optional} from "../general-purpose-parsers/optional";
import {boolean} from "../general-purpose-parsers/boolean";
import {string} from "../general-purpose-parsers/string";
import {number} from "../general-purpose-parsers/number";

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
        })
    })
}
