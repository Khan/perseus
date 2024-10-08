import {ParseContext, ParseFailureDetail, PathSegment} from "./parser-types";
import {Failure, failure, Success, success} from "./result";

export class ErrorTrackingParseContext implements ParseContext {
    constructor(private readonly path: PathSegment[]) {}

    failure(message: string, badValue: unknown): Failure<ParseFailureDetail> {
        return failure({
            message,
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
