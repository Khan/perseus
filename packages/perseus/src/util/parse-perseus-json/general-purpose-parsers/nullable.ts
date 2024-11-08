import type {Parser} from "../parser-types";

export function nullable<T>(parseValue: Parser<T>): Parser<T | null> {
    return (rawValue, ctx) => {
        if (rawValue === null) {
            return ctx.success(rawValue);
        }
        return parseValue(rawValue, ctx);
    };
}
