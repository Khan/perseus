import {isSuccess} from "../result";

import type {Parser} from "../parser-types";

export function union<T>(parseBranch: Parser<T>): UnionBuilder<T> {
    return new UnionBuilder(parseBranch);
}

export class UnionBuilder<T> {
    constructor(public parser: Parser<T>) {}

    or<New>(newBranch: Parser<New>) {
        return new UnionBuilder<T | New>(either(this.parser, newBranch));
    }
}

function either<A, B>(parseA: Parser<A>, parseB: Parser<B>): Parser<A | B> {
    return (rawValue, ctx) => {
        const resultA = parseA(rawValue, ctx);
        if (isSuccess(resultA)) {
            return resultA;
        }

        return parseB(rawValue, ctx);
    };
}
