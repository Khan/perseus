import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePlotterWidget} from "./plotter-widget";

import type {PlotterWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PlotterWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parsePlotterWidget({}, ctx())).type.toBe<
            ParseResult<PlotterWidget>
        >();
    });
});
