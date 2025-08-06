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
