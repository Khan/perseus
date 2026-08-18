import {
    boolean,
    nullable,
    number,
    object,
    optional,
    pipeParsers,
    string,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

import type {Parser} from "../parser-types";

function alignmentToValidValue(alignment: string | undefined) {
    switch (alignment) {
        case "":
            return "default";
        case "default":
        case "block":
        case "inline-block":
        case "inline":
        case "wrap-left":
        case "wrap-right":
        case "full-width":
        case undefined:
            return alignment;
        default:
            return "default";
    }
}

const parseAlignment = pipeParsers(optional(string)).then(
    convert(alignmentToValidValue),
).parser;

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
