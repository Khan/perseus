import {isFailure} from "../result";

import {isObject} from "./is-object";

import type {Parser} from "../parser-types";

export function record<K extends string, V>(
    parseKey: Parser<K>,
    parseValue: Parser<V>,
): Parser<Record<K, V>> {
    return (rawValue, ctx) => {
        if (!isObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const result = {} as Record<K, V>;
        for (const [key, value] of Object.entries(rawValue)) {
            const entryCtx = ctx.forSubtree(key);
            const keyResult = parseKey(key, entryCtx);
            if (isFailure(keyResult)) {
                return keyResult;
            }

            const valueResult = parseValue(value, entryCtx);
            if (isFailure(valueResult)) {
                return valueResult;
            }

            result[keyResult.value] = valueResult.value;
        }
        return ctx.success(result);
    };
}
