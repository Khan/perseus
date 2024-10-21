import { PartialParser } from "../parser-types";

export function convertTo<In, Out>(converter: (value: In) => Out): PartialParser<In, Out> {
    return (rawVal, ctx) => {
        return ctx.success(converter(rawVal))
    }
}
