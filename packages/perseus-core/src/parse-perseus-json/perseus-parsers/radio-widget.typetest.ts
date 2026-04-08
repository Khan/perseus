import {describe, it, expect} from "tstyche";
import {parseRadioWidget} from "./radio-widget";
import type {RadioWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the RadioWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseRadioWidget({}, ctx()),
        ).type.toBe<ParseResult<RadioWidget>>();
    });
});
