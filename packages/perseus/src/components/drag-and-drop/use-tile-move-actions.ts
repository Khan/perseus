import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import * as React from "react";

import {tempDndStrings as strings} from "./temp-strings";
import {clearBlank, placeTile} from "./tile-placements";

import type {TilePlacements, TileUsage} from "./tile-placements";

export type TileMove = {tileId: string; fromBlankId?: string};

/**
 * Move and clear actions shared by the widgets that place tiles into
 * blanks. Each action updates the controlled placements and announces
 * the result. After a menu action, focus moves to the first bank
 * tile's menu; pass `firstBankMenuRef` to that menu's button.
 */
export function useTileMoveActions(options: {
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
    tileUsage: TileUsage;
    getTileLabel: (tileId: string) => string;
    getBlankLabel: (blankId: string) => string;
}): {
    handleMove: (
        move: TileMove,
        targetBlankId: string,
        viaMenu: boolean,
    ) => void;
    handleClear: (blankId: string, viaMenu: boolean) => void;
    firstBankMenuRef: (button: HTMLButtonElement | null) => void;
} {
    const {
        placements,
        onPlacementsChange,
        tileUsage,
        getTileLabel,
        getBlankLabel,
    } = options;

    const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const focusBankAfterUpdate = React.useRef(false);
    React.useEffect(() => {
        if (focusBankAfterUpdate.current) {
            focusBankAfterUpdate.current = false;
            menuButtonRef.current?.focus();
        }
    }, [placements]);

    const handleMove = (
        move: TileMove,
        targetBlankId: string,
        viaMenu: boolean,
    ) => {
        const evictedTileId = placements[targetBlankId];
        onPlacementsChange(
            placeTile(placements, move, targetBlankId, tileUsage),
        );

        let message = strings.movedToTarget({
            tile: getTileLabel(move.tileId),
            target: getBlankLabel(targetBlankId),
        });
        if (evictedTileId != null && evictedTileId !== move.tileId) {
            message += ` ${strings.returnedToChoices({
                tile: getTileLabel(evictedTileId),
            })}`;
        }
        announceMessage({message});
        if (viaMenu) {
            focusBankAfterUpdate.current = true;
        }
    };

    const handleClear = (blankId: string, viaMenu: boolean) => {
        const tileId = placements[blankId];
        if (tileId == null) {
            return;
        }
        onPlacementsChange(clearBlank(placements, blankId));
        announceMessage({
            message: strings.returnedToChoices({tile: getTileLabel(tileId)}),
        });
        if (viaMenu) {
            focusBankAfterUpdate.current = true;
        }
    };

    return {
        handleMove,
        handleClear,
        firstBankMenuRef: (button) => {
            menuButtonRef.current = button;
        },
    };
}
