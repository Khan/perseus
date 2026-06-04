import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseTableWidget} from "./table-widget";

import type {TableWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the TableWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseTableWidget({}, ctx())).type.toBe<
            ParseResult<TableWidget>
        >();
    });
});
