/**
 * The payload a dragged tile carries. dnd-kit returns it at drag end as
 * `operation.source.data`, so widgets read the move directly instead of
 * decoding the drag id.
 */
export type TileDragData = {
    /** The tile that moves. */
    tileId: string;
    /** The blank the tile starts in. Absent for a tile in the bank. */
    fromBlankId?: string;
};

/**
 * Builds the drag id for a tile. dnd-kit needs one unique id per
 * draggable, and one tile can show in the bank and in a blank at the
 * same time, so the id includes the location.
 */
export function tileDragId(data: TileDragData): string {
    return data.fromBlankId != null
        ? `placed__${data.fromBlankId}__${data.tileId}`
        : `bank__${data.tileId}`;
}
