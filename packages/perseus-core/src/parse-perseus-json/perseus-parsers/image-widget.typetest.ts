import {describe, it, expect} from "tstyche";
import {parseImageWidget} from "./image-widget";
import type {ImageWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the ImageWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseImageWidget({}, ctx()),
        ).type.toBe<ParseResult<ImageWidget>>();
    });
});
