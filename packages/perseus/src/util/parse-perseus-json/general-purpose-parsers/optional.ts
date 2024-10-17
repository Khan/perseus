import type {Parser} from "../parser-types";

export function optional<T>(parseValue: Parser<T>): Parser<T | undefined> {
    return (rawValue, ctx) => {
        if (rawValue === undefined) {
            return ctx.success(rawValue);
        }
        return parseValue(rawValue, ctx);
    };
}
