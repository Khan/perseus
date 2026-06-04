import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseLegacyButtonSets} from "./legacy-button-sets";

import type {LegacyButtonSets} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the LegacyButtonSets parser", () => {
    it("should return the type defined in data-schema.ts", () => {
        expect(parseLegacyButtonSets({}, ctx())).type.toBe<
            ParseResult<LegacyButtonSets>
        >();
    });
});
