import type {Parser} from "../parser-types";

export const unknown: Parser<unknown> = (rawValue, ctx) =>
    ctx.success(rawValue);
