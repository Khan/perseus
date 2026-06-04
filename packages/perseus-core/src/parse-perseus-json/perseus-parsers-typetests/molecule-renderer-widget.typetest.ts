import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseMoleculeRendererWidget} from "./molecule-renderer-widget";

import type {MoleculeRendererWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the MoleculeRendererWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseMoleculeRendererWidget({}, ctx())).type.toBe<
            ParseResult<MoleculeRendererWidget>
        >();
    });
});
