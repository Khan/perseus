/**
 * Pure placement logic for the Drag-and-Drop widget family.
 *
 * The parent widget owns all placement state; the shared components
 * (AnswerTile, BlankComponent, ChoiceBank) stay stateless. These functions
 * encode the Overview spec's placement rules so every input path — drag or
 * actions menu — flows through the same transitions.
 *
 * Displacement policy: this module implements Fill in the Blank's
 * "swap-to-bank" rule (a tile dropped on a full blank sends the occupant
 * back to the choice bank). Widgets that stack tiles in a zone
 * (categorizer/composer style) will need this to become a parameter.
 */

/**
 * blankId -> tileId of the placed tile. A missing key means the blank is
 * empty. With multi-use tiles the same tileId may appear under several
 * blanks.
 */
export type TilePlacements = Readonly<Record<string, string>>;

export type TileUsage = "single" | "multi";

/** How many blanks currently hold this tile. */
export function countPlacements(
    placements: TilePlacements,
    tileId: string,
): number {
    return Object.values(placements).filter((placed) => placed === tileId)
        .length;
}

/**
 * Places a tile into a blank and returns the next placements.
 *
 * - The occupant of the target blank (if any) returns to the bank.
 * - Pass `fromBlankId` when the moving tile currently sits in a blank
 *   (menu move or drag from a blank): that blank empties. Without it the
 *   tile comes from the bank.
 * - A single-use tile occupies at most one blank, so any stale placement
 *   of it is dropped defensively.
 */
export function placeTile(
    placements: TilePlacements,
    move: {tileId: string; fromBlankId?: string},
    targetBlankId: string,
    tileUsage: TileUsage,
): TilePlacements {
    const next: Record<string, string> = {};
    for (const [blankId, placedTileId] of Object.entries(placements)) {
        if (blankId === targetBlankId) {
            // Swap-to-bank: the occupant returns to the choice bank.
            continue;
        }
        if (blankId === move.fromBlankId) {
            // The moving tile leaves its old blank.
            continue;
        }
        if (tileUsage === "single" && placedTileId === move.tileId) {
            // A single-use tile can only be in one place.
            continue;
        }
        next[blankId] = placedTileId;
    }
    next[targetBlankId] = move.tileId;
    return next;
}

/** Empties a blank; its tile returns to the bank. */
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
 * How many more times the tile can be placed, or null for a multi-use
 * tile with no cap (unlimited).
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

/**
 * Whether the tile still shows in the choice bank: single-use tiles leave
 * when placed, capped multi-use tiles leave when exhausted, uncapped
 * multi-use tiles never leave.
 */
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
