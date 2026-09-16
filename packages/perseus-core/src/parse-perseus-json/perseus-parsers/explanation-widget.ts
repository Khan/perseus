import {constant, object, string} from "../general-purpose-parsers";
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
    }),
    // An explanation takes no user input of its own. Its nested widgets each
    // carry their own `static`, so dropping this one doesn't affect them.
    {supportsStatic: false},
);
