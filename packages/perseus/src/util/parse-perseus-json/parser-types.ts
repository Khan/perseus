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
    /**
     * Returns a Success result based on the current state of the parse.
     * @param value The value to return in the Success.
     */
    success<T>(value: T): Success<T>;

    /**
     * Returns a Failure result based on the current state of the parse.
     *
     * @param expected one or more descriptions of the types that were expected.
     * An array of several expected types has "any" semantics - any of the
     * listed types is valid.
     * @param badValue the value that caused the parse to fail.
     */
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
