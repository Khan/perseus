import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as ReducerGraphConfig from "../../../reducer/use-graph-config";

import MovablePointLabelsLayer from "./movable-point-labels-layer";

import type {GraphConfig} from "../../../reducer/use-graph-config";
import type {InteractiveGraphState} from "../../../types";

function mockGraphConfig(config: GraphConfig) {
    return jest.spyOn(ReducerGraphConfig, "default").mockReturnValue(config);
}

const baseGraphConfig: GraphConfig = {
    range: [
        [-10, 10],
        [-10, 10],
    ],
    tickStep: [1, 1],
    gridStep: [1, 1],
    snapStep: [1, 1],
    markings: "graph",
    showTooltips: false,
    graphDimensionsInPixels: [400, 400],
    width: 400,
    height: 400,
    labels: [],
    showAxisArrows: {xMin: true, xMax: true, yMin: true, yMax: true},
    showAxisTicks: {x: true, y: true},
};

function pointState(
    coords: ReadonlyArray<[number, number]>,
    pointLabels?: string[],
    showPointLabels?: boolean,
): InteractiveGraphState {
    return {
        type: "point",
        coords: coords.map(([x, y]): [number, number] => [x, y]),
        focusedPointIndex: null,
        showRemovePointButton: false,
        interactionMode: "mouse",
        showKeyboardInteractionInvitation: false,
        hasBeenInteractedWith: false,
        range: [
            [-10, 10],
            [-10, 10],
        ],
        snapStep: [1, 1],
        pointLabels,
        showPointLabels,
    };
}

describe("MovablePointLabelsLayer", () => {
    beforeEach(() => {
        mockGraphConfig(baseGraphConfig);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders nothing when showPointLabels is off, even if pointLabels is set (legacy SR-only data shape)", () => {
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[1, 2]], ["A"], false)}
            />,
        );

        // Assert
        expect(
            screen.queryByTestId("movable-point__visible-label"),
        ).not.toBeInTheDocument();
    });

    it("renders one label per labeled point when showPointLabels is on", () => {
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState(
                    [
                        [1, 2],
                        [3, 4],
                    ],
                    ["A", "B"],
                    true,
                )}
            />,
        );

        // Assert
        expect(
            screen.getAllByTestId("movable-point__visible-label"),
        ).toHaveLength(2);
    });

    it("renders the label as plain text in the Symbola font (no TeX pipeline)", () => {
        // Labels are intentionally NOT routed through the TeX pipeline
        // so the same string can drive both the visible label and the
        // screen-reader announcement without TeX markup leaking into
        // either. The Symbola font gives plain text a TeX-like serif
        // appearance.
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[0, 0]], ["A"], true)}
            />,
        );

        // Assert: the label's text content is the raw string, and the
        // span carries the Symbola font-family declaration.
        const span = screen.getByTestId("movable-point__visible-label");
        expect(span).toHaveTextContent("A");
        expect(span.getAttribute("style")).toMatch(/Symbola/);
    });

    it("hides the visible label from the accessibility tree (announcement stays on the focusable handle)", () => {
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[0, 0]], ["A"], true)}
            />,
        );

        // Assert
        expect(
            screen.getByTestId("movable-point__visible-label"),
        ).toHaveAttribute("aria-hidden", "true");
    });

    it("skips points whose label is missing or empty — no Latin-letter fallback", () => {
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState(
                    [
                        [1, 2],
                        [3, 4],
                    ],
                    ["A", ""],
                    true,
                )}
            />,
        );

        // Assert: only the first point rendered a label.
        expect(
            screen.getAllByTestId("movable-point__visible-label"),
        ).toHaveLength(1);
    });

    it("flips the label inward when the point sits on the right edge so it stays on-canvas", () => {
        // A point on the right edge gets a west-facing horizontal
        // attach (the edge-flip in `getLabelAttach`) so the label sits
        // to the LEFT of the point, inside the plotted region, instead
        // of spilling off the right side of the canvas.
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[10, 0]], ["A"], true)}
            />,
        );

        // Assert: west-facing attach → `calc(-100% - 12px)` horizontal
        // translate (pulls the span left of the anchor).
        const style = screen
            .getByTestId("movable-point__visible-label")
            .getAttribute("style");
        expect(style).toMatch(/translate\(calc\(-100% - 12px\)/);
    });

    it("flips the label inward when the point sits on the bottom edge", () => {
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[0, -10]], ["A"], true)}
            />,
        );

        // Assert: north-facing attach → `calc(-100% - 12px)` in the Y
        // component of `translate(X, Y)` (pulls the span above the
        // anchor, into the graph).
        const style = screen
            .getByTestId("movable-point__visible-label")
            .getAttribute("style");
        expect(style).toMatch(/, calc\(-100% - 12px\)\)/);
    });

    it("flips the label to the left of the point when the point is in the upper-left quadrant", () => {
        // A point near the top-left should attach NW so the label sits
        // up-and-left, away from the graph's center / geometry.
        // Arrange, Act
        render(
            <MovablePointLabelsLayer
                state={pointState([[-7, 7]], ["A"], true)}
            />,
        );

        // Assert: NW attach → both horizontal and vertical translate
        // use `calc(-100% - 12px)`.
        const style = screen
            .getByTestId("movable-point__visible-label")
            .getAttribute("style");
        expect(style).toMatch(/calc\(-100% - 12px\)/);
    });
});
