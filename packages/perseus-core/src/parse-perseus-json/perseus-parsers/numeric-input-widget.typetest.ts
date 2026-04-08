import {describe, it, expect} from "tstyche";
import {parseNumericInputWidget} from "./numeric-input-widget";
import type {NumericInputWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the NumericInputWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseNumericInputWidget({}, ctx()),
        ).type.toBe<ParseResult<NumericInputWidget>>();
    });
});
