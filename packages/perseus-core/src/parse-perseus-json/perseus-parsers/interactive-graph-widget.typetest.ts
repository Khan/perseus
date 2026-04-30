import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {interactiveGraphTypeParser, parseInteractiveGraphWidget} from "./interactive-graph-widget";
import {assertSuccess} from "../result";

import type {InteractiveGraphWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the InteractiveGraphWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseInteractiveGraphWidget({}, ctx())).type.toBe<
            ParseResult<InteractiveGraphWidget>
        >();
    });
});

describe("interactiveGraphTypeParser", () => {
    it("should return the same type as the type field of an interactive graph", () => {
        const result = interactiveGraphTypeParser("", ctx());
        assertSuccess(result);
        expect(result.value).type.toBe<InteractiveGraphWidget["options"]["graph"]["type"]>();
    })
})
