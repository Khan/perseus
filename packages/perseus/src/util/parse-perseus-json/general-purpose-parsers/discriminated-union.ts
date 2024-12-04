import {isSuccess} from "../result";

import {pipeParsers} from "./pipe-parsers";

import type {Parser} from "../parser-types";

// discriminatedUnion() should be preferred over union() when parsing a
// discriminated union type, because discriminatedUnion() produces more
// understandable failure messages. It takes the discriminant as the source of
// truth for which variant is to be parsed, and expects the other data to match
// that variant.
export function discriminatedUnion<T>(
    narrow: Parser<unknown>,
    parseVariant: Parser<T>,
): DiscriminatedUnionBuilder<T> {
    return new DiscriminatedUnionBuilder(
        pipeParsers(narrow).then(parseVariant).parser,
    );
}

class DiscriminatedUnionBuilder<Variant> {
    constructor(public parser: Parser<Variant>) {}

    or<Variant2>(
        narrow: Parser<unknown>,
        parseVariant: Parser<Variant2>,
    ): DiscriminatedUnionBuilder<Variant | Variant2> {
        return new DiscriminatedUnionBuilder(
            either(narrow, parseVariant, this.parser),
        );
    }
}

function either<A, B>(
    narrowToA: Parser<unknown>,
    parseA: Parser<A>,
    parseB: Parser<B>,
): Parser<A | B> {
    return (rawValue, ctx) => {
        if (isSuccess(narrowToA(rawValue, ctx))) {
            return parseA(rawValue, ctx);
        }

        return parseB(rawValue, ctx);
    };
}
