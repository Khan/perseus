import * as React from "react";

type BlankContextValue = {
    /** The tile placed in a blank, or null when it is empty. */
    renderPlacedTile: (blankId: string) => React.ReactNode;
    /**
     * Minimum width of an empty blank, in pixels. Fill in the Blank sets
     * it to the widest answer tile, so the slot does not reveal the
     * answer. Undefined until measured.
     */
    minWidth: number | undefined;
};

/**
 * Connects a parent widget to the blank widgets in its content. The
 * Renderer renders those widgets, so the parent cannot pass them props.
 */
export const BlankContext = React.createContext<BlankContextValue | null>(null);
