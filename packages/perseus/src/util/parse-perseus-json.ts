import type {StandardItem} from "../perseus-types";

/**
 * Helper to parse StandardItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified StandardItem JSON
 * @returns {StandardItem} the parsed StandardItem object
 */
export function parsePerseusItem(json: string): StandardItem {
    return JSON.parse(json);
}
