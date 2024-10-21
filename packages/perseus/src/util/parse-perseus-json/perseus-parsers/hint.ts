import {
    array,
    boolean,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import {imageMap} from "./image-map";
import {parseWidgetsMap} from "./widgets-map";

import type {Hint} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseHint: Parser<Hint> = object({
    replace: optional(boolean),
    content: string,
    widgets: parseWidgetsMap,
    metadata: optional(array(string)),
    images: imageMap,
});
