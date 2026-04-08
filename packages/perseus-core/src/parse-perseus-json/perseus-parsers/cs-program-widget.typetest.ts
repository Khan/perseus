import {describe, it, expect} from "tstyche";
import {parseCSProgramWidget} from "./cs-program-widget";
import type {CSProgramWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the CSProgramWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseCSProgramWidget({}, ctx()),
        ).type.toBe<ParseResult<CSProgramWidget>>();
    });
});
