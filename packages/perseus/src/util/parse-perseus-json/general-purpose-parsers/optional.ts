import {Parser} from "../parser-types";
import {failure, isFailure} from "../result";

export function optional<T>(parseValue: Parser<T>): Parser<T | undefined> {
    return (rawValue, ctx) => {
        if (rawValue === undefined) {
            return ctx.success(rawValue)
        }
        return parseValue(rawValue, ctx)
    }
}
