import {describe, it, expect} from "tstyche";
import {parseInteractionWidget} from "./interaction-widget";
import type {InteractionWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the InteractionWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseInteractionWidget({}, ctx()),
        ).type.toBe<ParseResult<InteractionWidget>>();
    });
});
