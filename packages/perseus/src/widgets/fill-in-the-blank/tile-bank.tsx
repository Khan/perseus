import * as React from "react";

import {AnswerTile} from "../../components/drag-and-drop/answer-tile";
import {ChoiceBank} from "../../components/drag-and-drop/choice-bank";
import {tempDndStrings as strings} from "../../components/drag-and-drop/temp-strings";
import {
    isTileInBank,
    remainingUses,
} from "../../components/drag-and-drop/tile-placements";

import type {
    TilePlacements,
    TileUsage,
} from "../../components/drag-and-drop/tile-placements";
import type {useTileMoveActions} from "../../components/drag-and-drop/use-tile-move-actions";
import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";

type TileMoveActions = ReturnType<typeof useTileMoveActions>;

type TileBankProps = {
    tiles: PerseusFillInTheBlankWidgetOptions["tiles"];
    placements: TilePlacements;
    tileUsage: TileUsage;
    /** Max placements per tile; undefined means unlimited. */
    maxUses: number | undefined;
    blankIds: ReadonlyArray<string>;
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
    tileUsage,
    maxUses,
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
                    isTileInBank(placements, tile.id, tileUsage, maxUses),
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
                            tileUsage === "multi"
                                ? remainingUses(
                                      placements,
                                      tile.id,
                                      tileUsage,
                                      maxUses,
                                  ) ?? undefined
                                : undefined
                        }
                        menuRef={index === 0 ? firstMenuRef : undefined}
                    />
                ))}
        </ChoiceBank>
    );
}
