import {describe, it, expect} from "tstyche";
import {parseNumberLineWidget} from "./number-line-widget";
import type {NumberLineWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the NumberLineWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseNumberLineWidget({}, ctx()),
        ).type.toBe<ParseResult<NumberLineWidget>>();
    });
});
