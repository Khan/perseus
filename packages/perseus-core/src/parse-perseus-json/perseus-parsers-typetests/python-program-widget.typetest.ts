import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parsePythonProgramWidget} from "./python-program-widget";

import type {PythonProgramWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the PythonProgramWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parsePythonProgramWidget({}, ctx())).type.toBe<
            ParseResult<PythonProgramWidget>
        >();
    });
});
