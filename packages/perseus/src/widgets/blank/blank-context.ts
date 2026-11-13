import * as React from "react";

type BlankContextValue = {
    /** The tile placed in a blank, or null when it is empty. */
    renderPlacedTile: (blankId: string) => React.ReactNode;
};

/**
 * Connects a parent widget to the blank widgets in its content. The
 * Renderer renders those widgets, so the parent cannot pass them props.
 */
export const BlankContext = React.createContext<BlankContextValue | null>(null);
