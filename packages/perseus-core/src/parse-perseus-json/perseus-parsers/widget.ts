import {
    boolean,
    enumeration,
    nullable,
    number,
    object,
    optional,
    pipeParsers,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

import type {Parser} from "../parser-types";

const parseAlignment = pipeParsers(
    enumeration(
        "default",
        "block",
        "inline-block",
        "inline",
        "wrap-left",
        "wrap-right",
        "full-width",
        "",
        undefined,
    ),
).then(convert((value) => (value === "" ? "default" : value))).parser;

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
) {
    return object({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: parseAlignment,
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
    Type extends string,
    Options extends object,
>(
    parseVersion: Parser<{major: number; minor: number} | undefined>,
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
) {
    return object({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: parseAlignment,
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
