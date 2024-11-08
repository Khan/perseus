import type {Parser} from "../parser-types";

type Primitive = string | number | boolean | null | undefined;

export function constant<T extends Primitive>(acceptedValue: T): Parser<T> {
    return (rawValue, ctx) => {
        if (rawValue !== acceptedValue) {
            return ctx.failure(String(JSON.stringify(acceptedValue)), rawValue);
        }
        return ctx.success(acceptedValue);
    };
}
