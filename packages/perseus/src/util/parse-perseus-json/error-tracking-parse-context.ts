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
            // TODO: Not all errors will terminate parsing (some get handled by
            // defaults or unions) so JSON.stringify here is potentially wasting
            // time. We should defer constructing the message until we really
            // need a human-readable error. That will also allow us to create
            // better error messages (e.g. that list all branches of a union
            // type).
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
