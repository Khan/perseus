import {boolean} from "../general-purpose-parsers/boolean";
import {constant} from "../general-purpose-parsers/constant";
import {object} from "../general-purpose-parsers/object";
import {string} from "../general-purpose-parsers/string";

import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

import type {ExplanationWidget} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parseExplanationWidget: Parser<ExplanationWidget> = parseWidget(
    constant("explanation"),
    object({
        showPrompt: string,
        hidePrompt: string,
        explanation: string,
        // We wrap parseWidgetsMap in a function here to make sure it is not
        // referenced before it is defined. There is an import cycle between
        // this file and widgets-map.ts that could cause it to be undefined.
        widgets: (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
        static: boolean,
    }),
);
