import {success} from "../result";

import type {ParseContext, Parser} from "../parser-types";

export function defaulted<T>(
    parser: Parser<T>,
    fallback: (missingValue: null | undefined, ctx: ParseContext) => NoInfer<T>,
): Parser<T> {
    return (rawValue, ctx) => {
        if (rawValue == null) {
            return success(fallback(rawValue, ctx));
        }
        return parser(rawValue, ctx);
    };
}
