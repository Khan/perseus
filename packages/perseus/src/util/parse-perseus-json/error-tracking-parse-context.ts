import {failure, success} from "./result";

import type {
    ParseContext,
    ParseFailureDetail,
    PathSegment,
} from "./parser-types";
import type {Failure, Success} from "./result";

export class ErrorTrackingParseContext implements ParseContext {
    constructor(private readonly path: PathSegment[]) {}

    failure(expected: string, badValue: unknown): Failure<ParseFailureDetail> {
        return failure({
            message: `expected ${expected}, but got ${JSON.stringify(badValue)}`,
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