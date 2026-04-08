import {describe, it, expect} from "tstyche";
import {parseTableWidget} from "./table-widget";
import type {TableWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the TableWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseTableWidget({}, ctx()),
        ).type.toBe<ParseResult<TableWidget>>();
    });
});
