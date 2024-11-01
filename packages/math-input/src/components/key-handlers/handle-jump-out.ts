import {MathFieldActionType} from "../../types";
import {CursorContext} from "../input/cursor-contexts";
import {
    isFraction,
    isParens,
    getCursorContext,
} from "../input/mathquill-helpers";
import {mathQuillInstance} from "../input/mathquill-instance";

import type Key from "../../data/keys";
import type {MathFieldInterface} from "../input/mathquill-types";

const KeysForJumpContext = {
    [CursorContext.IN_PARENS]: "JUMP_OUT_PARENTHESES",
    [CursorContext.IN_SUPER_SCRIPT]: "JUMP_OUT_EXPONENT",
    [CursorContext.IN_SUB_SCRIPT]: "JUMP_OUT_BASE",
    [CursorContext.BEFORE_FRACTION]: "JUMP_INTO_NUMERATOR",
    [CursorContext.IN_NUMERATOR]: "JUMP_OUT_NUMERATOR",
    [CursorContext.IN_DENOMINATOR]: "JUMP_OUT_DENOMINATOR",
};

/**
 * Advances the cursor to the next logical position.
 */
function handleJumpOut(mathField: MathFieldInterface, key: Key): void {
    const cursor = mathField.cursor();
    const context = getCursorContext(mathField);

    // Validate that the current cursor context matches the key's intent.
    if (KeysForJumpContext[context] !== key) {
        // If we don't have a valid cursor context, yet the user was able
        // to trigger a jump-out key, that's a broken invariant. Rather
        // than throw an error (which would kick the user out of the
        // exercise), we do nothing, as a fallback strategy. The user can
        // still move the cursor manually.
        return;
    }

    switch (context) {
        case CursorContext.IN_PARENS:
            // Insert at the end of the parentheses, and then navigate right
            // once more to get 'beyond' the parentheses.
            cursor.insRightOf(cursor.parent.parent);
            mathField.keystroke("Right");
            break;

        case CursorContext.BEFORE_FRACTION:
            // Find the nearest fraction to the right of the cursor.
            let fractionNode;
            let visitor = cursor;
            while (
                visitor[mathQuillInstance.R] !== MathFieldActionType.MQ_END
            ) {
                if (isFraction(visitor[mathQuillInstance.R])) {
                    fractionNode = visitor[mathQuillInstance.R];
                }
                visitor = visitor[mathQuillInstance.R];
            }

            // Jump into it!
            cursor.insLeftOf(fractionNode);
            mathField.keystroke("Right");
            break;

        case CursorContext.IN_NUMERATOR:
            // HACK(charlie): I can't find a better way to do this. The goal
            // is to place the cursor at the start of the matching
            // denominator. So, we identify the appropriate node, and
            // continue rightwards until we find ourselves inside of it.
            // It's possible that there are cases in which we don't reach
            // the denominator, though I can't think of any.
            const siblingDenominator = cursor.parent.parent.blocks[1];
            while (cursor.parent !== siblingDenominator) {
                mathField.keystroke("Right");
            }
            break;

        case CursorContext.IN_DENOMINATOR:
            cursor.insRightOf(cursor.parent.parent);
            break;

        case CursorContext.IN_SUB_SCRIPT:
            // Insert just beyond the superscript.
            cursor.insRightOf(cursor.parent.parent);

            // Navigate right once more, if we're right before parens. This
            // is to handle the standard case in which the subscript is the
            // base of a custom log.
            if (isParens(cursor[mathQuillInstance.R])) {
                mathField.keystroke("Right");
            }
            break;

        case CursorContext.IN_SUPER_SCRIPT:
            // Insert just beyond the superscript.
            cursor.insRightOf(cursor.parent.parent);
            break;

        default:
            throw new Error(
                `Attempted to 'Jump Out' from node, but found no ` +
                    `appropriate cursor context: ${context}`,
            );
    }
}

export default handleJumpOut;
