import {success} from "../result";

import type {Parser} from "../parser-types";

export function defaulted<T>(
    parser: Parser<T>,
    fallback: (missingValue: null | undefined) => NoInfer<T>,
): Parser<T> {
    return (rawValue, ctx) => {
        if (rawValue == null) {
            return success(fallback(rawValue));
        }
        return parser(rawValue, ctx);
    };
}

/**
 * Similar to defaulted, but specifically handles empty strings as invalid.
 *
 * @param fallback Function that generates a fallback value for empty/missing strings
 * @returns Parser that validates non-empty strings or uses fallback
 */
export function defaultedNonEmptyString(
    fallback: () => string,
): Parser<string> {
    return (rawValue, ctx) => {
        // Handle missing/null values - use fallback
        if (rawValue == null) {
            return ctx.success(fallback());
        }

        // Handle string values
        if (typeof rawValue === "string") {
            // If empty or whitespace-only, use fallback
            if (rawValue.trim() === "") {
                return ctx.success(fallback());
            }
            // Valid non-empty string, use as-is
            return ctx.success(rawValue);
        }

        // Invalid type, expect string
        return ctx.failure("string", rawValue);
    };
}
