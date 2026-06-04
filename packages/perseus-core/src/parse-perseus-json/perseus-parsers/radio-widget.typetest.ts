import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseRadioWidget} from "./radio-widget";

import type {RadioWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the RadioWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseRadioWidget({}, ctx())).type.toBe<
            ParseResult<RadioWidget>
        >();
    });
});
