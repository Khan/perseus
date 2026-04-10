import {describe, it, expect} from "tstyche";

import {array} from "./array";
import {number} from "./number";
import {string} from "./string";
import {ctx} from "./test-helpers";

import type {ParseResult} from "../parser-types";

describe("the array parser combinator", () => {
    it("parses an array of the correct type", () => {
        const arrayOfStrings = array(string);

        const parsed = arrayOfStrings([], ctx());

        expect(parsed).type.toBe<ParseResult<string[]>>();
    });

    it("composes with itself", () => {
        const arrayOfArraysOfNumbers = array(array(number));

        const parsed = arrayOfArraysOfNumbers([], ctx());

        expect(parsed).type.toBe<ParseResult<number[][]>>();
    });
});
