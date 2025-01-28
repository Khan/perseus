import type {Parser} from "../parser-types";

export const any: Parser<any> = (rawValue, ctx) => ctx.success(rawValue);
