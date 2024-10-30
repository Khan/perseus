import {isObject} from "./is-object";

import type {ParsedValue, Parser} from "../parser-types";

type ObjectSchema = Record<keyof any, Parser<any>>;

export function object<S extends ObjectSchema>(
    schema: S,
): Parser<{[K in keyof S]: ParsedValue<S[K]>}> {
    return (rawValue, ctx) => {
        if (!isObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const ret: any = {...rawValue};
        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (result.type === "failure") {
                return result;
            }
            ret[prop] = result.value;
        }

        return ctx.success(ret);
    };
}
