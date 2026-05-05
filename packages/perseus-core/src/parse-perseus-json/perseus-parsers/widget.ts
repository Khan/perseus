import {
    boolean,
    defaulted,
    nullable,
    number,
    object,
    objectWithAllPropertiesRequired,
    optional,
    pipeParsers,
    string,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

import type {WidgetOptions} from "../../data-schema";
import type {Parser} from "../parser-types";

/**
 * When `setGradedTo` is provided, `graded` always parses to that boolean.
 */
function parseGradedField(setGradedTo?: boolean): Parser<boolean | undefined> {
    if (setGradedTo === undefined) {
        return optional(boolean);
    }
    return pipeParsers(defaulted(optional(boolean), () => undefined)).then(
        convert(() => setGradedTo),
    ).parser;
}

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
    setGradedTo?: boolean,
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: parseGradedField(setGradedTo),
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
    setGradedTo?: boolean,
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: parseGradedField(setGradedTo),
        alignment: optional(string),
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
