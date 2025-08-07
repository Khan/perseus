import type {ParseContext, PartialParser} from "../parser-types";

// Given a function, creates a PartialParser that converts one type to another
// using that function. The returned parser never fails.
export function convert<A, B>(
    f: (value: A, ctx: ParseContext) => B,
): PartialParser<A, B> {
    return (rawValue, ctx) => ctx.success(f(rawValue, ctx));
}
