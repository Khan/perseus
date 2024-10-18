import {success} from "../result";

import {anyFailure, ctx} from "./test-helpers";
import {unionBuilder} from "./union";
import {constant} from "./constant";
import {array} from "./array";

describe("unionBuilder()", () => {
    it("rejects all values when no parsers are added", () => {
        const emptyUnion = unionBuilder().parser
        expect(emptyUnion("something", ctx())).toEqual(anyFailure)
    })

    it("accepts a value for which it has a parser", () => {
        const union = unionBuilder()
            .add(constant("ok"))
            .parser
        expect(union("ok", ctx())).toEqual(success("ok"))
    })

    it("rejects other values", () => {
        const union = unionBuilder()
            .add(constant("ok"))
            .parser
        expect(union("bad", ctx())).toEqual(anyFailure)
    })

    it("accepts either of two values", () => {
        const union = unionBuilder()
            .add(constant("ok"))
            .add(constant("fine"))
            .parser

        expect(array(union)(["ok", "fine"], ctx())).toEqual(success(["ok", "fine"]))
    })

    it("rejects other values not in its list", () => {
        const union = unionBuilder()
            .add(constant("ok"))
            .add(constant("fine"))
            .parser

        expect(union("bad", ctx())).toEqual(anyFailure)
    })
})
