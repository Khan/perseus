import type {ParsedValue, Parser} from "../parser-types";

type ObjectSchema = Record<keyof any, Parser<any>>;

export function object<S extends ObjectSchema>(
    schema: S,
): Parser<{[K in keyof S]: ParsedValue<S[K]>}> {
    return (rawValue, ctx) => {
        if (!isObject(rawValue)) {
            return ctx.failure("object", rawValue);
        }

        for (const [prop, propParser] of Object.entries(schema)) {
            const result = propParser(rawValue[prop], ctx.forSubtree(prop));
            if (result.type === "failure") {
                return result;
            }
        }

        return ctx.success(rawValue as {[K in keyof S]: ParsedValue<S[K]>});
    };
}

function isObject(x: unknown): x is Record<keyof any, unknown> {
    return x != null && Object.getPrototypeOf(x) === Object.prototype;
}
