import {isSuccess} from "../result";

import type {Parser} from "../parser-types";

export function unionBuilder() {
    return new UnionBuilder(never)
}

export class UnionBuilder<T> {
    constructor(public parser: Parser<T>) {}

    add<New>(newBranch: Parser<New>) {
        return new UnionBuilder<T | New>(either(this.parser, newBranch))
    }
}

const never: Parser<never> = (rawValue, ctx) => ctx.failure("never", rawValue)

function either<A, B>(
    parseA: Parser<A>,
    parseB: Parser<B>,
): Parser<A | B> {
    return (rawValue, ctx) => {
        const resultA = parseA(rawValue, ctx)
        if (isSuccess(resultA)) {
            return resultA
        }

        return parseB(rawValue, ctx)
    }
}
