import {ErrorTrackingParseContext} from "./error-tracking-parse-context";

import type {Parser, ParseResult} from "./parser-types";

export function parse<T>(value: unknown, parser: Parser<T>): ParseResult<T> {
    return parser(value, new ErrorTrackingParseContext([]));
}
