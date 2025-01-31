import type {Parser} from "../parser-types";

export const number: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue === "number") {
        return ctx.success(rawValue);
    }
    return ctx.failure("number", rawValue);
};
