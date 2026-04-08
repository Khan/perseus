// FIXME: this file was converted to use tstyche in commit f420c238. Search
// this directory for files matching *-widget.typetest.ts and convert them to
// use tstyche as well. Use this file as an example.
import {describe, it, expect} from "tstyche";
import {parseCategorizerWidget} from "./categorizer-widget";
import type {CategorizerWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the CategorizerWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseCategorizerWidget({}, ctx()),
        ).type.toBe<ParseResult<CategorizerWidget>>();
    });
});
