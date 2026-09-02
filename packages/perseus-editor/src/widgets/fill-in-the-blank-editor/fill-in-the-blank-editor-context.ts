import * as React from "react";

import type {FillInTheBlankTile} from "@khanacademy/perseus";

interface FillInTheBlankEditorContextValue {
    /** The choices authored in the parent, in the order they are listed. */
    tiles: ReadonlyArray<FillInTheBlankTile>;
}

/**
 * Connects the Fill in the Blank editor to the blank editors inside its
 * content.
 *
 * A blank's `correctId` names a tile in the *parent's* choice bank, but the
 * blank editors are rendered by the nested `Editor`, not by Fill in the Blank
 * — so it cannot pass them props. Context is the standard React answer, and it
 * mirrors how the render side solves the identical problem with
 * `FillInTheBlankContext`.
 *
 * A blank outside a Fill in the Blank gets null and offers only its display
 * type, since there is no choice bank to pick a correct answer from.
 */
export const FillInTheBlankEditorContext =
    React.createContext<FillInTheBlankEditorContextValue | null>(null);
