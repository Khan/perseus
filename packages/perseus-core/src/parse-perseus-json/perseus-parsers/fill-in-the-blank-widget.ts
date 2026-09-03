import {
    array,
    boolean,
    constant,
    defaulted,
    enumeration,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";

import {parseAnswerTile} from "./answer-tile";
import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

export const parseFillInTheBlankWidget = parseWidget(
    constant("fill-in-the-blank"),
    // Not parsePerseusRenderer: these options add the choice bank, and
    // `object` drops whatever its schema omits.
    object({
        content: defaulted(string, () => ""),
        // Import cycle with parseWidgetsMap; the wrapper defers reading it.
        widgets: defaulted(
            (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
            () => ({}),
        ),
        tiles: defaulted(array(parseAnswerTile), () => []),
        tileUsage: defaulted(
            enumeration("single", "multi"),
            () => "single" as const,
        ),
        maxUsesPerTile: optional(number),
        randomize: defaulted(boolean, () => false),
    }),
);
