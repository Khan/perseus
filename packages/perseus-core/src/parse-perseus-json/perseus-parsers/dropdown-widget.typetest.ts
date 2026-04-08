import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseDropdownWidget} from "./dropdown-widget";

import type {DropdownWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the DropdownWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseDropdownWidget({}, ctx())).type.toBe<
            ParseResult<DropdownWidget>
        >();
    });
});
