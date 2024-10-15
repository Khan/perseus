import type {
    ParsedValue,
    PartialParser,
    ParseContext,
    Parser,
    ParseResult,
} from "../parser-types";

export function composeParsers<
    A extends Parser<any>,
    B extends PartialParser<ParsedValue<A>, any>,
>(a: A, b: B): Parser<ParsedValue<B>>;
export function composeParsers(...parsers: any[]) {
    return (rawValue: unknown, ctx: ParseContext) => {
        let x = rawValue;
        for (const parser of parsers) {
            const result: ParseResult<any> = parser(x, ctx);
            if (result.type === "failure") {
                return result;
            } else {
                x = result.value;
            }
        }
        return ctx.success(x);
    };
}
