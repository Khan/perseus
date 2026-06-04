import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseMatrixUserInput} from "./matrix-user-input";

import type {PerseusMatrixUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the MatrixUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseMatrixUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusMatrixUserInput>
        >();
    });
});
