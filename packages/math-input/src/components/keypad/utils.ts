import Keys from "../../data/key-configs";
import {CursorContext} from "../input/cursor-contexts";

// This is just a magic number, I just played around with it
// until the transition from expanded -> regular -> expanded felt natural
export const expandedViewThreshold = 500;

// This is a helper function that returns the correct context for the cursor
// based on the cursorContext prop.  It is used in the keypad to determine
// which key to render as the "jump out" key.
export function getCursorContextConfig(
    cursorContext?: typeof CursorContext[keyof typeof CursorContext],
) {
    if (!cursorContext) {
        return null;
    }

    switch (cursorContext) {
        case CursorContext.NONE:
            return null;
        case CursorContext.IN_PARENS:
            return Keys.JUMP_OUT_PARENTHESES;
        case CursorContext.IN_SUPER_SCRIPT:
            return Keys.JUMP_OUT_EXPONENT;
        case CursorContext.IN_SUB_SCRIPT:
            return Keys.JUMP_OUT_BASE;
        case CursorContext.IN_NUMERATOR:
            return Keys.JUMP_OUT_NUMERATOR;
        case CursorContext.IN_DENOMINATOR:
            return Keys.JUMP_OUT_DENOMINATOR;
        case CursorContext.BEFORE_FRACTION:
            return Keys.JUMP_INTO_NUMERATOR;
    }
}
