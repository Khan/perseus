import {failure, success} from "./result";

import type {
    ParseContext,
    ParseFailureDetail,
    PathSegment,
} from "./parser-types";
import type {Failure, Success} from "./result";

export class ErrorTrackingParseContext implements ParseContext {
    constructor(private readonly path: PathSegment[]) {}

    failure(
        expected: string | string[],
        badValue: unknown,
    ): Failure<ParseFailureDetail> {
        return failure({
            expected: wrapInArray(expected),
            badValue,
            path: this.path,
        });
    }

    forSubtree(key: PathSegment): ParseContext {
        return new ErrorTrackingParseContext([...this.path, key]);
    }

    success<T>(value: T): Success<T> {
        return success(value);
    }
}

function wrapInArray(a: string | string[]): string[] {
    if (Array.isArray(a)) {
        return a;
    }
    return [a];
}
