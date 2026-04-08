// FIXME: this file was converted to use tstyche in commit ae53e08ae.
// Search this directory for files matching *-user-input.typetest.ts and
// convert them to tstyche as well. Use this file as an example.

import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseCategorizerUserInput} from "./categorizer-user-input";

import type {PerseusCategorizerUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the CategorizerUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseCategorizerUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusCategorizerUserInput>
        >();
    });
});
