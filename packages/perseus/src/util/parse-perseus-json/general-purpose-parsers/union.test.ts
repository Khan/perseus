import {success} from "../result";

import {array} from "./array";
import {constant} from "./constant";
import {anyFailure, ctx} from "./test-helpers";
import {union} from "./union";

describe("unionBuilder()", () => {
    it("accepts a value for which it has a parser", () => {
        const parseOk = union(constant("ok")).parser;
        expect(parseOk("ok", ctx())).toEqual(success("ok"));
    });

    it("rejects other values", () => {
        const parseOk = union(constant("ok")).parser;
        expect(parseOk("bad", ctx())).toEqual(anyFailure);
    });

    it("accepts either of two values", () => {
        const parseOk = union(constant("ok")).or(constant("fine")).parser;

        expect(array(parseOk)(["ok", "fine"], ctx())).toEqual(
            success(["ok", "fine"]),
        );
    });

    it("rejects other values not in its list", () => {
        const parseOkOrFine = union(constant("ok")).or(constant("fine")).parser;

        expect(parseOkOrFine("bad", ctx())).toEqual(anyFailure);
    });
});
