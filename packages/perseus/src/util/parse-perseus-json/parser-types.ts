import type {Success, Failure, Result} from "./result";

export type Parser<T> = (rawVal: unknown, ctx: ParseContext) => ParseResult<T>;

// A PartialParser has a restricted input type, as opposed to a regular Parser
// which accepts `unknown` as input.
export type PartialParser<Input, Output> = (
    rawVal: Input,
    ctx: ParseContext,
) => ParseResult<Output>;

export type ParseResult<T> = Result<T, ParseFailureDetail>;

export type ParseFailureDetail = {
    message: string;
    badValue: unknown;
    path: PathSegment[];
};

// `keyof any` is any key that can be used to index an object or array.
// It is essentially equivalent to `symbol | string | number`.
export type PathSegment = keyof any;

export interface ParseContext {
    success<T>(value: T): Success<T>;
    failure(expected: string, badValue: unknown): Failure<ParseFailureDetail>;
    forSubtree(key: PathSegment): ParseContext;
}

// Utility to get the type of a successfully-parsed value from a Parser<T> type.
export type ParsedValue<P extends Parser<any>> = Extract<
    ReturnType<P>,
    {type: "success"}
>["value"];
