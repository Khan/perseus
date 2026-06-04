import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePlotterUserInput} from "./plotter-user-input";

import type {PerseusPlotterUserInput} from "../../validation.types";
import type {ParseResult} from "../parser-types";

describe("the PlotterUserInput parser", () => {
    it("should return the type defined in validation.types.ts", () => {
        expect(parsePlotterUserInput({}, ctx())).type.toBe<
            ParseResult<PerseusPlotterUserInput>
        >();
    });
});
