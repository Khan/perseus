import {any, boolean, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseImages} from "./images-map";
import {parseWidgetsMap} from "./widgets-map";

export const parseHint = object({
    replace: defaulted(boolean, () => undefined),
    content: string,
    widgets: defaulted(parseWidgetsMap, () => ({})),
    images: parseImages,
    // deprecated
    metadata: any,
});
