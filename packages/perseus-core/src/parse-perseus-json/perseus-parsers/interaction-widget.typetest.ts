import {describe, it, expect} from "tstyche";

import {ctx} from "../general-purpose-parsers/test-helpers";

import {parseInteractionWidget} from "./interaction-widget";

import type {InteractionWidget} from "../../data-schema";
import type {ParseResult} from "../parser-types";

describe("the InteractionWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(parseInteractionWidget({}, ctx())).type.toBe<
            ParseResult<InteractionWidget>
        >();
    });
});
