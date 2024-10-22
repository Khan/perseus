import type {Parser} from "../parser-types";

export function defaulted<T>(parser: Parser<T>, fallback: () => T): Parser<T> {
    return (rawValue, ctx) => {
        if (rawValue === undefined) {
            return ctx.success(fallback());
        }
        return parser(rawValue, ctx);
    };
}
