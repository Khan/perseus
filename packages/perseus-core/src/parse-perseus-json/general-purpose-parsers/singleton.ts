import {isFailure} from "../result";

import type {Parser} from "../parser-types";

/**
 * Parses a one-element tuple.
 */
export function singleton<T>(parseElement: Parser<T>): Parser<[T]> {
    return (rawValue, ctx) => {
        if (!Array.isArray(rawValue)) {
            return ctx.failure("array", rawValue);
        }
        if (rawValue.length !== 1) {
            return ctx.failure("array of length 1", rawValue);
        }

        const [rawElement] = rawValue;
        const result = parseElement(rawElement, ctx.forSubtree(0));
        if (isFailure(result)) {
            return result;
        }

        return ctx.success([result.value]);
    };
}
