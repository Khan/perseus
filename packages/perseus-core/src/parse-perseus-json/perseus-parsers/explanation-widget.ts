import {boolean, constant, object, string} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

export const parseExplanationWidget = parseWidget(
    constant("explanation"),
    object({
        showPrompt: string,
        hidePrompt: string,
        explanation: string,
        // We wrap parseWidgetsMap in a function here to make sure it is not
        // referenced before it is defined. There is an import cycle between
        // this file and widgets-map.ts that could cause it to be undefined.
        widgets: defaulted(
            (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
            () => ({}),
        ),
        static: defaulted(boolean, () => false),
    }),
);
