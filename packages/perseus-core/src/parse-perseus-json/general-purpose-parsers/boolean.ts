import type {ParseContext, ParseResult} from "../parser-types";

export function boolean(
    rawValue: unknown,
    ctx: ParseContext,
): ParseResult<boolean> {
    if (typeof rawValue === "boolean") {
        return ctx.success(rawValue);
    }
    return ctx.failure("boolean", rawValue);
}
