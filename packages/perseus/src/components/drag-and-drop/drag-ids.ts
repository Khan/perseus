/**
 * Drag-instance ids for the Drag-and-Drop widgets. A tile registers a
 * different id per location, so dnd-kit tells a bank tile from the
 * same tile placed in a blank.
 */

export const bankDragId = (tileId: string): string => `bank__${tileId}`;

export const placedDragId = (blankId: string, tileId: string): string =>
    `placed__${blankId}__${tileId}`;

export function parseDragId(
    id: string,
): {tileId: string; fromBlankId?: string} | null {
    if (id.startsWith("bank__")) {
        return {tileId: id.slice("bank__".length)};
    }
    if (id.startsWith("placed__")) {
        const rest = id.slice("placed__".length);
        // Blank ids ("blank 1") contain no "__"; tile ids can.
        const separator = rest.indexOf("__");
        if (separator === -1) {
            return null;
        }
        return {
            fromBlankId: rest.slice(0, separator),
            tileId: rest.slice(separator + 2),
        };
    }
    return null;
}
