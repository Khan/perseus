import {describe, it, expect} from "tstyche";
import {parseGrapherWidget} from "./grapher-widget";
import type {GrapherWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the GrapherWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseGrapherWidget({}, ctx()),
        ).type.toBe<ParseResult<GrapherWidget>>();
    });
});
