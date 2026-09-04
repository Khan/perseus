import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import * as React from "react";

import {CHOICE_BANK_DROP_ID} from "./choice-bank";
import {readTileDragData} from "./drag-ids";
import {tempDndStrings as strings} from "./temp-strings";
import {clearBlank, placeTile} from "./tile-placements";

import type {TileDragData} from "./drag-ids";
import type {TilePlacements, TileUsage} from "./tile-placements";
import type {DragEndEvent} from "@dnd-kit/react";

/**
 * A focus request that waits for the placements update to render. The
 * moved tile's menu button does not exist until then, so focus cannot
 * move in the handler itself.
 *
 * The first bank menu receives focus. When the bank is empty, focus
 * falls back to the menu of the tile in `fallbackBlankId`. A clear has
 * no fallback: the cleared tile refills the bank.
 */
type MenuFocusRequest = {fallbackBlankId: string | null};

/**
 * Move, clear, and drag-end handling shared by the widgets that place
 * tiles into blanks. Each action updates the controlled placements and
 * announces the result.
 *
 * handleMove and handleClear are for the tiles' menus, and also move
 * focus back to a menu afterwards: pass `firstBankMenuRef` to the
 * bank's first menu button and `placedMenuRef(blankId)` to each placed
 * tile's menu button. handleDragEnd is for the PerseusDndProvider, and
 * leaves focus alone: a drag is a pointer interaction.
 */
export function useTileMoveActions(options: {
    placements: TilePlacements;
    onPlacementsChange: (next: TilePlacements) => void;
    tileUsage: TileUsage;
    getTileLabel: (tileId: string) => string;
    getBlankLabel: (blankId: string) => string;
    blankIds: ReadonlyArray<string>;
}): {
    handleMove: (move: TileDragData, targetBlankId: string) => void;
    handleClear: (blankId: string) => void;
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
    } = options;

    const bankMenuRef = React.useRef<HTMLButtonElement | null>(null);
    const placedMenuRefs = React.useRef(new Map<string, HTMLButtonElement>());
    const pendingMenuFocus = React.useRef<MenuFocusRequest | null>(null);
    React.useEffect(() => {
        const pending = pendingMenuFocus.current;
        if (pending == null) {
            return;
        }
        pendingMenuFocus.current = null;
        const fallback =
            pending.fallbackBlankId != null
                ? placedMenuRefs.current.get(pending.fallbackBlankId)
                : undefined;
        (bankMenuRef.current ?? fallback)?.focus();
    }, [placements]);

    /** Applies a move and announces it. Returns false for a no-op. */
    const applyMove = (move: TileDragData, targetBlankId: string): boolean => {
        // A stale focus request must not fire on this placements change.
        pendingMenuFocus.current = null;
        // A multi-use tile's bank copy dropped on a blank that already
        // holds that tile changes nothing: no update, no announcement.
        if (
            move.fromBlankId == null &&
            placements[targetBlankId] === move.tileId
        ) {
            return false;
        }
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
        return true;
    };

    /** Applies a clear and announces it. Returns false for a no-op. */
    const applyClear = (blankId: string): boolean => {
        // A stale focus request must not fire on this placements change.
        pendingMenuFocus.current = null;
        const tileId = placements[blankId];
        if (tileId == null) {
            return false;
        }
        onPlacementsChange(clearBlank(placements, blankId));
        announceMessage({
            message: strings.returnedToChoices({tile: getTileLabel(tileId)}),
        });
        return true;
    };

    const handleMove = (move: TileDragData, targetBlankId: string) => {
        if (applyMove(move, targetBlankId)) {
            // The moved tile now sits in the target blank, so its menu
            // is the fallback when the bank has emptied.
            pendingMenuFocus.current = {fallbackBlankId: targetBlankId};
        }
    };

    const handleClear = (blankId: string) => {
        if (applyClear(blankId)) {
            pendingMenuFocus.current = {fallbackBlankId: null};
        }
    };

    const handleDragEnd = ({operation, canceled}: DragEndEvent) => {
        const {source, target} = operation;
        // A cancelled drag (Escape) still reports its last target, so it
        // must not count as a drop.
        if (canceled || !source || !target) {
            return;
        }
        const move = readTileDragData(source.data);
        if (move == null) {
            return;
        }
        const targetId = String(target.id);
        // A tile dropped on its own blank stays put: no placement
        // change, no announcement.
        if (targetId === move.fromBlankId) {
            return;
        }
        if (targetId === CHOICE_BANK_DROP_ID) {
            if (move.fromBlankId != null) {
                applyClear(move.fromBlankId);
            }
        } else if (blankIds.includes(targetId)) {
            applyMove(move, targetId);
        }
    };

    const firstBankMenuRef = React.useCallback(
        (button: HTMLButtonElement | null) => {
            bankMenuRef.current = button;
        },
        [],
    );

    // One stable callback per blank: a new identity each render would
    // make React detach and reattach the ref on every render.
    const placedMenuRefCallbacks = React.useRef(
        new Map<string, (button: HTMLButtonElement | null) => void>(),
    );
    const placedMenuRef = (blankId: string) => {
        let callback = placedMenuRefCallbacks.current.get(blankId);
        if (callback == null) {
            callback = (button) => {
                if (button == null) {
                    placedMenuRefs.current.delete(blankId);
                } else {
                    placedMenuRefs.current.set(blankId, button);
                }
            };
            placedMenuRefCallbacks.current.set(blankId, callback);
        }
        return callback;
    };

    return {
        handleMove,
        handleClear,
        handleDragEnd,
        firstBankMenuRef,
        placedMenuRef,
    };
}
