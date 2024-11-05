import type {Success, Failure, Result} from "./result";

export type Parser<T> = (rawVal: unknown, ctx: ParseContext) => ParseResult<T>;

// A PartialParser has a restricted input type, as opposed to a regular Parser
// which accepts `unknown` as input.
export type PartialParser<Input, Output> = (
    rawVal: Input,
    ctx: ParseContext,
) => ParseResult<Output>;

export type ParseResult<T> = Result<T, Mismatch[]>;

export type Mismatch = {
    // Descriptions of the allowed types or schemas.
    // E.g. ["string", "number"] means that the value was expected to be a
    // string or a number.
    expected: string[];
    badValue: unknown;
    path: PathSegment[];
};

// `keyof any` is any key that can be used to index an object or array.
// It is essentially equivalent to `symbol | string | number`.
export type PathSegment = keyof any;

export interface ParseContext {
    success<T>(value: T): Success<T>;
    failure(
        expected: string | string[],
        badValue: unknown,
    ): Failure<Mismatch[]>;
    forSubtree(key: PathSegment): ParseContext;
}

// Utility to get the type of a successfully-parsed value from a Parser<T> type.
export type ParsedValue<P extends Parser<any>> = Extract<
    ReturnType<P>,
    {type: "success"}
>["value"];
