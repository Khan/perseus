import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseLabelImageWidget} from "./label-image-widget";

import type {LabelImageWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the LabelImageWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseLabelImageWidget({}, ctx())).type.toBe<
            ParseResult<LabelImageWidget>
        >();
    });
});
