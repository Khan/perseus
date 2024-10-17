import type {Parser} from "../parser-types";

export function enumeration<T extends readonly string[]>(
    acceptedValues: T,
): Parser<T[number]> {
    return (rawValue, ctx) => {
        if (typeof rawValue === "string" && acceptedValues.includes(rawValue)) {
            return ctx.success(rawValue as T[number]);
        }
        const expected =
            "one of " + acceptedValues.map((v) => JSON.stringify(v)).join(", ");
        return ctx.failure(expected, rawValue);
    };
}
