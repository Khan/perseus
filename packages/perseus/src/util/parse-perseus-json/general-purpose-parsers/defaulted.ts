import {success} from "../result";

import type {Parser} from "../parser-types";

export function defaulted<T, Default>(
    parser: Parser<T>,
    fallback: (missingValue: null | undefined) => Default,
): Parser<T | Default> {
    return (rawValue, ctx) => {
        if (rawValue == null) {
            return success(fallback(rawValue));
        }
        return parser(rawValue, ctx);
    };
}
