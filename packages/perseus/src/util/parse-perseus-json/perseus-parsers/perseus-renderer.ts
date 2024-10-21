import {
    array,
    number,
    object,
    optional,
    record,
    string,
} from "../general-purpose-parsers";

import {parseWidgetsMap} from "./widgets-map";

import type {PerseusRenderer} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePerseusRenderer: Parser<PerseusRenderer> = object({
    content: string,
    widgets: parseWidgetsMap,
    metadata: optional(array(string)),
    images: record(
        string,
        object({
            width: number,
            height: number,
        }),
    ),
});
