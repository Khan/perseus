import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseExpressionUserInput} from "./expression-user-input";

import type {PerseusExpressionUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the ExpressionUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseExpressionUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusExpressionUserInput>
        >();
    });
});
