import {pair, string} from "../general-purpose-parsers";

import type {Parser} from "../parser-types";

/**
 * Parses a string representation of a non-negative integer.
 *
 * This parser is used for the numeric part of widget IDs (e.g., the "1" in "radio 1").
 * It accepts string representations of non-negative integers, including "0".
 *
 * Note: The article renderer allows widget IDs with 0 (at least for image widgets),
 * but if widget IDs in an exercise contain 0, the exercise renderer may have issues.
 * We allow 0 here for compatibility with articles.
 *
 * @param rawValue - The raw value to parse, expected to be a string
 * @param ctx - The parse context for error reporting
 * @returns A ParseResult containing either the parsed number or an error
 */
export const parseStringToNonNegativeInt: Parser<number> = (rawValue, ctx) => {
    // The article renderer seems to allow the numeric part of a widget ID to
    // be 0, at least for image widgets. However, if widget IDs in an exercise
    // contain 0, the exercise renderer will blow up. We allow 0 here for
    // compatibility with articles.
    if (typeof rawValue !== "string" || !/^(0|[1-9][0-9]*)$/.test(rawValue)) {
        return ctx.failure(
            "a string representing a non-negative integer",
            rawValue,
        );
    }
    return ctx.success(+rawValue);
};

/**
 * Parses widget ID components into a [type, number] tuple.
 *
 * Widget IDs in Perseus follow the format "{type} {number}" (e.g., "radio 1", "dropdown 2").
 * This parser takes the components of a widget ID (after splitting on spaces) and
 * validates that it consists of exactly two parts: a widget type string and a
 * non-negative integer.
 *
 * @type {Parser<[string, number]>} A parser that returns a tuple of [widgetType, widgetNumber]
 */
export const parseWidgetIdComponents = pair(
    string,
    parseStringToNonNegativeInt,
);
