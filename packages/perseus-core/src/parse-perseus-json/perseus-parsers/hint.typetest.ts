import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseHint} from "./hint";

import type {Hint} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the Hint parser", () => {
    it("should return the type defined in data-schema.ts", () => {
        expect(parseHint({}, ctx())).type.toBe<ParseResult<Hint>>();
    });
});
