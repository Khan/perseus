import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/parser.testutils";

import {parsePolarGraphUserInput} from "./polar-graph-user-input";

import type {PerseusPolarGraphUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the PolarGraphUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parsePolarGraphUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusPolarGraphUserInput>
        >();
    });
});
