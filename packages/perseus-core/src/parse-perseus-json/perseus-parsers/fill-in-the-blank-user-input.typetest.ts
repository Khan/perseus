import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseFillInTheBlankUserInput} from "./fill-in-the-blank-user-input";

import type {PerseusFillInTheBlankUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the FillInTheBlankUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseFillInTheBlankUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusFillInTheBlankUserInput>
        >();
    });
});
