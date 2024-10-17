import {Parser} from "../parser-types";

export const any: Parser<any> = (rawValue, ctx) => ctx.success(rawValue);
