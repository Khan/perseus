// @flow
import Color from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import {getTooltipColors} from "../util.js";

const defaultProps = {
    side: "top",
    offset: 0,
    offsetFrom: "bubble",
    tooltipMargin: 0,
    noPadding: false,
    color: Color.offBlack16,
    inverted: false,
    dismissOnClickClose: false,
    toggleOnHover: true,
    showOnMount: false,
};

describe("getTooltipColors", () => {
    it("returns <color>-on-white when not inverted", () => {
        const {backgroundColor, textColor} = getTooltipColors({
            ...defaultProps,
            children: <div>(unused)</div>,
            content: "Hello, world!",
            color: "#123",
            a11y: {title: "returns <color>-on-white when not inverted"}, // Does nothing
        });

        expect(backgroundColor).toEqual(Color.white);
        expect(textColor).toEqual("#123");
    });

    it("returns white-on-<color> when inverted", () => {
        const {backgroundColor, textColor} = getTooltipColors({
            ...defaultProps,
            children: <div>(unused)</div>,
            content: "Hello, world!",
            color: "#123",
            inverted: true,
            a11y: {title: "returns white-on-<color> when inverted"}, // Does nothing
        });

        expect(backgroundColor).toEqual("#123");
        expect(textColor).toEqual(Color.white);
    });
});
