import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseGrapherUserInput} from "./grapher-user-input";

import type {PerseusGrapherUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the GrapherUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseGrapherUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusGrapherUserInput>
        >();
    });
});
