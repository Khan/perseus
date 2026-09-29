import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseFillInTheBlankWidget} from "./fill-in-the-blank-widget";

import type {FillInTheBlankWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the FillInTheBlankWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseFillInTheBlankWidget({}, ctx())).type.toBe<
            ParseResult<FillInTheBlankWidget>
        >();
    });
});
