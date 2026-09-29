/**
 * Pure placement transitions for the Drag-and-Drop widget family.
 * The parent widget owns the state. The drag path and the menu path
 * call the same functions.
 *
 * These functions apply the FITB/Sorter model: one tile per blank,
 * swap-to-bank displacement. Stacking models (Categorizer) are out of
 * scope.
 */

/**
 * Maps blankId to the tileId of the placed tile. A missing key means
 * the blank is empty. With multi-use tiles, one tileId can appear
 * under more than one blank.
 */
export type TilePlacements = Readonly<Record<string, string>>;

export type TileUsage = "single" | "multi";

/** Counts the blanks that hold this tile. */
function countPlacements(placements: TilePlacements, tileId: string): number {
    return Object.values(placements).filter((placed) => placed === tileId)
        .length;
}

/**
 * Places a tile into a blank. The occupant of the target blank returns
 * to the bank. Set `fromBlankId` when the tile moves out of a blank.
 */
export function placeTile(
    placements: TilePlacements,
    move: {tileId: string; fromBlankId?: string},
    targetBlankId: string,
    tileUsage: TileUsage,
): TilePlacements {
    const next: Record<string, string> = {...placements};
    // The tile leaves the blank it moves out of.
    if (move.fromBlankId != null) {
        delete next[move.fromBlankId];
    }
    // A single-use tile can only be in one blank.
    if (tileUsage === "single") {
        for (const [blankId, placedTileId] of Object.entries(next)) {
            if (placedTileId === move.tileId) {
                delete next[blankId];
            }
        }
    }
    // The target's occupant, if any, is overwritten: it returns to
    // the bank.
    next[targetBlankId] = move.tileId;
    return next;
}

/** Empties a blank. Its tile returns to the bank. */
export function clearBlank(
    placements: TilePlacements,
    blankId: string,
): TilePlacements {
    if (!(blankId in placements)) {
        return placements;
    }
    const {[blankId]: _cleared, ...rest} = placements;
    return rest;
}

/**
 * Returns how many more times the tile can be placed. Returns null for
 * a multi-use tile with no cap.
 */
export function remainingUses(
    placements: TilePlacements,
    tileId: string,
    tileUsage: TileUsage,
    maxUsesPerTile?: number,
): number | null {
    const used = countPlacements(placements, tileId);
    if (tileUsage === "multi") {
        return maxUsesPerTile == null
            ? null
            : Math.max(0, maxUsesPerTile - used);
    }
    return used > 0 ? 0 : 1;
}

/** Returns true when the choice bank shows this tile. */
export function isTileInBank(
    placements: TilePlacements,
    tileId: string,
    tileUsage: TileUsage,
    maxUsesPerTile?: number,
): boolean {
    const remaining = remainingUses(
        placements,
        tileId,
        tileUsage,
        maxUsesPerTile,
    );
    return remaining == null || remaining > 0;
}
