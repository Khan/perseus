import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseInteractiveGraphUserInput} from "./interactive-graph-user-input";

import type {PerseusInteractiveGraphUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the InteractiveGraphUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parseInteractiveGraphUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusInteractiveGraphUserInput>
        >();
    });
});
