import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseFreeResponseUserInput} from "./free-response-user-input";

import type {PerseusFreeResponseUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the FreeResponseUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseFreeResponseUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusFreeResponseUserInput>
        >();
    });
});
