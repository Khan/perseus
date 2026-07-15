import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseBlankUserInput} from "./blank-user-input";

// eslint-disable-next-line import/no-restricted-paths
import type {PerseusBlankUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the BlankUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseBlankUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusBlankUserInput>
        >();
    });
});
