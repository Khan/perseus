import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseInputNumberUserInput} from "./input-number-user-input";

import type {PerseusInputNumberUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the InputNumberUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseInputNumberUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusInputNumberUserInput>
        >();
    });
});
