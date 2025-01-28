import {isFailure} from "../result";

import type {
    ParseContext,
    ParsedValue,
    Parser,
    PartialParser,
} from "../parser-types";

export function pipeParsers<T>(p: Parser<T>): ParserPipeline<T> {
    return new ParserPipeline(p);
}

export class ParserPipeline<T> {
    constructor(public readonly parser: Parser<T>) {}

    then<U>(nextParser: PartialParser<T, U>): ParserPipeline<U> {
        return new ParserPipeline<U>(composeParsers(this.parser, nextParser));
    }
}

function composeParsers<
    A extends Parser<any>,
    B extends PartialParser<ParsedValue<A>, any>,
>(parserA: A, parserB: B): Parser<ParsedValue<B>> {
    return (rawValue: unknown, ctx: ParseContext) => {
        const partialResult = parserA(rawValue, ctx);
        if (isFailure(partialResult)) {
            return partialResult;
        }

        return parserB(partialResult.value, ctx);
    };
}
