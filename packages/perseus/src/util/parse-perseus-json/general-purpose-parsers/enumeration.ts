import type {Parser} from "../parser-types";

export function enumeration<T extends readonly string[]>(
    ...acceptedValues: T
): Parser<T[number]> {
    return (rawValue, ctx) => {
        if (typeof rawValue === "string") {
            const index = acceptedValues.indexOf(rawValue);
            if (index > -1) {
                return ctx.success(acceptedValues[index]);
            }
        }
        const expected = acceptedValues.map((v) => JSON.stringify(v));
        return ctx.failure(expected, rawValue);
    };
}
