import {MathFieldActionType} from "../../types";
import {
    maybeFindCommand,
    maybeFindCommandBeforeParens,
} from "../input/mathquill-helpers";
import {mathQuillInstance} from "../input/mathquill-instance";

import type Key from "../../data/keys";
import type {MathFieldInterface} from "../input/mathquill-types";
import type MathQuill from "mathquill";

function handleLeftArrow(
    mathField: MathFieldInterface,
    cursor: MathQuill.Cursor,
) {
    // If we're inside a function, and just after the left parentheses, we
    // need to skip the entire function name, rather than move the cursor
    // inside of it. For example, when hitting left from within the
    // parentheses in `cos()`, we want to place the cursor to the left of
    // the entire expression, rather than between the `s` and the left
    // parenthesis.
    // From the cursor's perspective, this requires that our left node is
    // the ActionType.MQ_END node, that our grandparent is the left parenthesis, and
    // the nodes to the left of our grandparent comprise a valid function
    // name.
    if (cursor[mathQuillInstance.L] === MathFieldActionType.MQ_END) {
        const parent = cursor.parent;
        const grandparent = parent.parent;
        if (grandparent.ctrlSeq === "\\left(") {
            const command = maybeFindCommandBeforeParens(grandparent);
            if (command) {
                cursor.insLeftOf(command.startNode);
                return;
            }
        }
    }

    // Otherwise, we default to the standard MathQull left behavior.
    mathField.keystroke("Left");
}

function handleRightArrow(
    mathField: MathFieldInterface,
    cursor: MathQuill.Cursor,
) {
    const command = maybeFindCommand(cursor[mathQuillInstance.R]);
    if (command) {
        // Similarly, if a function is to our right, then we need to place
        // the cursor at the start of its parenthetical content, which is
        // done by putting it to the left of ites parentheses and then
        // moving right once.
        cursor.insLeftOf(command.endNode);
        mathField.keystroke("Right");
    } else {
        // Otherwise, we default to the standard MathQull right behavior.
        mathField.keystroke("Right");
    }
}

export default function handleArrow(mathField: MathFieldInterface, key: Key) {
    const cursor = mathField.cursor();

    if (key === "LEFT") {
        handleLeftArrow(mathField, cursor);
    } else if (key === "RIGHT") {
        handleRightArrow(mathField, cursor);
    }
}
