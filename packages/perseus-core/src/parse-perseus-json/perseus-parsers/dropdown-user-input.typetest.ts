import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseDropdownUserInput} from "./dropdown-user-input";

import type {PerseusDropdownUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the DropdownUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseDropdownUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusDropdownUserInput>
        >();
    });
});
