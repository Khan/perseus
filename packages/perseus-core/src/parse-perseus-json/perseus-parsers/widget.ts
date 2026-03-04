import {
    boolean,
    nullable,
    number,
    object,
    objectWithAllPropertiesRequired,
    optional,
    string,
} from "../general-purpose-parsers";

import type {WidgetOptions} from "../../data-schema";
import type {Parser} from "../parser-types";

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: optional(string),
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
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: optional(boolean),
        alignment: optional(string),
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
