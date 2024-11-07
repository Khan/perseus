import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {failure, success} from "../result";

import type {Mismatch, ParsedValue, Parser} from "../parser-types";
import type {Failure} from "../result";

export function ctx() {
    return new ErrorTrackingParseContext([]);
}

export const anyFailure = failure(expect.anything());

export const anySuccess = success(expect.anything());

export function parseFailureWith(
    expected: Partial<Mismatch>,
): Failure<Mismatch[]> {
    return failure([expect.objectContaining(expected)]);
}

// Summons a successfully parsed value out of thin air!*
// *Terms and conditions apply. Value will not actually be returned.
// For use in typetests only.
export function summonParsedValue<P extends Parser<any>>(): ParsedValue<P> {
    return "fake summoned value" as any;
}
