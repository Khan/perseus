import {describe, expect, it} from "@jest/globals";

import {parse} from "../../parse-perseus-json/parse";
import {parseInputNumberWidget} from "../../parse-perseus-json/perseus-parsers/input-number-widget";

import {generateInputNumberWidget} from "./input-number-widget-generator";

describe("generateInputNumberWidget", () => {
    it("produces a value that parses successfully", () => {
        const widget = generateInputNumberWidget();

        const parsed = parse(widget, parseInputNumberWidget);

        expect(parsed).toEqual(expect.objectContaining({type: "success"}));
    });
});
