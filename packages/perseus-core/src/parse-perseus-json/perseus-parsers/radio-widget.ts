import {
    any,
    array,
    boolean,
    constant,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

import type {RadioWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseRadioWidget: Parser<RadioWidget> = parseWidget(
    constant("radio"),
    object({
        choices: array(
            object({
                content: defaulted(string, () => ""),
                clue: optional(string),
                correct: optional(boolean),
                isNoneOfTheAbove: optional(boolean),
                // deprecated
                // There is an import cycle between radio-widget.ts and
                // widgets-map.ts. The anonymous function below ensures that we
                // don't refer to parseWidgetsMap before it's defined.
                widgets: defaulted(
                    (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
                    () => undefined,
                ),
            }),
        ),
        hasNoneOfTheAbove: optional(boolean),
        countChoices: optional(boolean),
        randomize: optional(boolean),
        multipleSelect: optional(boolean),
        deselectEnabled: optional(boolean),
        // deprecated
        onePerLine: optional(boolean),
        // deprecated
        displayCount: optional(any),
        // v0 props
        // `noneOfTheAbove` is still in use (but only set to `false`).
        noneOfTheAbove: optional(constant(false)),
    }),
);
