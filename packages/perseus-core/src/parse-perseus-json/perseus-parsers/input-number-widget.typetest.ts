import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseInputNumberWidget} from "./input-number-widget";

import type {InputNumberWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the InputNumberWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseInputNumberWidget({}, ctx())).type.toBe<
            ParseResult<InputNumberWidget>
        >();
    });
});
