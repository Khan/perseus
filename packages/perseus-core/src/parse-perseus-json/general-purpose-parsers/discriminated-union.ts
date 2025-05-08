import {isPlainObject} from "./is-plain-object";

import type {ParseContext, Parser} from "../parser-types";

type Primitive = number | string | boolean | null | undefined;

/**
 * discriminatedUnion() should be preferred over union() when parsing a
 * discriminated union type, because discriminatedUnion() produces more
 * understandable failure messages. It takes the discriminant as the source of
 * truth for which variant is to be parsed, and expects the other data to match
 * that variant.
 */
export function discriminatedUnionOn<DK extends string>(discriminantKey: DK) {
    const noMoreBranches: Parser<never> = (raw: unknown, ctx: ParseContext) => {
        if (!isPlainObject(raw)) {
            return ctx.failure("object", raw);
        }
        return ctx
            .forSubtree(discriminantKey)
            .failure("a valid value", raw[discriminantKey]);
    };

    return new DiscriminatedUnionBuilder(discriminantKey, noMoreBranches);
}

class DiscriminatedUnionBuilder<
    DK extends string,
    Union extends {[k in DK]: Primitive},
> {
    constructor(
        private discriminantKey: DK,
        public parser: Parser<Union>,
    ) {}

    withBranch<Variant extends {[k in DK]: Primitive}>(
        discriminantValue: Primitive,
        parseNewVariant: Parser<Variant>,
    ): DiscriminatedUnionBuilder<DK, Union | Variant> {
        const parseNewBranch = discriminatedUnionBranch(
            this.discriminantKey,
            discriminantValue,
            parseNewVariant,
            this.parser,
        );

        return new DiscriminatedUnionBuilder(
            this.discriminantKey,
            parseNewBranch,
        );
    }
}

function discriminatedUnionBranch<
    DK extends string,
    DV extends Primitive,
    Variant extends {[k in DK]: DV},
    Rest extends {[k in DK]: DV},
>(
    discriminantKey: DK,
    discriminantValue: DV,
    parseVariant: Parser<Variant>,
    parseOtherBranches: Parser<Rest>,
): Parser<Variant | Rest> {
    return (raw: unknown, ctx: ParseContext) => {
        if (!isPlainObject(raw)) {
            return ctx.failure("object", raw);
        }

        if (raw[discriminantKey] === discriminantValue) {
            return parseVariant(raw, ctx);
        }

        return parseOtherBranches(raw, ctx);
    };
}
