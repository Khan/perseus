import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseTableUserInput} from "./table-user-input";

import type {PerseusTableUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the TableUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseTableUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusTableUserInput>
        >();
    });
});
