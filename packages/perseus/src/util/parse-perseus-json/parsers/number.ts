import type {Parser} from "../parser-types";

export const number: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue === "number") {
        return ctx.success(rawValue)
    }
    const message = `expected a number, but got ${JSON.stringify(rawValue)}`;
    return ctx.failure(message, rawValue)
}
