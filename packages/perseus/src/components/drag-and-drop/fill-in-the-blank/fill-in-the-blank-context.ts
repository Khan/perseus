import * as React from "react";

/**
 * What a blank widget needs from its parent Fill in the Blank component
 * to render its slot.
 */
export type BlankRenderInfo = {
    /** The placed AnswerTile, fully wired, or null when the blank is empty. */
    placedTile: React.ReactNode;
    /**
     * Drag id of the placed tile instance, for BlankComponent's
     * "own tile mid-drag" detection. Null when the blank is empty.
     */
    placedTileId: string | null;
    /**
     * Width of the widest answer tile, in pixels. Empty normal blanks use
     * it as their minimum width so the slot's size doesn't reveal the
     * answer. Undefined until measured.
     */
    widestTileWidth: number | undefined;
};

export type FillInTheBlankContextValue = {
    getBlankRenderInfo: (blankId: string) => BlankRenderInfo;
};

/**
 * The channel between the Fill in the Blank component and the blank
 * widgets embedded in its content. FITB provides it; each blank widget
 * consumes it to render its placed tile and sizing. A blank rendered
 * outside FITB (no provider) gets null and renders as a bare empty slot.
 */
export const FillInTheBlankContext =
    React.createContext<FillInTheBlankContextValue | null>(null);
