import {unionBuilder} from "./union"
import invariant from "tiny-invariant";
import {ParseContext} from "../parser-types";
import {constant} from "./constant";

const ctx: ParseContext = null as any;

// Test: return type is never given no branches
{
    const emptyUnion = unionBuilder().parser

    const result = emptyUnion(null, ctx);
    invariant(result.type === "success");

    result.value satisfies never;
}

// Test: return type is a union
{
    const emptyUnion = unionBuilder()
        .add(constant("a"))
        .add(constant("b"))
        .add(constant("c"))
        .parser

    const result = emptyUnion(null, ctx);
    invariant(result.type === "success");

    result.value satisfies "a" | "b" | "c";
    // @ts-expect-error - "c" is not assignable to "a" | "b"
    result.value satisfies "a" | "b";
}

// Test: many branches
{
    const emptyUnion = unionBuilder()
        .add(constant("a"))
        .add(constant("b"))
        .add(constant("c"))
        .add(constant("d"))
        .add(constant("e"))
        .add(constant("f"))
        .add(constant("g"))
        .add(constant("h"))
        .add(constant("i"))
        .add(constant("j"))
        .add(constant("k"))
        .add(constant("l"))
        .add(constant("m"))
        .add(constant("n"))
        .add(constant("o"))
        .add(constant("p"))
        .add(constant("q"))
        .add(constant("r"))
        .add(constant("s"))
        .add(constant("t"))
        .add(constant("u"))
        .add(constant("v"))
        .add(constant("w"))
        .add(constant("x"))
        .add(constant("y"))
        .add(constant("z"))
        .parser

    const result = emptyUnion(null, ctx);
    invariant(result.type === "success");

    result.value satisfies "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
    // @ts-expect-error - "a" is not assignable to "b" | "c" | ...
    result.value satisfies "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
}
