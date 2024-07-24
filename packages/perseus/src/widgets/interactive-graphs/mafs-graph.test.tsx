import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {vec} from "mafs";
import React from "react";
import invariant from "tiny-invariant";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import {MafsGraph} from "./mafs-graph";
import {actions} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";

import type {MafsGraphProps} from "./mafs-graph";
import type {InteractiveGraphState} from "./types";
import type {GraphRange} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

function getBaseMafsGraphProps(): MafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
        containerSizeClass: "small",
        showTooltips: false,
        showProtractor: false,
        hintMode: false,
        labels: ["x", "y"],
        dispatch: () => {},
        state: {
            type: "segment",
            hasBeenInteractedWith: false,
            coords: [],
            snapStep: [1, 1],
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
    };
}

function createFakeStore<S, A>(reducer: (state: S, action: A) => S, state: S) {
    return {
        dispatch(action: A) {
            state = reducer(state, action);
        },

        getState() {
            return state;
        },
    };
}

function graphToPixel(
    point: vec.Vector2,
    range: GraphRange = [
        [-10, 10],
        [-10, 10],
    ],
    fullPixelSpace: vec.Vector2 = [400, 400],
) {
    const [rangeX, rangeY] = range;
    const scaleX = fullPixelSpace[0] / (rangeX[1] - rangeX[0]);
    const scaleY = fullPixelSpace[1] / (rangeY[1] - rangeY[0]);
    const translateX = fullPixelSpace[0] / 2;
    const translateY = fullPixelSpace[1] / 2;
    const graphToPixelTransform = vec
        .matrixBuilder()
        .translate(-rangeX[0], -rangeY[0])
        .scale(scaleX, scaleY)
        .translate(-translateX, -translateY)
        .get();
    return vec.transform(point, graphToPixelTransform);
}

describe("MafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        const line = screen.getByTestId("movable-line__line");

        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const [expectedX1, expectedY1] = graphToPixel([0, 0]);
        const [expectedX2, expectedY2] = graphToPixel([-7, 0.5]);
        expect(line.getAttribute("x1")).toBe(expectedX1 + "");
        expect(line.getAttribute("y1")).toBe(-expectedY1 + "");
        expect(line.getAttribute("x2")).toBe(expectedX2 + "");
        expect(line.getAttribute("y2")).toBe(-expectedY2 + "");
    });

    it("renders the axis ticks if the graph markings are set to graph", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const axisLabel = screen.queryAllByText("2");

        // There are two axis labels, one for each axis
        expect(axisLabel[0]).toBeInTheDocument();
        expect(axisLabel[1]).toBeInTheDocument();
    });

    it("does not render axis ticks if the graph markings are not set to graph", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
                markings="none"
            />,
        );

        // Assert
        const axisLabel = screen.queryByText("2");
        expect(axisLabel).not.toBeInTheDocument();
    });

    it("should render the y-axis tick labels to the left of the graph when the xMin > 0", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [5, 15],
                [1, 20],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const yAxis = screen.getByTestId("y-axis-tick-labels");
        const axisLabelStyle = getComputedStyle(yAxis);
        expect(yAxis).not.toHaveClass("y-axis-right-of-grid");
        // The left position of the left-sided axis label calculates to 0px
        expect(axisLabelStyle.getPropertyValue("left")).toEqual(
            "calc(0px - 0em)",
        );
    });

    it("should render the y-axis tick labels to the right of the graph when the xMax < 0", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-15, -5],
                [1, 20],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const yAxis = screen.getByTestId("y-axis-tick-labels");
        const axisLabelStyle = getComputedStyle(yAxis);
        expect(yAxis).toHaveClass("y-axis-right-of-grid");
        // The left position of the right-sided axis label is the width
        // of the graph minus the width of the label
        expect(axisLabelStyle.getPropertyValue("left")).toEqual(
            "calc(400px - 1em)",
        );
    });

    it("should align x-axis labels below the graph when yMin > 0", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [1, 20],
                [5, 15],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const yAxis = screen.getByTestId("x-axis-tick-labels");
        const axisLabelStyle = getComputedStyle(yAxis);
        expect(yAxis).not.toHaveClass("x-axis-top-of-grid");
        // The left position of the right-sided axis label is the width
        // of the graph minus the width of the label
        expect(axisLabelStyle.getPropertyValue("top")).toEqual("400px");
    });

    it("should align x-axis labels above the graph when yMax < 0", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-20, -1],
                [-15, -5],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [-7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const yAxis = screen.getByTestId("x-axis-tick-labels");
        const axisLabelStyle = getComputedStyle(yAxis);
        expect(yAxis).toHaveClass("x-axis-top-of-grid");
        // The left position of the right-sided axis label is the width
        // of the graph minus the width of the label
        expect(axisLabelStyle.getPropertyValue("top")).toEqual("0px");
    });

    it("should render 0 label when the y-axis is to the left of the graph", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [5, 15],
                [-5, 20],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        // Assert
        const zeroLabel = screen.queryByText("0");
        expect(zeroLabel).toBeInTheDocument();
    });

    it("should not render the 0 label when the y-axis is right of the graph", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-15, -5],
                [1, 20],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0, 0],
                    [7, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        // Assert
        const zeroLabel = screen.queryByText("0");
        expect(zeroLabel).not.toBeInTheDocument();
    });

    /**
     * regression LEMS-1885
     * Important parts of this test:
     * - large snap setting (>1)
     * - arrowing with the keyboard moves point
     */
    it("point snap works with large snap gaps", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "point",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [2, 2],
            coords: [[2, 2]],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        const group = screen.getByTestId("movable-point");
        group.focus();
        await userEvent.keyboard("[ArrowRight]");
        const action = actions.pointGraph.movePoint(0, [4, 2]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                {...baseMafsGraphProps}
                state={updatedState}
                dispatch={mockDispatch}
            />,
        );

        const point = screen.getByTestId("movable-point__center");

        // Map graph coordinates to SVG coordinates
        const [expectedCX, expectedCY] = graphToPixel([4, 2]);
        expect(point.getAttribute("cx")).toBe(expectedCX + "");
        expect(point.getAttribute("cy")).toBe(-expectedCY + "");
    });

    it("MovableLine moves down based on down keystroke ", async () => {
        const initialState: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [
                    [-7, 1],
                    [0, 0],
                ],
            ],
        };

        const expectedCoords = [
            [
                [-7, 0],
                [0, -1],
            ],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("{arrowdown>1}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("MovableLine moves up based on up keystroke ", async () => {
        const initialState: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [
                    [-7, 1],
                    [0, 0],
                ],
            ],
        };

        const expectedCoords = [
            [
                [-7, 2],
                [0, 1],
            ],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("{arrowup>1}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("MovableLine moves right based on right keystroke ", async () => {
        const initialState: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [
                    [-7, 1],
                    [0, 0],
                ],
            ],
        };

        const expectedCoords = [
            [
                [-6, 1],
                [1, 0],
            ],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("{arrowright>1}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("MovableLine moves left based on left keystroke ", async () => {
        const initialState: InteractiveGraphState = {
            type: "segment",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [
                    [-7, 1],
                    [0, 0],
                ],
            ],
        };

        const expectedCoords = [
            [
                [-8, 1],
                [-1, 0],
            ],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("{arrowleft>1}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });
});
