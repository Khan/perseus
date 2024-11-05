import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {failure} from "../result";

import type {Mismatch} from "../parser-types";
import type {Failure} from "../result";

export function ctx() {
    return new ErrorTrackingParseContext([]);
}

export const anyFailure = failure(expect.anything());

export function parseFailureWith(
    expected: Partial<Mismatch>,
): Failure<Mismatch[]> {
    return failure([expect.objectContaining(expected)]);
}

export function parseFailureWithMultipleMismatches(
    expected: Partial<Mismatch[]>,
): Failure<Mismatch[]> {
    return failure(expected.map((obj) => expect.objectContaining(obj)));
}
