import {
    any,
    boolean,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

export const parseHint = object({
    replace: defaulted(optional(boolean), () => undefined),
    placeholder: defaulted(optional(boolean), () => undefined),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    images: parseImages,
    // deprecated
    metadata: any,
});
