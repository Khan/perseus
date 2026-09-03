import {expectPass, expectWarning} from "../__tests__/test-utils";

import fillInTheBlankWidgetErrorRule from "./fill-in-the-blank-widget-error";

const CONTENT = "[[☃ fill-in-the-blank 1]]";
const IMAGE = "![a penny](https://cdn.kastatic.org/penny.png)";

function withTiles(tiles: unknown) {
    return {widgets: {"fill-in-the-blank 1": {options: {tiles}}}};
}

describe("fill-in-the-blank-widget-error", () => {
    it("warns when a choice has text before an image", () => {
        // Arrange, Act, Assert
        // The editor cannot produce this, but raw JSON can.
        expectWarning(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([
                {id: "tile-1", content: `penny ${IMAGE}`, label: "penny"},
            ]),
        );
    });

    it("warns when a choice has TeX alongside an image", () => {
        // Arrange, Act, Assert
        // The `$` would otherwise exempt it from the editor's single-word check.
        expectWarning(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([{id: "tile-1", content: `$2$${IMAGE}`, label: "2"}]),
        );
    });

    it("warns when a choice holds more than one image", () => {
        // Arrange, Act, Assert
        // No text to strip, so the mixing check alone would miss it.
        expectWarning(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([
                {id: "tile-1", content: `${IMAGE}${IMAGE}`, label: "p"},
            ]),
        );
    });

    it("passes for a choice that is only an image", () => {
        // Arrange, Act, Assert
        expectPass(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([{id: "tile-1", content: IMAGE, label: "penny"}]),
        );
    });

    it("passes for a choice that is only text", () => {
        // Arrange, Act, Assert
        expectPass(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([{id: "tile-1", content: "penny", label: "penny"}]),
        );
    });

    it("passes for an empty choice", () => {
        // Arrange, Act, Assert
        // Empty choices are how a chemical equation offers "no coefficient".
        expectPass(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([{id: "tile-1", content: "", label: "empty"}]),
        );
    });

    it("passes when the widget has no choices yet", () => {
        // Arrange, Act, Assert
        expectPass(fillInTheBlankWidgetErrorRule, CONTENT, withTiles([]));
    });

    it("passes when options are malformed rather than throwing", () => {
        // Arrange, Act, Assert
        // It polices hand-edited JSON, so it must survive invalid shapes.
        expectPass(
            fillInTheBlankWidgetErrorRule,
            CONTENT,
            withTiles([null, {id: "tile-1"}, {content: 42}]),
        );
        expectPass(fillInTheBlankWidgetErrorRule, CONTENT, withTiles("nope"));
    });

    it("ignores other widget types", () => {
        // Arrange, Act, Assert
        expectPass(fillInTheBlankWidgetErrorRule, "[[☃ radio 1]]", {
            widgets: {
                "radio 1": {options: {tiles: [{content: `penny ${IMAGE}`}]}},
            },
        });
    });
});
