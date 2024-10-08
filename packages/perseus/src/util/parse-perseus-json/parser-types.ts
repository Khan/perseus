import type {Success, Failure, Result} from "./result";

export type Parser<T> = (rawVal: unknown, ctx: ParseContext) => ParseResult<T>;

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
