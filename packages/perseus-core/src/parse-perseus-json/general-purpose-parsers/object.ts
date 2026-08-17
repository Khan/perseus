import {failure, isSuccess} from "../result";

import {isPlainObject} from "./is-plain-object";

import type {OptionalizeProperties} from "./object-types";
import type {Mismatch, ParsedValue, Parser} from "../parser-types";

type ObjectSchema = Record<keyof any, Parser<any>>;

/**
 * Given a `schema`, returns an object parser. The parser accepts an object
 * iff each sub-parser in the `schema` accepts the object's corresponding
 * property value.
 *
 * The returned parser filters out properties not present in the schema. If
 * you don't want this behavior, try `looseObject`.
 */
export function object<S extends ObjectSchema>(
    schema: S,
): Parser<OptionalizeProperties<{[K in keyof S]: ParsedValue<S[K]>}>> {
    return objectParserWithInitializer(
        // Initialize the parsed value to an empty object, ensuring that
        // it only contains keys listed in the `schema`.
        () => ({}),
        schema,
    );
}

/**
 * Given a `schema`, returns an object parser. The parser accepts an object
 * iff each sub-parser in the `schema` accepts the object's corresponding
 * property value.
 *
 * The parser preserves any object properties not present in the schema. If
 * you want unrecognized properties to be filtered out instead, try `object`.
 */
export function looseObject<S extends ObjectSchema>(
    schema: S,
): Parser<OptionalizeProperties<{[K in keyof S]: ParsedValue<S[K]>}>> {
    return objectParserWithInitializer(
        // Initialize the parsed value from the raw value's properties, so
        // properties not listed in the schema are preserved.
        (rawValue) => ({...rawValue}),
        schema,
    );
}

type AnyObject = Record<keyof any, unknown>;

function objectParserWithInitializer<S extends ObjectSchema>(
    initializeParsedValue: (rawValue: AnyObject) => AnyObject,
    schema: S,
): Parser<OptionalizeProperties<{[K in keyof S]: ParsedValue<S[K]>}>> {
    return (rawValue, ctx) => {
        if (!isPlainObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        const parsed: any = initializeParsedValue(rawValue);
        const mismatches: Mismatch[] = [];
        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (isSuccess(result)) {
                if (result.value !== undefined || prop in rawValue) {
                    parsed[prop] = result.value;
                }
            } else {
                mismatches.push(...result.detail);
            }
        }

        if (mismatches.length > 0) {
            return failure(mismatches);
        }
        return ctx.success(parsed);
    };
}
