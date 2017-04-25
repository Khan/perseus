// @flow
/**
 * Utility functions for highlighting UI.
 */
import type {Position} from "./types.js";

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

module.exports = {
    getRelativePosition,
};
