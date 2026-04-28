import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseGradedGroupSetWidget} from "./graded-group-set-widget";

import type {GradedGroupSetWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the GradedGroupSetWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseGradedGroupSetWidget({}, ctx())).type.toBe<
            ParseResult<GradedGroupSetWidget>
        >();
    });
});
