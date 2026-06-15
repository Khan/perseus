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

    it("renders nothing when showPointLabels is off, even if pointLabels is set", () => {
        // In production, content can set `pointLabels` to drive
        // screen-reader announcements without opting into visible
        // labels. That data shape must not render anything here.
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

    it("marks the visible label as aria-hidden", () => {
        // The visible label must not be in the accessibility tree —
        // screen-reader announcements come from the focusable handle's
        // own aria-label, not from this overlay span.
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

    it("skips points whose label is missing or empty", () => {
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
});
