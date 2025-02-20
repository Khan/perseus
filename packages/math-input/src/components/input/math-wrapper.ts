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

import handleBackspace from "../key-handlers/handle-backspace";
import {getKeyTranslator} from "../key-handlers/key-translator";

import {getCursorContext, maybeFindCommand} from "./mathquill-helpers";
import {createMathField, mathQuillInstance} from "./mathquill-instance";

import type {
    MathFieldInterface,
    MathFieldUpdaterCallback,
} from "./mathquill-types";
import type Key from "../../data/keys";
import type {MathInputStrings} from "../../strings";

/**
 * This file contains a wrapper around MathQuill so that we can provide a
 * more regular interface for the functionality we need while insulating us
 * from MathQuill changes.
 */
class MathWrapper {
    mathField: MathFieldInterface; // MathQuill MathField input
    callbacks: any;
    mobileKeyTranslator: Record<Key, MathFieldUpdaterCallback>;

    constructor(
        mathFieldMount,
        ariaLabel: string,
        strings: MathInputStrings,
        locale: string,
        callbacks = {},
    ) {
        this.mathField = createMathField(
            mathFieldMount,
            locale,
            strings,
            () => {
                return {
                    // use a span instead of a textarea so that we don't bring up the
                    // native keyboard on mobile when selecting the input
                    substituteTextarea: function () {
                        return document.createElement("span");
                    },
                };
            },
        );
        this.mathField?.setAriaLabel(ariaLabel);

        this.callbacks = callbacks;

        this.mobileKeyTranslator = {
            ...getKeyTranslator(locale, strings),
            // note(Matthew): our mobile backspace logic is really complicated
            // and for some reason doesn't really work in the desktop experience.
            // So we default to the basic backspace functionality in the
            // key translator and overwrite it with the complicated logic here
            // until we can unify the experiences (if we even want to).
            // https://khanacademy.atlassian.net/browse/LC-906
            BACKSPACE: handleBackspace,
        };
    }

    focus() {
        // HACK(charlie): We shouldn't reaching into MathQuill internals like
        // this, but it's the easiest way to allow us to manage the focus state
        // ourselves.
        this.mathField.cursor().show();

        // Set MathQuill's internal state to reflect the focus, otherwise it
        // will consistently try to hide the cursor on key-press and introduce
        // layout jank.
        this.mathField.focus();
    }

    blur() {
        this.mathField.cursor().hide();
        this.mathField.blur();
    }

    /**
     * Handle a key press and return the resulting cursor state.
     *
     * @param {Key} key - an enum representing the key that was pressed
     * @returns {object} a cursor object, consisting of a cursor context
     */
    pressKey(key: Key) {
        const cursor = this.getCursor();
        const translator = this.mobileKeyTranslator[key];

        if (translator) {
            translator(this.mathField, key);
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
            context: this.contextForCursor(),
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
                cursor.insAtRightEnd(this.mathField.controller().root);
            } else {
                // Otherwise place beside the element at x, y.
                const controller = this.mathField.controller();

                const pageX = x - document.body.scrollLeft;
                const pageY = y - document.body.scrollTop;
                controller.seek(el, pageX, pageY).cursor.startSelection();

                // Unless that would leave us mid-command, in which case, we
                // need to adjust and place the cursor inside the parens
                // following the command.
                const command = maybeFindCommand(cursor[mathQuillInstance.L]);
                if (command && command.endNode) {
                    // NOTE(charlie): endNode should definitely be \left(.
                    cursor.insLeftOf(command.endNode);
                    this.mathField.keystroke("Right");
                }
            }

            if (this.callbacks.onCursorMove) {
                this.callbacks.onCursorMove({
                    context: this.contextForCursor(),
                });
            }
        }
    }

    // note(Matthew): extracted this logic to share it elsewhere,
    // but it's part of the public MathWrapper API
    getCursor() {
        return this.mathField.cursor();
    }

    // note(Matthew): extracted this logic to keep this file focused,
    // but it's part of the public MathWrapper API
    contextForCursor() {
        return getCursorContext(this.mathField);
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
}

export default MathWrapper;
