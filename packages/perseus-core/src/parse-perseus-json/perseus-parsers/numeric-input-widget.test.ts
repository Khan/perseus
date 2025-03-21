import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {success} from "../result";

import {parseSimplify} from "./numeric-input-widget";

describe("parseSimplify", () => {
    it(`preserves "required"`, () => {
        expect(parse("required", parseSimplify)).toEqual(success("required"));
    });

    it(`preserves "enforced"`, () => {
        expect(parse("enforced", parseSimplify)).toEqual(success("enforced"));
    });

    it(`preserves "optional"`, () => {
        expect(parse("optional", parseSimplify)).toEqual(success("optional"));
    });

    it(`converts null to "required"`, () => {
        expect(parse(null, parseSimplify)).toEqual(success("required"));
    });

    it(`converts undefined to "required"`, () => {
        expect(parse(undefined, parseSimplify)).toEqual(success("required"));
    });

    it(`converts true to "required"`, () => {
        expect(parse(true, parseSimplify)).toEqual(success("required"));
    });

    it(`converts false to "required"`, () => {
        expect(parse(false, parseSimplify)).toEqual(success("required"));
    });

    it(`converts "accepted" to "required"`, () => {
        expect(parse("accepted", parseSimplify)).toEqual(success("required"));
    });

    it(`converts "correct" to "required"`, () => {
        expect(parse("correct", parseSimplify)).toEqual(success("required"));
    });

    it(`rejects an arbitrary string`, () => {
        expect(parse("foobar", parseSimplify)).toEqual(anyFailure);
    });
});
