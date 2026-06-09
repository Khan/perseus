import {parseAndMigratePerseusItem} from "@khanacademy/perseus-core";

import type {
    ParseFailureDetail,
    PerseusItem,
    Result,
} from "@khanacademy/perseus-core";

export function safeParsePerseusItem(
    data: unknown,
): Result<PerseusItem, ParseFailureDetail> {
    try {
        // parseAndMigratePerseusItem throws if `data` is a string that is
        // not well-formed JSON. We catch the error and convert it to a
        // `Failure` value so it is uniform with the parser `Result`.
        return parseAndMigratePerseusItem(data);
    } catch (e) {
        const error = convertCaughtValueToError(e);
        return {
            type: "failure",
            detail: {message: error.message, invalidObject: data},
        };
    }
}

function convertCaughtValueToError(e: unknown): Error {
    if (e instanceof Error) {
        return e;
    }
    return new Error(String(e));
}
