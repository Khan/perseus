import type {PerseusItem} from "../../perseus-types";
import { parse } from "./parse";
import {parsePerseusItem as typecheckPerseusItem} from "./perseus-parsers/perseus-item";
import { isFailure } from "./result";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */
// TODO: Don't return the (invalid) item if parsing fails.
export function parsePerseusItem(json: string): {
    item: PerseusItem;
    errors: Error[];
} {
    const object: unknown = JSON.parse(json);
    const perseusItemResult = parse(object, typecheckPerseusItem);
    if (isFailure(perseusItemResult)) {
        const {message, path} = perseusItemResult.detail
        return {
            item: object as PerseusItem,
            // TODO: better path serialization
            errors: [new Error("At " + ["(root)", path].join(".") + " -- " + message)],
        }
    }
    return {item: perseusItemResult.value, errors: []};
}
