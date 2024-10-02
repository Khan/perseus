import type {PerseusItem} from "../perseus-types";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */

const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
// @ts-expect-error - TS2339: Property JSON does not exist on type Window
const safeParse = iframe.contentWindow?.JSON?.parse ?? JSON.parse;

export function parsePerseusItem(json: string): PerseusItem {
    return safeParse(json);
}
