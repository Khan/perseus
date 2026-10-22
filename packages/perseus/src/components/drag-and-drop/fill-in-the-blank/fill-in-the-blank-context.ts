import * as React from "react";

type FillInTheBlankContextValue = {
    /** The AnswerTile placed in a blank, or null when it is empty. */
    renderPlacedTile: (blankId: string) => React.ReactNode;
    /**
     * Width of the widest answer tile, in pixels. Empty blanks use it as
     * their minimum width, so the slot does not reveal the answer.
     * Undefined until measured.
     */
    widestTileWidth: number | undefined;
};

/**
 * Connects Fill in the Blank to the blank widgets in its content. The
 * Renderer renders those widgets, so FITB cannot pass them props.
 */
export const FillInTheBlankContext =
    React.createContext<FillInTheBlankContextValue | null>(null);
