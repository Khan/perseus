import {constant} from "./constant";
import {summonParsedValue} from "./test-helpers";
import {union} from "./union";

// Test: return type is a union
{
    const abc = union(constant("a")).or(constant("b")).or(constant("c")).parser;
    const parsed = summonParsedValue<typeof abc>();

    parsed satisfies "a" | "b" | "c";
    // @ts-expect-error - "c" is not assignable to "a" | "b"
    parsed satisfies "a" | "b";
}

// Test: many branches
{
    const alphabet = union(constant("a"))
        .or(constant("a"))
        .or(constant("b"))
        .or(constant("c"))
        .or(constant("d"))
        .or(constant("e"))
        .or(constant("f"))
        .or(constant("g"))
        .or(constant("h"))
        .or(constant("i"))
        .or(constant("j"))
        .or(constant("k"))
        .or(constant("l"))
        .or(constant("m"))
        .or(constant("n"))
        .or(constant("o"))
        .or(constant("p"))
        .or(constant("q"))
        .or(constant("r"))
        .or(constant("s"))
        .or(constant("t"))
        .or(constant("u"))
        .or(constant("v"))
        .or(constant("w"))
        .or(constant("x"))
        .or(constant("y"))
        .or(constant("z")).parser;

    summonParsedValue<typeof alphabet>() satisfies
        | "a"
        | "b"
        | "c"
        | "d"
        | "e"
        | "f"
        | "g"
        | "h"
        | "i"
        | "j"
        | "k"
        | "l"
        | "m"
        | "n"
        | "o"
        | "p"
        | "q"
        | "r"
        | "s"
        | "t"
        | "u"
        | "v"
        | "w"
        | "x"
        | "y"
        | "z";

    // @ts-expect-error - "a" is not assignable to "b" | "c" | ...
    summonParsedValue<typeof alphabet>() satisfies
        | "b"
        | "c"
        | "d"
        | "e"
        | "f"
        | "g"
        | "h"
        | "i"
        | "j"
        | "k"
        | "l"
        | "m"
        | "n"
        | "o"
        | "p"
        | "q"
        | "r"
        | "s"
        | "t"
        | "u"
        | "v"
        | "w"
        | "x"
        | "y"
        | "z";
}
