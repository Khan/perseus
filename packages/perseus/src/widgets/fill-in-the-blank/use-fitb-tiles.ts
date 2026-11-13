import {getWidgetIdsFromContentByType} from "@khanacademy/perseus-core";
import {useMemo} from "react";

import {tempDndStrings as strings} from "../../components/drag-and-drop/temp-strings";

import type {TilePlacements} from "../../components/drag-and-drop/tile-placements";
import type {
    PerseusFillInTheBlankUserInput,
    PerseusFillInTheBlankWidgetOptions,
} from "@khanacademy/perseus-core";

type Tile = PerseusFillInTheBlankWidgetOptions["tiles"][number];

type Args = {
    content: PerseusFillInTheBlankWidgetOptions["content"];
    widgets: PerseusFillInTheBlankWidgetOptions["widgets"];
    tiles: PerseusFillInTheBlankWidgetOptions["tiles"];
    userInput: PerseusFillInTheBlankUserInput;
};

type Result = {
    /** The unique blank widget ids, in the order they appear in content. */
    blankIds: ReadonlyArray<string>;
    /** Accessible label for each blank, keyed by blank id. */
    blankLabels: Record<string, string>;
    tilesById: ReadonlyMap<string, Tile>;
    /** Which tile is in each filled blank, keyed by blank id. */
    placements: TilePlacements;
};

/** Reads the blankId -> tileId placements out of the user input. */
function getPlacements(
    userInput: PerseusFillInTheBlankUserInput,
    blankIds: ReadonlyArray<string>,
): TilePlacements {
    const placements: Record<string, string> = {};
    for (const blankId of blankIds) {
        const selected = userInput[blankId]?.selected;
        if (selected != null) {
            placements[blankId] = selected;
        }
    }
    return placements;
}

/**
 * Derives the blanks, tile lookup and current placements that Fill in the
 * Blank renders from its options and user input.
 */
export function useFITBTiles({
    content,
    widgets,
    tiles,
    userInput,
}: Args): Result {
    const blankIds = useMemo(
        // A blank can appear more than once in authored content.
        () => [
            ...new Set(
                getWidgetIdsFromContentByType("blank", content, widgets),
            ),
        ],
        [content, widgets],
    );
    const blankLabels = useMemo(
        () =>
            Object.fromEntries(
                blankIds.map((blankId, index) => [
                    blankId,
                    strings.blankLabel({num: index + 1}),
                ]),
            ),
        [blankIds],
    );
    const tilesById = useMemo(
        () => new Map(tiles.map((tile) => [tile.id, tile])),
        [tiles],
    );
    const placements = useMemo(
        () => getPlacements(userInput, blankIds),
        [userInput, blankIds],
    );

    return {blankIds, blankLabels, tilesById, placements};
}
