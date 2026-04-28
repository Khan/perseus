import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseNumberLineUserInput} from "./number-line-user-input";

import type {PerseusNumberLineUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the NumberLineUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseNumberLineUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusNumberLineUserInput>
        >();
    });
});
