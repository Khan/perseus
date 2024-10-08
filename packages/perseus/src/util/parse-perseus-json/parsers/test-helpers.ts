import {ErrorTrackingParseContext} from "../error-tracking-parse-context";
import {failure} from "../result";

export function ctx() {
    return new ErrorTrackingParseContext([]);
}

export const anyFailure = failure(expect.anything());
