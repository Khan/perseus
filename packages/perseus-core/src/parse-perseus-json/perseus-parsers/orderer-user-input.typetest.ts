import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseOrdererUserInput} from "./orderer-user-input";

import type {PerseusOrdererUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the OrdererUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseOrdererUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusOrdererUserInput>
        >();
    });
});
