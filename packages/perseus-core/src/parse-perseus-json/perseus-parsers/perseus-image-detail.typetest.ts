import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePerseusImageDetail} from "./perseus-image-detail";

import type {PerseusImageDetail} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PerseusImageDetail parser", () => {
    it("should return the type defined in data-schema.ts", () => {
        expect(parsePerseusImageDetail({}, ctx())).type.toBe<
            ParseResult<PerseusImageDetail>
        >();
    });
});
