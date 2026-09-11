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
 * answer already filled in". That only means something for a widget that takes
 * user input: no user input means no answer to fill in and nothing to freeze.
 * Visual-only widgets have never read the flag, but plenty of existing content
 * data sets it anyway, so we drop it here rather than carry a value whose
 * meaning no widget honors.
 *
 * Note that this accepts any raw value without validating it. A widget that
 * can't be static has no stake in whether the flag was well-formed, and
 * failing the parse would reject content that renders fine. This matches how
 * `object` silently ignores properties that a schema doesn't mention.
 *
 * One caveat: `widget-container` in @khanacademy/perseus applies a generic
 * click-blocking overlay to *any* widget whose `static` is true, without
 * asking the widget. Content that set `static: true` on a visual-only widget
 * with its own affordances (a PhET sim, a measurer's ruler) therefore loses
 * that overlay once the flag is dropped, and the affordance becomes usable
 * again. That combination doesn't appear anywhere in our regression corpus.
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
