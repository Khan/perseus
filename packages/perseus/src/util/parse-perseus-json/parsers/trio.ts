import {Parser} from "../parser-types";
import {isFailure} from "../result";

export function trio<A, B, C>(
    parseA: Parser<A>,
    parseB: Parser<B>,
    parseC: Parser<C>,
): Parser<[A, B, C]> {
    return (rawValue, ctx) => {
        if (!Array.isArray(rawValue)) {
            return ctx.failure("array", rawValue)
        }
        if (rawValue.length !== 3) {
            return ctx.failure("array of length 3", rawValue)
        }

        const resultA = parseA(rawValue[0], ctx.forSubtree(0))
        if (isFailure(resultA)) {
            return resultA
        }

        const resultB = parseB(rawValue[1], ctx.forSubtree(1))
        if (isFailure(resultB)) {
            return resultB
        }

        const resultC = parseC(rawValue[2], ctx.forSubtree(2))
        if (isFailure(resultC)) {
            return resultC
        }

        return ctx.success([resultA.value, resultB.value, resultC.value])
    }
}
