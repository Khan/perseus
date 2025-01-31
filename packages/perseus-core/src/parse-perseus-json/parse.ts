import {ErrorTrackingParseContext} from "./error-tracking-parse-context";
import {message} from "./parse-failure-detail";
import {failure, isFailure} from "./result";

import type {Parser} from "./parser-types";
import type {Result} from "./result";

export function parse<T>(value: unknown, parser: Parser<T>): Result<T, string> {
    const result = parser(value, new ErrorTrackingParseContext([]));
    if (isFailure(result)) {
        return failure(result.detail.map(message).join("; "));
    }
    return result;
}
