import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {failure} from "../result";

import type {ParseFailureDetail} from "../parser-types";
import type {Failure} from "../result";

export function ctx() {
    return new ErrorTrackingParseContext([]);
}

export const anyFailure = failure(expect.anything());

export function parseFailureWith(
    expected: Partial<ParseFailureDetail>,
): Failure<ParseFailureDetail> {
    return failure(expect.objectContaining(expected));
}
