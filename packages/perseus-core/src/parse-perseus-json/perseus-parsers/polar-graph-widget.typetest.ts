import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/parser.testutils";

import {parsePolarGraphWidget} from "./polar-graph-widget";

import type {PolarGraphWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PolarGraphWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parsePolarGraphWidget({}, ctx())).type.toBe<
            ParseResult<PolarGraphWidget>
        >();
    });
});
