import {describe, it, expect} from "tstyche";

import {pipeParsers} from "./pipe-parsers";
import {string} from "./string";
import {ctx, summon} from "./test-helpers";

import type {PartialParser, ParseResult} from "../parser-types";

const stringToNumber = summon<PartialParser<string, number>>();
const numberToBoolean = summon<PartialParser<number, boolean>>();

describe("the pipeParsers combinator", () => {
    it("composes multiple parsers left-to-right", () => {
        const stringToBoolean = pipeParsers(string)
            .then(stringToNumber)
            .then(numberToBoolean).parser;

        const parsed = stringToBoolean("", ctx());

        expect(parsed).type.toBe<ParseResult<boolean>>();
    });

    it("raises a type error when the input of a parser doesn't match the output of the previous one", () => {
        pipeParsers(string)
            .then(stringToNumber)
            // @ts-expect-error Argument of type 'PartialParser<string, number>' is not assignable to parameter of type 'PartialParser<number, number>'
            .then(stringToNumber);
    });
});
