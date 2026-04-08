import {describe, it, expect} from "tstyche";
import {parsePhetSimulationWidget} from "./phet-simulation-widget";
import type {PhetSimulationWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the PhetSimulationWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parsePhetSimulationWidget({}, ctx()),
        ).type.toBe<ParseResult<PhetSimulationWidget>>();
    });
});
