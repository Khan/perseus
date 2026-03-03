import {failure, isSuccess} from "../result";

import {isPlainObject} from "./is-plain-object";

import type {OptionalizeProperties} from "./object-types";
import type {Mismatch, ParsedValue, Parser} from "../parser-types";

type ObjectSchema = Record<keyof any, Parser<any>>;

export function objectWithAllPropertiesRequired<S extends ObjectSchema>(
    schema: S,
): Parser<{[K in keyof S]: ParsedValue<S[K]>}> {
    return strictObject(schema) as any;
}

// "looseObject" is Zod's term for a parser that includes unrecognized fields

// "strictObject" leaves out unrecognized fields

// we want "object" to mean "strictObject" but we also want "looseObject" available for specific cases.

// currently, "object" means "looseObject"

export function strictObject<S extends ObjectSchema>(
    schema: S,
): Parser<OptionalizeProperties<{[K in keyof S]: ParsedValue<S[K]>}>> {
    return (rawValue, ctx) => {
        if (!isPlainObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const ret: any = {};
        const mismatches: Mismatch[] = [];
        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (isSuccess(result)) {
                if (result.value !== undefined || prop in rawValue) {
                    ret[prop] = result.value;
                }
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


export function looseObject<S extends ObjectSchema>(
    schema: S,
): Parser<OptionalizeProperties<{[K in keyof S]: ParsedValue<S[K]>}>> {
    return (rawValue, ctx) => {
        if (!isPlainObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const ret: any = {...rawValue};
        const mismatches: Mismatch[] = [];
        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (isSuccess(result)) {
                if (result.value !== undefined || prop in rawValue) {
                    ret[prop] = result.value;
                }
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
