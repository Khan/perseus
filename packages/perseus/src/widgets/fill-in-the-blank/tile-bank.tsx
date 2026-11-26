import * as React from "react";

import {AnswerTile} from "../../components/drag-and-drop/answer-tile";
import {ChoiceBank} from "../../components/drag-and-drop/choice-bank";
import {tempDndStrings as strings} from "../../components/drag-and-drop/temp-strings";
import {
    isTileInBank,
    remainingUses,
} from "../../components/drag-and-drop/tile-placements";

import type {
    MaxUses,
    TilePlacements,
} from "../../components/drag-and-drop/tile-placements";
import type {useTileMoveActions} from "../../components/drag-and-drop/use-tile-move-actions";
import type {PerseusFillInTheBlankTile} from "@khanacademy/perseus-core";

type TileMoveActions = ReturnType<typeof useTileMoveActions>;

/** Returns the tile's cap on placements; undefined means unlimited. */
export function getMaxUses(tile: PerseusFillInTheBlankTile): MaxUses {
    return tile.maxUses === "unlimited" ? undefined : tile.maxUses;
}

type TileBankProps = {
    tiles: PerseusFillInTheBlankTile[];
    placements: TilePlacements;
    blankIds: string[];
    blankLabels: Record<string, string>;
    onMove: TileMoveActions["handleMove"];
    /** Attached to the first bank tile's menu so focus can return to it. */
    firstMenuRef: TileMoveActions["firstBankMenuRef"];
};

/**
 * Renders the choice bank: the tiles that haven't been placed in a blank
 * yet, or can be placed again (multi-use).
 */
export function TileBank({
    tiles,
    placements,
    blankIds,
    blankLabels,
    onMove,
    firstMenuRef,
}: TileBankProps): React.ReactElement {
    const moveTargets = blankIds.map((id) => ({id, label: blankLabels[id]}));

    return (
        <ChoiceBank label={strings.choices}>
            {tiles
                .filter((tile) =>
                    isTileInBank(placements, tile.id, getMaxUses(tile)),
                )
                .map((tile, index) => (
                    // ChoiceBank puts each of its children in a separate
                    // `<li>`, so each AnswerTile needs to be a direct child
                    // of ChoiceBank to get its own list item.
                    <AnswerTile
                        key={tile.id}
                        tileId={tile.id}
                        content={tile.content}
                        label={tile.label}
                        imageHeight={tile.imageHeight}
                        moveTargets={moveTargets}
                        onMove={(targetId) =>
                            onMove({tileId: tile.id}, targetId)
                        }
                        remainingUses={
                            remainingUses(
                                placements,
                                tile.id,
                                getMaxUses(tile),
                            ) ?? undefined
                        }
                        menuRef={index === 0 ? firstMenuRef : undefined}
                    />
                ))}
        </ChoiceBank>
    );
}
