import {
    array,
    boolean,
    constant,
    object,
    string,
} from "../general-purpose-parsers";

import {answerTileSchema} from "./answer-tile";
import {parseWidget} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

import type {Parser} from "../parser-types";

/**
 * How many blanks one tile may fill: a positive number, or "unlimited".
 */
const maxUses: Parser<number | "unlimited"> = (rawValue, ctx) => {
    if (rawValue === "unlimited") {
        return ctx.success(rawValue);
    }
    if (
        typeof rawValue === "number" &&
        Number.isInteger(rawValue) &&
        rawValue >= 1
    ) {
        return ctx.success(rawValue);
    }
    return ctx.failure('a positive number, or "unlimited"', rawValue);
};

const parseFillInTheBlankTile = object({
    ...answerTileSchema,
    maxUses,
});

export const parseFillInTheBlankWidget = parseWidget(
    constant("fill-in-the-blank"),
    object({
        content: string,
        widgets: (rawVal, ctx) => parseWidgetsMap(rawVal, ctx),
        tiles: array(parseFillInTheBlankTile),
        randomize: boolean,
    }),
);
