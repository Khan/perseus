import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseGroupWidget} from "./group-widget";

import type {GroupWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the GroupWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseGroupWidget({}, ctx())).type.toBe<
            ParseResult<GroupWidget>
        >();
    });
});
