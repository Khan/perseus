import {
    boolean,
    defaulted,
    nullable,
    number,
    object,
    objectWithAllPropertiesRequired,
    optional,
    string,
} from "../general-purpose-parsers";

import type {WidgetOptions} from "../../data-schema";
import type {Parser} from "../parser-types";

/**
 * When `gradedWhenMissing` is set, a missing or null top-level `graded` field
 * parses to that boolean (explicit `true` / `false` in JSON still wins).
 * When omitted, `graded` is optional and omitted from the parse result if
 * absent — matching historical behavior before `applyDefaultsToWidget`.
 */
function parseGradedField(
    gradedWhenMissing?: boolean,
): Parser<boolean | undefined> {
    if (gradedWhenMissing === undefined) {
        return optional(boolean);
    }
    return defaulted(boolean, () => gradedWhenMissing);
}

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
    gradedWhenMissing?: boolean,
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: parseGradedField(gradedWhenMissing),
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
    gradedWhenMissing?: boolean,
): Parser<WidgetOptions<Type, Options>> {
    return objectWithAllPropertiesRequired({
        type: parseType,
        static: optional(boolean),
        graded: parseGradedField(gradedWhenMissing),
        alignment: optional(string),
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
