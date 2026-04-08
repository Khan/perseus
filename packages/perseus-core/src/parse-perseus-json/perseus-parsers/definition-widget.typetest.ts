import {describe, it, expect} from "tstyche";
import {parseDefinitionWidget} from "./definition-widget";
import type {DefinitionWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the DefinitionWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseDefinitionWidget({}, ctx()),
        ).type.toBe<ParseResult<DefinitionWidget>>();
    });
});
