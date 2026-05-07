import type {Parser} from "../parser-types";

/**
 * Returns success if the `rawValue` is a finite real number. Fails for any
 * other value.
 */
export const number: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
        return ctx.success(rawValue);
    }
    return ctx.failure("number", rawValue);
};
