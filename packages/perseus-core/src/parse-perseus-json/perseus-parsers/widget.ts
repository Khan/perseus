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

function toValidAlignment(alignment: string | undefined) {
    switch (alignment) {
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
    convert(toValidAlignment),
).parser;

/**

 * `static: true` means "render this widget non-interactively, with the correct
 * answer already filled in". It is only supposed to be used for widgets
 * that have a correct answer and accept user input.
 *
 * Non-answerable widgets may still be *interactive*, though.
 * E.g. images zoom in on click. Setting `static: true` for these
 * widgets blocks interactions and is never desired. So we remove
 * the static field here for widgets that mistakenly have it set.
 *
 * Note that this ignores the raw value without validating it. A widget that
 * can't be static doesn't care whether the flag was well-formed, and
 * failing the parse would reject content that renders fine. This matches how
 * `object` silently ignores properties that a schema doesn't mention.
 */
const parseUnsupportedStatic: Parser<boolean | undefined> = (_rawValue, ctx) =>
    ctx.success(undefined);

type WidgetParserOptions = {
    /**
     * Whether `static` is meaningful for this widget. Defaults to `true`; pass
     * `false` for presentational widgets so that `static` parses to
     * `undefined`. See `parseUnsupportedStatic`.
     */
    supportsStatic?: boolean;
};

export function parseWidget<Type extends string, Options extends object>(
    parseType: Parser<Type>,
    parseOptions: Parser<Options>,
    {supportsStatic = true}: WidgetParserOptions = {},
) {
    return object({
        type: parseType,
        static: supportsStatic ? optional(boolean) : parseUnsupportedStatic,
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
    {supportsStatic = true}: WidgetParserOptions = {},
) {
    return object({
        type: parseType,
        static: supportsStatic ? optional(boolean) : parseUnsupportedStatic,
        graded: optional(boolean),
        alignment: parseAlignment,
        options: parseOptions,
        key: optional(nullable(number)),
        version: parseVersion,
    });
}
