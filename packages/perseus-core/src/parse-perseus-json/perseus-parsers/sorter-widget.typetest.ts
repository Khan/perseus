import {describe, it, expect} from "tstyche";
import {parseSorterWidget} from "./sorter-widget";
import type {SorterWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the SorterWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseSorterWidget({}, ctx()),
        ).type.toBe<ParseResult<SorterWidget>>();
    });
});
