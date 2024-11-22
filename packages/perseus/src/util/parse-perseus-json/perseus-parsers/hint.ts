import {
    array,
    boolean,
    number,
    object,
    optional,
    record,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidgetsMap} from "./widgets-map";

import type {Hint} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseHint: Parser<Hint> = object({
    replace: optional(boolean),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    metadata: optional(array(string)),
    images: defaulted(
        record(
            string,
            object({
                width: number,
                height: number,
            }),
        ),
        () => ({}),
    ),
});
