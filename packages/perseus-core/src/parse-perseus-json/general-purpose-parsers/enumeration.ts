import type {Parser} from "../parser-types";

export function enumeration<T extends Array<string | null | undefined>>(
    ...acceptedValues: T
): Parser<T[number]> {
    return (rawValue, ctx) => {
        if (typeof rawValue === "string" || rawValue == null) {
            const index = acceptedValues.indexOf(rawValue);
            if (index > -1) {
                return ctx.success(acceptedValues[index]);
            }
        }
        const expected = acceptedValues.map((v) => JSON.stringify(v));
        return ctx.failure(expected, rawValue);
    };
}
