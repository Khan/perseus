import {
    boolean,
    defaulted,
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
        // NOTE(benchristel): widgets created before the version field was introduced
        // can be assumed to have a version of 0.0. See:
        // https://github.com/Khan/perseus/blob/5a6ba472afeac1d208e1c7e4e6eb45d132017873/packages/perseus/src/widgets.ts#L221
        version: defaulted(
            object({
                major: number,
                minor: number,
            }),
            () => ({major: 0, minor: 0}),
        ),
    });
}
