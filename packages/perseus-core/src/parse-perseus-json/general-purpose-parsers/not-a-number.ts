import type {Parser} from "../parser-types";

/**
 * Returns success given NaN, and failure for any other value. This parser is
 * needed because NaN !== NaN, and therefore `constant(NaN)` will not work as
 * you might expect.
 */
export const notANumber: Parser<number> = (rawValue, ctx) => {
    if (Number.isNaN(rawValue)) {
        return ctx.success(NaN);
    }

    return ctx.failure("NaN", rawValue);
};
