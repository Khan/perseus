import type {PerseusFillInTheBlankTile} from "@khanacademy/perseus-core";

/**
 * How the editor names a choice: its content, falling back to its screen
 * reader label, then to its position for a choice that is still empty.
 */
export function getChoiceDisplayName(
    tile: PerseusFillInTheBlankTile,
    index: number,
): string {
    return tile.content.trim() || tile.label.trim() || `Choice ${index + 1}`;
}
