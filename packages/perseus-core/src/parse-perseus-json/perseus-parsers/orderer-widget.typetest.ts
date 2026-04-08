import {describe, it, expect} from "tstyche";
import {parseOrdererWidget} from "./orderer-widget";
import type {OrdererWidget} from "../../data-schema";
import {ctx} from "../general-purpose-parsers/test-helpers";
import {ParseResult} from "../parser-types";

describe("the OrdererWidget parser", () => {
    it("should return the widget type defined in data-schema.ts", () => {
        expect(
            parseOrdererWidget({}, ctx()),
        ).type.toBe<ParseResult<OrdererWidget>>();
    });
});
