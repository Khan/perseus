import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseSorterUserInput} from "./sorter-user-input";

import type {PerseusSorterUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the SorterUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseSorterUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusSorterUserInput>
        >();
    });
});
