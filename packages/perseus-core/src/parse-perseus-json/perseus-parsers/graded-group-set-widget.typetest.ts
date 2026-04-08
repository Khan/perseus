import {describe, it, expect} from "tstyche";
import {parseGradedGroupSetWidget} from "./graded-group-set-widget";
import type {GradedGroupSetWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the GradedGroupSetWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseGradedGroupSetWidget({}, ctx()),
        ).type.toBe<ParseResult<GradedGroupSetWidget>>();
    });
});
