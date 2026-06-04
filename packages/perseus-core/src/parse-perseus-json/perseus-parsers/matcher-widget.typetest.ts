import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseMatcherWidget} from "./matcher-widget";

import type {MatcherWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the MatcherWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseMatcherWidget({}, ctx())).type.toBe<
            ParseResult<MatcherWidget>
        >();
    });
});
