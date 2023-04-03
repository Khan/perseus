// Import the DOM-related types from the parent directory, and re-export them
// to the UI code.
import type {DOMHighlight, DOMHighlightSet, DOMRange} from "../types";

export type {DOMHighlight, DOMHighlightSet, DOMRange};

export type Position = {
    left: number;
    top: number;
};

export type Rect = Position & {
    width: number;
    height: number;
};

// TODO(mdr): Is this way of passing around `z-index: 0` actually worth the
//     trouble? We used to have more, but now we don't need them...
export type ZIndexes = {
    belowContent: number;
};
