import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseGroupUserInput} from "./group-user-input";

import type {PerseusGroupUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the GroupUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseGroupUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusGroupUserInput>
        >();
    });
});
