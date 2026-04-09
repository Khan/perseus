import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePerseusImageBackground} from "./perseus-image-background";

import type {PerseusImageBackground} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PerseusImageBackground parser", () => {
    it("should return the type defined in data-schema.ts", () => {
        expect(parsePerseusImageBackground({}, ctx())).type.toBe<
            ParseResult<PerseusImageBackground>
        >();
    });
});
