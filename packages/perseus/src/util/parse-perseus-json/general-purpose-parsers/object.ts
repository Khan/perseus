import {failure, isSuccess} from "../result";

import {isObject} from "./is-object";

import type {Mismatch, ParsedValue, Parser} from "../parser-types";

type ObjectSchema = Record<keyof any, Parser<any>>;

export function object<S extends ObjectSchema>(
    schema: S,
): Parser<{[K in keyof S]: ParsedValue<S[K]>}> {
    return (rawValue, ctx) => {
        if (!isObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const ret: any = {...rawValue};
        const mismatches: Mismatch[] = [];
        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (isSuccess(result)) {
                ret[prop] = result.value;
            } else {
                mismatches.push(...result.detail);
            }
        }

        if (mismatches.length > 0) {
            return failure(mismatches);
        }
        return ctx.success(ret);
    };
}