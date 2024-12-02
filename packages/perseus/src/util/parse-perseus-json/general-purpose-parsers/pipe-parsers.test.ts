import {success} from "../result";

import {pipeParsers} from "./pipe-parsers";
import {string} from "./string";
import {anyFailure, ctx} from "./test-helpers";

import type {PartialParser} from "../parser-types";

describe("pipeParsers given a single parser", () => {
    const string2 = pipeParsers(string).parser;
    it("accepts a valid value", () => {
        expect(string2("abc", ctx())).toEqual(success("abc"));
    });

    it("rejects an invalid value", () => {
        expect(string2(99, ctx())).toEqual(anyFailure);
    });
});

describe("pipeParsers given a chain of parsers", () => {
    const stringToNumber: PartialParser<string, number> = (rawVal, ctx) => {
        if (/^\d+$/.test(rawVal)) {
            return ctx.success(parseInt(rawVal, 10));
        }
        return ctx.failure("a numeric string", rawVal);
    };

    const numericString = pipeParsers(string).then(stringToNumber).parser;

    it("accepts a valid value", () => {
        expect(numericString("7", ctx())).toEqual(success(7));
    });

    it("rejects a value that fails the first parser", () => {
        expect(numericString(99, ctx())).toEqual(anyFailure);
    });

    it("rejects a value that fails the second parser", () => {
        expect(numericString("abc", ctx())).toEqual(anyFailure);
    });
});
