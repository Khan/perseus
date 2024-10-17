import {ParseContext, ParseResult} from "../parser-types";
import {ctx} from "./test-helpers";
import {success} from "../result";

export function boolean(rawValue: unknown, ctx: ParseContext): ParseResult<boolean> {
    if (typeof rawValue === "boolean") {
        return ctx.success(rawValue)
    }
    return ctx.failure("boolean", rawValue)
}
