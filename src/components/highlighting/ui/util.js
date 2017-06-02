// @flow
/**
 * Utility functions for highlighting UI.
 */
import type {DOMRange, Position, Rect} from "./types.js";

const {rangesOverlap, intersectRanges} = require("../ranges.js");

/**
 * Given two positions relative to the same origin, return `child`'s position
 * relative to `parent`'s position.
 */
function getRelativePosition(child: Position, parent: Position): Position {
    return {
        left: child.left - parent.left,
        top: child.top - parent.top,
    };
}

/**
 * `getRelativePosition`, but for Rects.
 *
 * Given a rectangle and a position relative to the same origin, return a new
 * rectangle of the same size, whose position is relative to the given
 * position.
 */
function getRelativeRect(child: Rect, parent: Position): Rect {
    return {
        ...getRelativePosition(child, parent),
        width: child.width,
        height: child.height,
    };
}

/**
 * Given a DOMRange, return a list of client-relative rects that cover the text
 * inside the DOMRange.
 *
 * This behaves differently than the browser's built-in `getClientRects` method
 * for DOMRanges, because this method only gets rects for the *text* nodes,
 * whereas the browser's method will also return rects for any fully-contained
 * *element* nodes.
 *
 * For example, if an entire paragraph is selected, then `getClientRects` will
 * return a rectangle that covers the entire paragraph block, whereas this
 * method will only return rectangles for the text inside the paragraph.
 */
function getClientRectsForTextInRange(range: DOMRange): Rect[] {
    const mutableRects = [];
    addClientRectsForTextInNodeAndRange(
        range.commonAncestorContainer, range, mutableRects);
    return mutableRects;
}

/**
 * A helper method for getClientRectsForTextInRange.
 *
 * Given a node and a range, find text that is contained within both the node
 * and the range by recursing down the node's subtree, and push the text's
 * client rects onto the given `mutableRects` array.
 */
function addClientRectsForTextInNodeAndRange(
    node: Node, range: DOMRange, mutableRects: Rect[],
): void {
    const nodeContentsRange = new Range();
    nodeContentsRange.selectNodeContents(node);

    if (node.nodeType === Node.TEXT_NODE) {
        // Get the text that appears both in this text node and in the range
        // we're searching.
        const intersectedRange = intersectRanges(range, nodeContentsRange);
        if (intersectedRange) {
            addClientRectsForText(node, intersectedRange, mutableRects);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Don't bother deep-traversing a node that doesn't even overlap the
        // range we're searching.
        if (!rangesOverlap(range, nodeContentsRange)) {
            return;
        }

        for (const child of node.childNodes) {
            // TODO(mdr): If this parent has overflow: hidden, bound the child
            //     rects accordingly. This would allow us to remove the hack
            //     we added to .perseus-sr-only.
            addClientRectsForTextInNodeAndRange(child, range, mutableRects);
        }
    }
}

/**
 * Given a DOMRange of text fully contained by the given `textNode`, compute
 * rectangles that visually cover the range, and push them onto the given
 * `mutableRects` array.
 *
 * This function adjusts the rectangles to the line height of the text, to
 * match the visual behavior of native text selection, and remove annoying gaps
 * between lines that disrupt hover behavior.
 */
function addClientRectsForText(
    textNode: Node, textRange: DOMRange, mutableRects: Rect[],
): void {
    const parentElement = textNode.parentElement;
    const computedStyle = window.getComputedStyle(parentElement);

    // NOTE(mdr): I'm not sure how computed line height works in all contexts
    //     in all browsers. It's valid to specify line height as a ratio,
    //     relative to font size. Latest Chrome seems to transform this into a
    //     px value, but maybe some browsers don't, so I'm being defensive here
    //     and only using the computed line height if it's explicitly a px
    //     value. We could also handle other browsers by computing font size
    //     and doing the math ourselves, but let's punt that until we need it.
    let lineHeight = null;
    if (
        typeof computedStyle.lineHeight === "string" &&
        computedStyle.lineHeight.endsWith("px")
    ) {
        const parsedLineHeight = parseFloat(computedStyle.lineHeight);
        if (!isNaN(parsedLineHeight)) {
            lineHeight = parsedLineHeight;
        }
    }

    // NOTE(mdr): Safari returns a non-iterable `getClientRects` object, so
    //     convert it to an array.
    const boundingRects = Array.from(textRange.getClientRects());

    for (const boundingRect of boundingRects) {
        const rect: Rect = {
            left: boundingRect.left,
            top: boundingRect.top,
            height: boundingRect.height,
            width: boundingRect.width,
        };

        // Adjust the rectangle according to the text's line height. It should
        // keep the same bottom coordinate, so the top coordinate will move
        // accordingly.
        if (lineHeight !== null) {
            const heightIncrease = lineHeight - rect.height;
            rect.top -= heightIncrease;
            rect.height = lineHeight;
        }

        mutableRects.push(rect);
    }
}

module.exports = {
    getClientRectsForTextInRange,
    getRelativePosition,
    getRelativeRect,
};
