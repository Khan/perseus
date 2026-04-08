import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseMatrixWidget} from "./matrix-widget";

import type {MatrixWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the MatrixWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseMatrixWidget({}, ctx())).type.toBe<
            ParseResult<MatrixWidget>
        >();
    });
});
