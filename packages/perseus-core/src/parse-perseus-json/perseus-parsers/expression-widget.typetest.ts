import {describe, it, expect} from "tstyche";
import {parseExpressionWidget} from "./expression-widget";
import type {ExpressionWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the ExpressionWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseExpressionWidget({}, ctx()),
        ).type.toBe<ParseResult<ExpressionWidget>>();
    });
});
