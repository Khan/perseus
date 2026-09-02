import * as React from "react";

/** What a blank widget needs from Fill in the Blank to render its slot. */
export type BlankRenderInfo = {
    /** The placed AnswerTile, or null when the blank is empty. */
    placedTile: React.ReactNode;
    /**
     * Keeps the blank at its empty width when a tile is placed. The
     * "fixed" treatment sets it; "hug" does not.
     */
    keepsWidthWhenFilled: boolean;
    /**
     * Width of the widest answer tile, in pixels. Empty normal blanks
     * use it as their minimum width, so the slot does not reveal the
     * answer. Undefined until measured.
     */
    widestTileWidth: number | undefined;
};

type FillInTheBlankContextValue = {
    getBlankRenderInfo: (
        blankId: string,
        displayType: "normal" | "superscript" | "subscript",
    ) => BlankRenderInfo;
};

/**
 * Connects Fill in the Blank to the blank widgets in its content. The
 * Renderer renders those widgets, so FITB cannot pass them props. A
 * blank outside FITB gets null and renders as a bare empty slot.
 */
export const FillInTheBlankContext =
    React.createContext<FillInTheBlankContextValue | null>(null);
