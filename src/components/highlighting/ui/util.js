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
            for (const rect of intersectedRange.getClientRects()) {
                mutableRects.push(rect);
            }
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

module.exports = {
    getClientRectsForTextInRange,
    getRelativePosition,
    getRelativeRect,
};
