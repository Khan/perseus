import type {Parser} from "../parser-types";

export const string: Parser<string> = (rawValue, ctx) => {
    if (typeof rawValue === "string") {
        return ctx.success(rawValue);
    }
    return ctx.failure("string", rawValue);
};
