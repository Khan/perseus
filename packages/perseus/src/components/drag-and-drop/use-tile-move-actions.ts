import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import * as React from "react";

import {parseDragId} from "./drag-ids";
import {tempDndStrings as strings} from "./temp-strings";
import {clearBlank, placeTile} from "./tile-placements";

import type {TilePlacements, TileUsage} from "./tile-placements";
import type {DragEndEvent} from "@dnd-kit/react";

export type TileMove = {tileId: string; fromBlankId?: string};

/**
 * Move, clear, and drag-end handling shared by the widgets that place
 * tiles into blanks. Each action updates the controlled placements and
 * announces the result.
 *
 * After a menu action, focus moves to the first bank tile's menu. When
 * the bank is empty, focus moves to the placed tile's menu instead:
 * pass `firstBankMenuRef` to the bank's first menu button and
 * `placedMenuRef(blankId)` to each placed tile's menu button.
 */
export function useTileMoveActions(options: {
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
    tileUsage: TileUsage;
    getTileLabel: (tileId: string) => string;
    getBlankLabel: (blankId: string) => string;
    blankIds: ReadonlyArray<string>;
    /** The bank's droppable id: a drop here clears the dragged tile. */
    bankDropId: string;
}): {
    handleMove: (
        move: TileMove,
        targetBlankId: string,
        viaMenu: boolean,
    ) => void;
    handleClear: (blankId: string, viaMenu: boolean) => void;
    handleDragEnd: (event: DragEndEvent) => void;
    firstBankMenuRef: (button: HTMLButtonElement | null) => void;
    placedMenuRef: (
        blankId: string,
    ) => (button: HTMLButtonElement | null) => void;
} {
    const {
        placements,
        onPlacementsChange,
        tileUsage,
        getTileLabel,
        getBlankLabel,
        blankIds,
        bankDropId,
    } = options;

    const bankMenuRef = React.useRef<HTMLButtonElement | null>(null);
    const placedMenuRefs = React.useRef(new Map<string, HTMLButtonElement>());
    // The blank to fall back to when the bank has no menu to focus.
    const focusAfterUpdate = React.useRef<{targetBlankId?: string} | null>(
        null,
    );
    React.useEffect(() => {
        const pending = focusAfterUpdate.current;
        if (pending == null) {
            return;
        }
        focusAfterUpdate.current = null;
        const fallback =
            pending.targetBlankId != null
                ? placedMenuRefs.current.get(pending.targetBlankId)
                : undefined;
        (bankMenuRef.current ?? fallback)?.focus();
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
            focusAfterUpdate.current = {targetBlankId};
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
            // The cleared tile returns to the bank, so the bank menu is
            // the only target this action needs.
            focusAfterUpdate.current = {};
        }
    };

    const handleDragEnd = ({operation, canceled}: DragEndEvent) => {
        const {source, target} = operation;
        // A cancelled drag (Escape) still reports its last target, so it
        // must not count as a drop.
        if (canceled || !source || !target) {
            return;
        }
        const move = parseDragId(String(source.id));
        if (move == null) {
            return;
        }
        const targetId = String(target.id);
        // A tile dropped on its own blank stays put: no placement
        // change, no announcement.
        if (targetId === move.fromBlankId) {
            return;
        }
        if (targetId === bankDropId) {
            if (move.fromBlankId != null) {
                handleClear(move.fromBlankId, false);
            }
        } else if (blankIds.includes(targetId)) {
            handleMove(move, targetId, false);
        }
    };

    return {
        handleMove,
        handleClear,
        handleDragEnd,
        firstBankMenuRef: (button) => {
            bankMenuRef.current = button;
        },
        placedMenuRef: (blankId) => (button) => {
            if (button == null) {
                placedMenuRefs.current.delete(blankId);
            } else {
                placedMenuRefs.current.set(blankId, button);
            }
        },
    };
}
