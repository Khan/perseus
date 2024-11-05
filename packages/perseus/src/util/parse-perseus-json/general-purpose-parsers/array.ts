import * as Result from "../result";

import type {ParseContext, Parser} from "../parser-types";

export function array<T>(elementParser: Parser<T>): Parser<T[]> {
    return (array: unknown, ctx: ParseContext) => {
        if (!Array.isArray(array)) {
            return ctx.failure("array", array);
        }
        const elementResults = array.map((elem, i) =>
            elementParser(elem, ctx.forSubtree(i)),
        );
        return Result.all(elementResults, concat);
    };
}

function concat<T>(a: T[], b: T[]): T[] {
    return [...a, ...b];
}
