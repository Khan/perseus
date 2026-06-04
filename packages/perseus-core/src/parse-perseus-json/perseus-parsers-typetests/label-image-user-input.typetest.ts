import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseLabelImageUserInput} from "./label-image-user-input";

import type {PerseusLabelImageUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the LabelImageUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseLabelImageUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusLabelImageUserInput>
        >();
    });
});
