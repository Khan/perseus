import {isRealJSONParse} from "../is-real-json-parse";

import type {PerseusItem} from "../../perseus-types";
import {parse} from "./parse";
import {message} from "./parse-failure-detail";
import {parsePerseusItem as typecheckPerseusItem} from "./perseus-parsers/perseus-item";
import {failure, isFailure} from "./result";

import type {Result} from "./result";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */
export function parsePerseusItem(json: string): Result<PerseusItem, string> {
    // Try to block a cheating vector which relies on monkey-patching
    // JSON.parse
    if (isRealJSONParse(JSON.parse)) {
        const object: unknown = JSON.parse(json);
        const perseusItemResult = parse(object, typecheckPerseusItem);
        // TODO: extract mapFailure function
        if (isFailure(perseusItemResult)) {
            return failure(perseusItemResult.detail.map(message).join("; "));
        }
        return perseusItemResult;
    }
    throw new Error("Something went wrong.");
}
