/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */

import $ from "jquery";

import Key from "../../data/keys";
import {MathFieldInterface, MathFieldActionType} from "../../types";
import keyTranslator from "../key-translator";

import handleBackspace from "./handle-backspace";
import handleJumpOut from "./handle-jump-out";
import {
    contextForCursor,
    maybeFindCommand,
    maybeFindCommandBeforeParens,
} from "./mathquill-helpers";
import MQ from "./mathquill-instance";

const customKeyTranslator = {
    ...keyTranslator,
    FRAC: (mathQuill) => {
        mathQuill.cmd("\\frac");
    },
};

const NormalCommands = {
    ["LOG"]: "log",
    ["LN"]: "ln",
    ["SIN"]: "sin",
    ["COS"]: "cos",
    ["TAN"]: "tan",
};

const ArithmeticOperators = ["+", "-", "\\cdot", "\\times", "\\div"];
const EqualityOperators = ["=", "\\neq", "<", "\\leq", ">", "\\geq"];

// Notes about MathQuill
//
// MathQuill's stores its layout as nested linked lists.  Each node in the
// list has MQ.L '-1' and MQ.R '1' properties that define links to
// the left and right nodes respectively.  They also have
//
// ctrlSeq: contains the latex code snippet that defines that node.
// jQ: jQuery object for the DOM node(s) for this MathQuill node.
// ends: pointers to the nodes at the ends of the container.
// parent: parent node.
// blocks: an array containing one or more nodes that make up the node.
// sub?: subscript node if there is one as is the case in log_n
//
// All of the code below is super fragile.  Please be especially careful
// when upgrading MathQuill.
class MathWrapper {
    mathField: MathFieldInterface; // MathQuill input
    callbacks: any;

    constructor(element, options = {}, callbacks = {}) {
        this.mathField = MQ.MathField(element, {
            // use a span instead of a textarea so that we don't bring up the
            // native keyboard on mobile when selecting the input
            substituteTextarea: function () {
                return document.createElement("span");
            },
        });
        this.callbacks = callbacks;
    }

    focus() {
        // HACK(charlie): We shouldn't reaching into MathQuill internals like
        // this, but it's the easiest way to allow us to manage the focus state
        // ourselves.
        const controller = this.mathField.__controller;
        controller.cursor.show();

        // Set MathQuill's internal state to reflect the focus, otherwise it
        // will consistently try to hide the cursor on key-press and introduce
        // layout jank.
        controller.blurred = false;
    }

    blur() {
        const controller = this.mathField.__controller;
        controller.cursor.hide();
        controller.blurred = true;
    }

    _writeNormalFunction(name: string) {
        this.mathField.write(`\\${name}\\left(\\right)`);
        this.mathField.keystroke("Left");
    }

    /**
     * Handle a key press and return the resulting cursor state.
     *
     * @param {Key} key - an enum representing the key that was pressed
     * @returns {object} a cursor object, consisting of a cursor context
     */
    pressKey(key: Key) {
        const cursor = this.mathField.__controller.cursor;
        const translator = customKeyTranslator[key];

        if (Object.keys(NormalCommands).includes(key)) {
            this._writeNormalFunction(NormalCommands[key]);
        } else if (key === "EXP" || key === "EXP_2" || key === "EXP_3") {
            this._handleExponent(cursor, key);
        } else if (
            key === "JUMP_OUT_PARENTHESES" ||
            key === "JUMP_OUT_EXPONENT" ||
            key === "JUMP_OUT_BASE" ||
            key === "JUMP_INTO_NUMERATOR" ||
            key === "JUMP_OUT_NUMERATOR" ||
            key === "JUMP_OUT_DENOMINATOR"
        ) {
            handleJumpOut(this.mathField, cursor, key);
        } else if (key === "BACKSPACE") {
            handleBackspace(this.mathField);
        } else if (key === "LEFT") {
            this._handleLeftArrow(cursor);
        } else if (key === "RIGHT") {
            this._handleRightArrow(cursor);
        } else if (translator) {
            translator(this.mathField);
        }

        if (!cursor.selection) {
            // don't show the cursor for selections
            cursor.show();
        }

        if (this.callbacks.onSelectionChanged) {
            this.callbacks.onSelectionChanged(cursor.selection);
        }

        // NOTE(charlie): It's insufficient to do this as an `edited` handler
        // on the MathField, as that handler isn't triggered on navigation
        // events.
        return {
            context: contextForCursor(cursor),
        };
    }

    /**
     * Place the cursor beside the node located at the given coordinates.
     *
     * @param {number} x - the x coordinate in the viewport
     * @param {number} y - the y coordinate in the viewport
     * @param {Node} hitNode - the node next to which the cursor should be
     *                         placed; if provided, the coordinates will be used
     *                         to determine on which side of the node the cursor
     *                         should be placed
     */
    setCursorPosition(x: number, y: number, hitNode: HTMLElement) {
        const el = hitNode || document.elementFromPoint(x, y);

        if (el) {
            const cursor = this.getCursor();

            if (el.hasAttribute("mq-root-block")) {
                // If we're in the empty area place the cursor at the right
                // end of the expression.
                cursor.insAtRightEnd(this.mathField.__controller.root);
            } else {
                // Otherwise place beside the element at x, y.
                const controller = this.mathField.__controller;

                const pageX = x - document.body.scrollLeft;
                const pageY = y - document.body.scrollTop;
                controller.seek($(el), pageX, pageY).cursor.startSelection();

                // Unless that would leave us mid-command, in which case, we
                // need to adjust and place the cursor inside the parens
                // following the command.
                const command = maybeFindCommand(cursor[MQ.L]);
                if (command && command.endNode) {
                    // NOTE(charlie): endNode should definitely be \left(.
                    cursor.insLeftOf(command.endNode);
                    this.mathField.keystroke("Right");
                }
            }

            if (this.callbacks.onCursorMove) {
                this.callbacks.onCursorMove({
                    context: contextForCursor(cursor),
                });
            }
        }
    }

    getCursor() {
        return this.mathField.__controller.cursor;
    }

    getSelection() {
        return this.getCursor().selection;
    }

    getContent() {
        return this.mathField.latex();
    }

    setContent(latex: string) {
        this.mathField.latex(latex);
    }

    isEmpty() {
        const cursor = this.getCursor();
        return cursor.parent.id === 1 && cursor[1] === 0 && cursor[-1] === 0;
    }

    _handleLeftArrow(cursor) {
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
        if (cursor[MQ.L] === MathFieldActionType.MQ_END) {
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
        this.mathField.keystroke("Left");
    }

    _handleRightArrow(cursor) {
        const command = maybeFindCommand(cursor[MQ.R]);
        if (command) {
            // Similarly, if a function is to our right, then we need to place
            // the cursor at the start of its parenthetical content, which is
            // done by putting it to the left of ites parentheses and then
            // moving right once.
            cursor.insLeftOf(command.endNode);
            this.mathField.keystroke("Right");
        } else {
            // Otherwise, we default to the standard MathQull right behavior.
            this.mathField.keystroke("Right");
        }
    }

    _handleExponent(cursor, key) {
        // If there's an invalid operator preceding the cursor (anything that
        // knowingly cannot be raised to a power), add an empty set of
        // parentheses and apply the exponent to that.
        const invalidPrefixes = [...ArithmeticOperators, ...EqualityOperators];

        const precedingNode = cursor[MQ.L];
        const shouldPrefixWithParens =
            precedingNode === MathFieldActionType.MQ_END ||
            invalidPrefixes.includes(precedingNode.ctrlSeq.trim());
        if (shouldPrefixWithParens) {
            this.mathField.write("\\left(\\right)");
        }

        // Insert the appropriate exponent operator.
        switch (key) {
            case "EXP":
                this.mathField.cmd("^");
                break;

            case "EXP_2":
            case "EXP_3":
                this.mathField.write(`^${key === "EXP_2" ? 2 : 3}`);

                // If we enter a square or a cube, we should leave the cursor
                // within the newly inserted parens, if they exist. This takes
                // exactly four left strokes, since the cursor by default would
                // end up to the right of the exponent.
                if (shouldPrefixWithParens) {
                    this.mathField.keystroke("Left");
                    this.mathField.keystroke("Left");
                    this.mathField.keystroke("Left");
                    this.mathField.keystroke("Left");
                }
                break;

            default:
                throw new Error(`Invalid exponent key: ${key}`);
        }
    }
}

export default MathWrapper;
