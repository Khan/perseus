import type {Hint} from "../../data-schema";
import {any, boolean, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import type {Parser} from "../parser-types";
import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

export const parseHint: Parser<Hint> = object({
    replace: defaulted(boolean, () => undefined),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    images: parseImages,
    // deprecated
    metadata: any,
});
