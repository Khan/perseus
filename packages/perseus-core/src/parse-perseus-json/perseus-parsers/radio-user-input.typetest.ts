import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseRadioUserInput} from "./radio-user-input";

import type {PerseusRadioUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the RadioUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseRadioUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusRadioUserInput>
        >();
    });
});
