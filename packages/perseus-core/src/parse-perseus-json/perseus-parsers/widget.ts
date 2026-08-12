import {
    boolean,
    enumeration,
    nullable,
    number,
    object,
    optional,
} from "../general-purpose-parsers";

import type {Parser} from "../parser-types";

const parseAlignment = enumeration(
    "default",
    "block",
    "inline-block",
    "inline",
    "wrap-left",
    "wrap-right",
    "full-width",
);

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
) {
    return object({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: optional(parseAlignment),
        options: parseOptions,
        key: optional(nullable(number)),
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
    Options extends object,
>(
    parseVersion: Parser<Version>,
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
) {
    return object({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: optional(parseAlignment),
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
