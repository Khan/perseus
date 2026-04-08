import {describe, it, expect} from "tstyche";
import {parseMatrixWidget} from "./matrix-widget";
import type {MatrixWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the MatrixWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseMatrixWidget({}, ctx()),
        ).type.toBe<ParseResult<MatrixWidget>>();
    });
});
