import {describe, it, expect} from "tstyche";
import {parseIframeWidget} from "./iframe-widget";
import type {IFrameWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the IFrameWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseIframeWidget({}, ctx()),
        ).type.toBe<ParseResult<IFrameWidget>>();
    });
});
