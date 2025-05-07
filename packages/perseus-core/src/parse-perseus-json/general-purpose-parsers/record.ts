import {failure, isFailure, isSuccess} from "../result";

import {isPlainObject} from "./is-plain-object";

import type {Mismatch, Parser} from "../parser-types";

export function record<K extends string, V>(
    parseKey: Parser<K>,
    parseValue: Parser<V>,
): Parser<Record<K, V>> {
    return (rawValue, ctx) => {
        if (!isPlainObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const result = {} as Record<K, V>;
        const mismatches: Mismatch[] = [];
        for (const [key, value] of Object.entries(rawValue)) {
            const entryCtx = ctx.forSubtree(key);
            const keyResult = parseKey(key, entryCtx);
            if (isFailure(keyResult)) {
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                mismatches.push(...keyResult.detail);
            }

            const valueResult = parseValue(value, entryCtx);
            if (isFailure(valueResult)) {
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                mismatches.push(...valueResult.detail);
            }

            if (isSuccess(keyResult) && isSuccess(valueResult)) {
                // TODO(LEMS-3083): Remove eslint suppression
                // eslint-disable-next-line functional/immutable-data
                result[keyResult.value] = valueResult.value;
            }
        }

        if (mismatches.length > 0) {
            return failure(mismatches);
        }
        return ctx.success(result);
    };
}
