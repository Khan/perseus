import {isFailure} from "../result";

import type {Parser} from "../parser-types";

export function pair<A, B>(
    parseA: Parser<A>,
    parseB: Parser<B>,
): Parser<[A, B]> {
    return (rawValue, ctx) => {
        if (!Array.isArray(rawValue)) {
            return ctx.failure("array", rawValue);
        }
        if (rawValue.length !== 2) {
            return ctx.failure("array of length 2", rawValue);
        }
        const [rawA, rawB] = rawValue;
        const resultA = parseA(rawA, ctx.forSubtree(0));
        if (isFailure(resultA)) {
            return resultA;
        }
        const resultB = parseB(rawB, ctx.forSubtree(1));
        if (isFailure(resultB)) {
            return resultB;
        }

        return ctx.success([resultA.value, resultB.value]);
    };
}
