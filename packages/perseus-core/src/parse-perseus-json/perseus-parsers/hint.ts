import {boolean, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

import type {Hint} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseHint: Parser<Hint> = object({
    replace: defaulted(boolean, () => undefined),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    images: parseImages,
});
