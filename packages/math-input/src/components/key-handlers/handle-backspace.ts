import {
    isFraction,
    isSquareRoot,
    isNthRoot,
    isNthRootIndex,
    isInsideLogIndex,
    isInsideEmptyNode,
    selectNode,
    getCursor,
    maybeFindCommandBeforeParens,
} from "../input/mathquill-helpers";
import {mathQuillInstance} from "../input/mathquill-instance";
import {MathFieldActionType} from "../input/mathquill-types";

import type {
    MathFieldInterface,
    MathFieldCursor,
} from "../input/mathquill-types";

function handleBackspaceInNthRoot(
    mathField: MathFieldInterface,
    cursor: MathFieldCursor,
) {
    const isAtLeftEnd =
        cursor[mathQuillInstance.L] === MathFieldActionType.MQ_END;

    const isRootEmpty = isInsideEmptyNode(cursor.parent.parent.blocks[0].ends);

    if (isAtLeftEnd) {
        selectNode(cursor.parent.parent, cursor);

        if (isRootEmpty) {
            mathField.keystroke("Backspace");
        }
    } else {
        mathField.keystroke("Backspace");
    }
}

function handleBackspaceInRootIndex(
    mathField: MathFieldInterface,
    cursor: MathFieldCursor,
) {
    if (isInsideEmptyNode(cursor)) {
        // When deleting the index in a nthroot, we change from the nthroot
        // to a sqrt, e.g. \sqrt[|]{35x-5} => |\sqrt{35x-5}.  If there's no
        // content under the root, then we delete the whole thing.

        const grandparent = cursor.parent.parent;
        const latex = grandparent.latex();
        const reinsertionPoint = grandparent[mathQuillInstance.L];

        selectNode(grandparent, cursor);

        const rootIsEmpty = grandparent.blocks[1].jQ.text() === "";

        if (rootIsEmpty) {
            // If there is not content under the root then simply delete
            // the whole thing.
            mathField.keystroke("Backspace");
        } else {
            // Replace the nthroot with a sqrt if there was content under
            // the root.

            // Start by deleting the selection.
            mathField.keystroke("Backspace");

            // Replace the nth-root with a sqrt.
            mathField.write(latex.replace(/^\\sqrt\[\]/, "\\sqrt"));

            // Adjust the cursor to be to the left the sqrt.
            if (reinsertionPoint === MathFieldActionType.MQ_END) {
                mathField.moveToDirEnd(mathQuillInstance.L);
            } else {
                cursor.insRightOf(reinsertionPoint);
            }
        }
    } else {
        if (cursor[mathQuillInstance.L] !== MathFieldActionType.MQ_END) {
            // If the cursor is not at the leftmost position inside the
            // root's index, delete a character.
            mathField.keystroke("Backspace");
        } else {
            // TODO(kevinb) verify that we want this behavior after testing
            // Do nothing because we haven't completely deleted the
            // index of the radical.
        }
    }
}

function handleBackspaceInLogIndex(
    mathField: MathFieldInterface,
    cursor: MathFieldCursor,
) {
    if (isInsideEmptyNode(cursor)) {
        const grandparent = cursor.parent.parent;
        const command = maybeFindCommandBeforeParens(grandparent);

        cursor.insLeftOf(command?.startNode);
        cursor.startSelection();

        if (grandparent[mathQuillInstance.R] !== MathFieldActionType.MQ_END) {
            cursor.insRightOf(grandparent[mathQuillInstance.R]);
        } else {
            cursor.insRightOf(grandparent);
        }

        cursor.select();
        cursor.endSelection();

        const isLogBodyEmpty =
            grandparent[mathQuillInstance.R].contentjQ.text() === "";

        if (isLogBodyEmpty) {
            // If there's no content inside the log's parens then delete the
            // whole thing.
            mathField.keystroke("Backspace");
        }
    } else {
        mathField.keystroke("Backspace");
    }
}

function handleBackspaceOutsideParens(cursor: MathFieldCursor) {
    // In this case the node with '\\left(' for its ctrlSeq
    // is the parent of the expression contained within the
    // parentheses.
    //
    // Handle selecting an expression before deleting:
    // (x+1)| => |(x+1)|
    // \log(x+1)| => |\log(x+1)|

    const leftNode = cursor[mathQuillInstance.L];
    const rightNode = cursor[mathQuillInstance.R];
    const command = maybeFindCommandBeforeParens(leftNode);

    if (command && command.startNode) {
        // There's a command before the parens so we select it as well as
        // the parens.
        cursor.insLeftOf(command.startNode);
        cursor.startSelection();
        if (rightNode === MathFieldActionType.MQ_END) {
            cursor.insAtRightEnd(cursor.parent);
        } else {
            cursor.insLeftOf(rightNode);
        }
        cursor.select();
        cursor.endSelection();
    } else {
        cursor.startSelection();
        cursor.insLeftOf(leftNode); // left of \\left(
        cursor.select();
        cursor.endSelection();
    }
}

function handleBackspaceInsideParens(
    mathField: MathFieldInterface,
    cursor: MathFieldCursor,
) {
    // Handle situations when the cursor is inside parens or a
    // command that uses parens, e.g. \log() or \tan()
    //
    // MathQuill represents log(x+1) in roughly the following way
    // [l, o, g, \\left[parent:[x, +, 1]]]
    //
    // If the cursor is inside the parentheses it's next to one of:
    // x, +, or 1.  This makes sub_sub_expr its parent and sub_expr
    // it's parent.
    //
    // Interestingly parent doesn't have any nodes to the left or
    // right of it (even though the corresponding DOM node has
    // ( and ) characters on either side.
    //
    // The grandparent's ctrlSeq is `\\left(`. The `\\right)` isn't
    // stored anywhere.  NOTE(kevinb): I believe this is because
    // MathQuill knows what the close paren should be and does the
    // right thing at render time.
    //
    // This conditional branch handles the following cases:
    // - \log(x+1|) => \log(x+|)
    // - \log(|x+1) => |\log(x+1)|
    // - \log(|) => |

    if (cursor[mathQuillInstance.L] !== MathFieldActionType.MQ_END) {
        // This command contains math and there's some math to
        // the left of the cursor that we should delete normally
        // before doing anything special.
        mathField.keystroke("Backspace");
        return;
    }

    const grandparent = cursor.parent.parent;

    // If the cursors is inside the parens at the start but the command
    // has a subscript as is the case in log_n then move the cursor into
    // the subscript, e.g. \log_{5}(|x+1) => \log_{5|}(x+1)

    if (grandparent[mathQuillInstance.L].sub) {
        // if there is a subscript
        if (grandparent[mathQuillInstance.L].sub.jQ.text()) {
            // and it contains text
            // move the cursor to the right end of the subscript
            cursor.insAtRightEnd(grandparent[mathQuillInstance.L].sub);
            return;
        }
    }

    // Determine if the parens are empty before we modify the
    // cursor's position.
    const isEmpty = isInsideEmptyNode(cursor);

    // Insert the cursor to the left of the command if there is one
    // or before the '\\left(` if there isn't
    const command = maybeFindCommandBeforeParens(grandparent);

    cursor.insLeftOf((command && command.startNode) || grandparent);
    cursor.startSelection();
    cursor.insRightOf(grandparent);
    cursor.select();
    cursor.endSelection();

    // Delete the selection, but only if the parens were empty to
    // begin with.
    if (isEmpty) {
        mathField.keystroke("Backspace");
    }
}

function handleBackspaceAfterLigaturedSymbol(mathField: MathFieldInterface) {
    mathField.keystroke("Backspace");
    mathField.keystroke("Backspace");
}

/**
 * Selects and deletes part of the expression based on the cursor location.
 * See inline comments for precise behavior of different cases.
 */
function handleBackspace(mathField: MathFieldInterface) {
    const cursor = getCursor(mathField);
    if (!cursor.selection) {
        const parent = cursor.parent;
        const grandparent = parent.parent;
        const leftNode = cursor[mathQuillInstance.L];

        if (isFraction(leftNode)) {
            selectNode(leftNode, cursor);
        } else if (isSquareRoot(leftNode)) {
            selectNode(leftNode, cursor);
        } else if (isNthRoot(leftNode)) {
            selectNode(leftNode, cursor);
        } else if (isNthRootIndex(parent)) {
            handleBackspaceInRootIndex(mathField, cursor);
        } else if (leftNode.ctrlSeq === "\\left(") {
            handleBackspaceOutsideParens(cursor);
        } else if (grandparent.ctrlSeq === "\\left(") {
            handleBackspaceInsideParens(mathField, cursor);
        } else if (isInsideLogIndex(cursor)) {
            handleBackspaceInLogIndex(mathField, cursor);
        } else if (
            leftNode.ctrlSeq === "\\ge " ||
            leftNode.ctrlSeq === "\\le "
        ) {
            handleBackspaceAfterLigaturedSymbol(mathField);
        } else if (
            isNthRoot(grandparent) &&
            leftNode === MathFieldActionType.MQ_END
        ) {
            handleBackspaceInNthRoot(mathField, cursor);
        } else {
            mathField.keystroke("Backspace");
        }
    } else {
        mathField.keystroke("Backspace");
    }
}

export default handleBackspace;
