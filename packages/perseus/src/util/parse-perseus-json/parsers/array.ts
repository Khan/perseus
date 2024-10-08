import {all, failure, success} from "../result";

import type {ParseContext, Parser} from "../parser-types";
import type {Result} from "../result";

export function array<T>(elementParser: Parser<T>): Parser<T[]> {
    return (array: unknown, ctx: ParseContext) => {
        if (!Array.isArray(array)) {
            return ctx.failure("array", array);
        }
        return all(
            array.map((elem, i) => elementParser(elem, ctx.forSubtree(i))),
        );
    };
}

