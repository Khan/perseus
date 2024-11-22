import {isFailure} from "../result";

import type {
    ParsedValue,
    PartialParser,
    ParseContext,
    Parser,
} from "../parser-types";

export function composeParsers<
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
