import {describe, it, expect} from "tstyche";

import {constant} from "./constant";
import {ctx} from "./test-helpers";
import {union} from "./union";

import type {ParseResult} from "../parser-types";

describe("the union() parser combinator", () => {
    it("parses a union type", () => {
        const abc = union(constant("a"))
            .or(constant("b"))
            .or(constant("c")).parser;

        const parsed = abc({}, ctx());

        expect(parsed).type.toBe<ParseResult<"a" | "b" | "c">>();
    });

    it("handles a union with many branches", () => {
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

        const parsed = alphabet({}, ctx());

        expect(parsed).type.toBe<
            ParseResult<
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
                | "z"
            >
        >();
    });
});
