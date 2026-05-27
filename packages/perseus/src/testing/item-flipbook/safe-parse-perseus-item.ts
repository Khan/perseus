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
