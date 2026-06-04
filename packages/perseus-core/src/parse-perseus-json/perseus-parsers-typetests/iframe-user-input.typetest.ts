import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseIFrameUserInput} from "./iframe-user-input";

import type {PerseusIFrameUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the IFrameUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseIFrameUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusIFrameUserInput>
        >();
    });
});
