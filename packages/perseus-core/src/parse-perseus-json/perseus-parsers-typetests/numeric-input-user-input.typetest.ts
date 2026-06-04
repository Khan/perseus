import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseNumericInputUserInput} from "./numeric-input-user-input";

import type {PerseusNumericInputUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the NumericInputUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseNumericInputUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusNumericInputUserInput>
        >();
    });
});
