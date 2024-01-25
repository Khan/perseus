import type {PerseusItem} from "../perseus-types";

/**
 * Helper to parse Perseus JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} input - the stringified Perseus JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */
export default function parsePerseusJSON(input: string): PerseusItem {
    return JSON.parse(input);
}
