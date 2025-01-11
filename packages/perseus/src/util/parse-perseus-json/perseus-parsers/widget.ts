import {
    boolean,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import type {Parser} from "../parser-types";
import type {WidgetOptions} from "@khanacademy/perseus-core";

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
        version: optional(
            object({
                major: number,
                minor: number,
            }),
        ),
    });
}

export function parseWidgetWithVersion<
    Version extends {major: number; minor: number} | undefined,
    Type extends string,
    Options,
>(
    parseVersion: Parser<Version>,
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
        version: parseVersion,
    });
}
