import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseInteractiveGraphWidget} from "./interactive-graph-widget";

import type {InteractiveGraphWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the InteractiveGraphWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseInteractiveGraphWidget({}, ctx())).type.toBe<
            ParseResult<InteractiveGraphWidget>
        >();
    });
});
