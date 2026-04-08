import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseVideoWidget} from "./video-widget";

import type {VideoWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the VideoWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseVideoWidget({}, ctx())).type.toBe<
            ParseResult<VideoWidget>
        >();
    });
});
