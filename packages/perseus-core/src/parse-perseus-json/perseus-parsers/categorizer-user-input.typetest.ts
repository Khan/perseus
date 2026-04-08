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
