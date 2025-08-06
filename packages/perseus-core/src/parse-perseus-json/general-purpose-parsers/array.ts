import * as Result from "../result";

import type {ParseContext, Parser} from "../parser-types";

export function array<T>(elementParser: Parser<T>): Parser<T[]> {
    return (rawValue: unknown, ctx: ParseContext) => {
        if (!Array.isArray(rawValue)) {
            return ctx.failure("array", rawValue);
        }
        const elementResults = rawValue.map((elem, i) =>
            elementParser(elem, ctx.forSubtree(i)),
        );
        return Result.all(elementResults, concat);
    };
}

/**
 * Like the standard `array` parser, but passes the array index to a parser factory function.
 * This allows element parsers to generate index-based default values.
 */
export function arrayWithIndex<T>(
    elementParserFactory: (index: number) => Parser<T>,
): Parser<T[]> {
    return (rawValue: unknown, ctx: ParseContext) => {
        if (!Array.isArray(rawValue)) {
            return ctx.failure("array", rawValue);
        }

        const elementResults = rawValue.map((elem, index) => {
            const elementParser = elementParserFactory(index);
            return elementParser(elem, ctx.forSubtree(index));
        });

        return Result.all(elementResults, concat);
    };
}

function concat<T>(a: T[], b: T[]): T[] {
    return [...a, ...b];
}
