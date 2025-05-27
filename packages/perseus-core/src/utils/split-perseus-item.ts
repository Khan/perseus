import {parseAndMigratePerseusItem} from "../parse-perseus-json";
import {
    failure,
    isFailure,
    type Result,
    success,
} from "../parse-perseus-json/result";

import deepClone from "./deep-clone";
import splitPerseusRenderer from "./split-perseus-renderer";

import type {PerseusItem} from "../data-schema";

/**
 * Return a copy of a PerseusItem with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusItem (which includes the rubric - aka answer data)
 */
export default function splitPerseusItem(original: PerseusItem): PerseusItem {
    const item = deepClone(original);

    return {
        ...item,
        question: splitPerseusRenderer(item.question),
        // the final hint often exposes the answer
        // so we consider that part of the answer data
        hints: [],
    };
}

/**
 * Returns a JSON copy of a PerseusItem with rubric data (i.e. answers and
 * hints) removed. Idempotent and deterministic.
 *
 * @param data a {@linkcode PerseusItem}, either as JSON or as an object.
 * @returns {Result} containing either the JSON (on success) or an
 * error message (on failure).
 * @throws {SyntaxError} given malformed JSON.
 */
export function splitPerseusItemJSON(data: unknown): Result<string, string> {
    const parseResult = parseAndMigratePerseusItem(data);
    if (isFailure(parseResult)) {
        return failure(parseResult.detail.message);
    }
    const item = parseResult.value;

    return success(JSON.stringify(splitPerseusItem(item)));
}
