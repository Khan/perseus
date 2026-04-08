import {describe, it, expect} from "tstyche";
import {parseExplanationWidget} from "./explanation-widget";
import type {ExplanationWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the ExplanationWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseExplanationWidget({}, ctx()),
        ).type.toBe<ParseResult<ExplanationWidget>>();
    });
});
