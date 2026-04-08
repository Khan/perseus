import {describe, it, expect} from "tstyche";
import {parseMeasurerWidget} from "./measurer-widget";
import type {MeasurerWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the MeasurerWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseMeasurerWidget({}, ctx()),
        ).type.toBe<ParseResult<MeasurerWidget>>();
    });
});
