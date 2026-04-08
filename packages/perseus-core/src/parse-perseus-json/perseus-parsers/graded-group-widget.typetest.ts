import {describe, it, expect} from "tstyche";
import {parseGradedGroupWidget} from "./graded-group-widget";
import type {GradedGroupWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the GradedGroupWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseGradedGroupWidget({}, ctx()),
        ).type.toBe<ParseResult<GradedGroupWidget>>();
    });
});
