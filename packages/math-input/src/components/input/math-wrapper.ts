/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */

import $ from "jquery";

import Key from "../../data/keys";
import {MathFieldInterface, MathFieldActionType} from "../../types";
import keyTranslator from "../key-translator";

import {CursorContext} from "./cursor-contexts";
import handleBackspace from "./handle-backspace";
import {
    isFraction,
    isParens,
    isLeaf,
    isNumerator,
    isDenominator,
    isSubScript,
    isSuperScript,
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

const KeysForJumpContext = {
    [CursorContext.IN_PARENS]: "JUMP_OUT_PARENTHESES",
    [CursorContext.IN_SUPER_SCRIPT]: "JUMP_OUT_EXPONENT",
    [CursorContext.IN_SUB_SCRIPT]: "JUMP_OUT_BASE",
    [CursorContext.BEFORE_FRACTION]: "JUMP_INTO_NUMERATOR",
    [CursorContext.IN_NUMERATOR]: "JUMP_OUT_NUMERATOR",
    [CursorContext.IN_DENOMINATOR]: "JUMP_OUT_DENOMINATOR",
};

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
            this._handleJumpOut(cursor, key);
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
            context: this.contextForCursor(cursor),
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
                    context: this.contextForCursor(cursor),
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

    /**
     * Advances the cursor to the next logical position.
     *
     * @param {cursor} cursor
     * @private
     */
    _handleJumpOut(cursor, key) {
        const context = this.contextForCursor(cursor);

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
                break;

            case CursorContext.BEFORE_FRACTION:
                // Find the nearest fraction to the right of the cursor.
                let fractionNode;
                let visitor = cursor;
                while (visitor[MQ.R] !== MathFieldActionType.MQ_END) {
                    if (isFraction(visitor[MQ.R])) {
                        fractionNode = visitor[MQ.R];
                    }
                    visitor = visitor[MQ.R];
                }

                // Jump into it!
                cursor.insLeftOf(fractionNode);
                this.mathField.keystroke("Right");
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
                    this.mathField.keystroke("Right");
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
                if (isParens(cursor[MQ.R])) {
                    this.mathField.keystroke("Right");
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

    contextForCursor(cursor) {
        // First, try to find any fraction to the right, unimpeded.
        let visitor = cursor;
        while (visitor[MQ.R] !== MathFieldActionType.MQ_END) {
            if (isFraction(visitor[MQ.R])) {
                return CursorContext.BEFORE_FRACTION;
            } else if (!isLeaf(visitor[MQ.R])) {
                break;
            }
            visitor = visitor[MQ.R];
        }

        // If that didn't work, check if the parent or grandparent is a special
        // context, so that we can jump outwards.
        if (isParens(cursor.parent && cursor.parent.parent)) {
            return CursorContext.IN_PARENS;
        } else if (isNumerator(cursor.parent)) {
            return CursorContext.IN_NUMERATOR;
        } else if (isDenominator(cursor.parent)) {
            return CursorContext.IN_DENOMINATOR;
        } else if (isSubScript(cursor.parent)) {
            return CursorContext.IN_SUB_SCRIPT;
        } else if (isSuperScript(cursor.parent)) {
            return CursorContext.IN_SUPER_SCRIPT;
        } else {
            return CursorContext.NONE;
        }
    }

    _isAtTopLevel(cursor) {
        return !cursor.parent.parent;
    }
}

export default MathWrapper;
