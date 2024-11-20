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
    // This module has an import cycle with parseWidgetsMap, because the
    // `group` widget can contain another renderer.
    // The anonymous function below ensures that we don't try to access
    // parseWidgetsMap before it's defined.
    widgets: (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
    metadata: optional(array(string)),
    images: record(
        string,
        object({
            width: number,
            height: number,
        }),
    ),
});
