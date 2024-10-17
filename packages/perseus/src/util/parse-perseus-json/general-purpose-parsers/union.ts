import {isSuccess} from "../result";

import type {Parser, ParseResult} from "../parser-types";

// TODO(benchristel): Add more signatures as needed
export function union<A, B>(
    parseA: Parser<A>,
    parseB: Parser<B>,
): Parser<A | B>;
export function union(...branches: any[]) {
    return (rawValue, ctx) => {
        // The initial value of `failure` is never used.
        // Either `failure` will be set within the loop, or
        // a success will be returned.
        let failure: ParseResult<any> = ctx.failure("", rawValue);
        for (const branch of branches) {
            const result = branch(rawValue, ctx);
            if (isSuccess(result)) {
                return result;
            } else {
                failure = result;
            }
        }

        return failure;
    };
}
