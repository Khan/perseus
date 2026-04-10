import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseMatcherUserInput} from "./matcher-user-input";

import type {PerseusMatcherUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the MatcherUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseMatcherUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusMatcherUserInput>
        >();
    });
});
