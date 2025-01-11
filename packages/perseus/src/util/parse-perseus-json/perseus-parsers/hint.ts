import {
    array,
    boolean,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

import type {Parser} from "../parser-types";
import type {Hint} from "@khanacademy/perseus-core";

export const parseHint: Parser<Hint> = object({
    replace: optional(boolean),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    metadata: optional(array(string)),
    images: parseImages,
});
