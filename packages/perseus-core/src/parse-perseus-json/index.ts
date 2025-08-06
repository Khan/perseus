import {isRealJSONParse} from "../utils/is-real-json-parse";

import {parse} from "./parse";
import {parsePerseusArticle as migrateAndTypecheckPerseusArticle} from "./perseus-parsers/perseus-article";
import {parsePerseusItem as migrateAndTypecheckPerseusItem} from "./perseus-parsers/perseus-item";
import {parseUserInputMap} from "./perseus-parsers/user-input-map";
import {failure, isFailure} from "./result";

import type {Result} from "./result";
import type {PerseusItem, PerseusArticle} from "../data-schema";
import type {UserInputMap} from "../validation.types";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @deprecated - use parseAndMigratePerseusItem instead
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

export type ParseFailureDetail = {
    /**
     * A human-readable error message describing where in the object tree
     * parsing failed.
     */
    message: string;
    /**
     * The raw result of parsing the input JSON, with no migrations applied.
     * Use at your own risk.
     */
    invalidObject: unknown;
};

/**
 * Parses a PerseusItem from a plain object or JSON string, migrates old
 * formats to the latest schema, and runtime-typechecks the result. Use this to
 * parse assessmentItem data.
 *
 * @returns a {@link Result} of the parsed PerseusItem. If the result is a
 * failure, it will contain an error message describing where in the tree
 * parsing failed.
 * @throws SyntaxError if the argument is not well-formed JSON.
 */
export function parseAndMigratePerseusItem(
    data: unknown,
): Result<PerseusItem, ParseFailureDetail> {
    throwErrorIfCheatingDetected();
    const object: unknown = typeof data === "string" ? JSON.parse(data) : data;
    const result = parse(object, migrateAndTypecheckPerseusItem);
    if (isFailure(result)) {
        return failure({message: result.detail, invalidObject: object});
    }
    return result;
}

/**
 * Parses a PerseusArticle from a plain object (or array) or JSON string,
 * migrates old formats to the latest schema, and runtime-typechecks the
 * result.
 *
 * @returns a {@link Result} of the parsed PerseusArticle. If the result is a
 * failure, it will contain an error message describing where in the tree
 * parsing failed.
 * @throws SyntaxError if the argument is not well-formed JSON.
 */
export function parseAndMigratePerseusArticle(
    data: unknown,
): Result<PerseusArticle, ParseFailureDetail> {
    throwErrorIfCheatingDetected();
    const object: unknown = typeof data === "string" ? JSON.parse(data) : data;
    const result = parse(object, migrateAndTypecheckPerseusArticle);
    if (isFailure(result)) {
        return failure({message: result.detail, invalidObject: object});
    }
    return result;
}

/**
 * Parses a UserInputMap from a plain object or JSON string, migrates old
 * formats to the latest schema, and runtime-typechecks the result.
 *
 * @returns a {@link Result} of the parsed UserInputMap. If the result is a
 * failure, it will contain an error message describing where in the tree
 * parsing failed.
 * @throws SyntaxError if the argument is a string that is not well-formed
 * JSON.
 */
export function parseAndMigrateUserInputMap(
    data: unknown,
): Result<UserInputMap, ParseFailureDetail> {
    const object: unknown = typeof data === "string" ? JSON.parse(data) : data;
    const result = parse(object, parseUserInputMap);
    if (isFailure(result)) {
        return failure({message: result.detail, invalidObject: object});
    }
    return result;
}

/**
 * Tries to block a cheating vector that relies on monkey-patching JSON.parse.
 */
// TODO(LEMS-2331): delete this function once server-side scoring is done.
function throwErrorIfCheatingDetected() {
    if (!isRealJSONParse(JSON.parse)) {
        throw new Error("Something went wrong.");
    }
}
