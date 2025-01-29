import type {PartialParser} from "../parser-types";

export const stringToNumber: PartialParser<string | number, number> = (
    rawValue,
    ctx,
) => {
    if (typeof rawValue === "number") {
        return ctx.success(rawValue);
    }

    const parsedNumber = +rawValue;
    if (rawValue === "" || isNaN(parsedNumber)) {
        return ctx.failure("a number or numeric string", rawValue);
    }

    return ctx.success(parsedNumber);
};
