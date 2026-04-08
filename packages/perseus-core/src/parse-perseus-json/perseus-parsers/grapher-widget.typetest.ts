import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseGrapherWidget} from "./grapher-widget";

import type {GrapherWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the GrapherWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseGrapherWidget({}, ctx())).type.toBe<
            ParseResult<GrapherWidget>
        >();
    });
});
