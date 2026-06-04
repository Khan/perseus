import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseCSProgramUserInput} from "./cs-program-user-input";

import type {PerseusCSProgramUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the CSProgramUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseCSProgramUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusCSProgramUserInput>
        >();
    });
});
