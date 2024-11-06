import {isRealJSONParse} from "./is-real-json-parse";

import type {PerseusItem} from "../perseus-types";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */
export function parsePerseusItem(json: string): PerseusItem {
    // Try to block a cheating vector which relies on monkey-patching
    // JSON.parse
    if (isRealJSONParse(JSON.parse)) {
        return JSON.parse(json);
    }
    throw new Error("Something went wrong.");
}
