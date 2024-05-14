import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {vec} from "mafs";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {setDependencies} from "../../dependencies";

import {MafsGraph, StatefulMafsGraph} from "./mafs-graph";
import {moveLine, movePoint} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";

import type {Props as MafsGraphProps} from "./mafs-graph";
import type {InteractiveGraphState} from "./types";
import type {GraphRange} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

function getBaseMafsGraphProps(): MafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        gridStep: [1, 1],
        snapStep: [1, 1],
        markings: "graph",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        graph: {type: "segment"},
        containerSizeClass: "small",
        onChange: () => {},
        showTooltips: false,
        labels: ["x", "y"],
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

describe("StatefulMafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        setDependencies(testDependencies);
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", () => {
        const {container} = render(
            <StatefulMafsGraph {...getBaseMafsGraphProps()} />,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        expect(movablePoints).not.toBe(0);
    });

    it("calls onChange when using graph", async () => {
        const mockChangeHandler = jest.fn();

        render(
            <StatefulMafsGraph
                {...getBaseMafsGraphProps()}
                onChange={mockChangeHandler}
            />,
        );

        await userEvent.tab();
        await userEvent.keyboard("{arrowup}");

        expect(mockChangeHandler).toHaveBeenCalled();
    });
});

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
    });

    it("renders", () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            markings: "graph",
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
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
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
            markings: "graph",
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
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        // Assert
        const axisLabel = screen.queryAllByText("-2");

        // There are two axis labels, one for each axis
        expect(axisLabel[0]).toBeInTheDocument();
        expect(axisLabel[1]).toBeInTheDocument();
    });

    it("does not render axis ticks if the graph markings are not set to graph", () => {
        // Arrange
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            markings: "none",
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
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
                markings="none"
            />,
        );

        // Assert
        const axisLabel = screen.queryByText("-2");
        expect(axisLabel).not.toBeInTheDocument();
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
            markings: "graph",
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
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-point");
        group.focus();
        await userEvent.keyboard("[ArrowRight]");
        const action = movePoint(0, [4, 2]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
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
            markings: "graph",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [-7, 0.5],
                    [0, 0],
                ],
            ],
        };

        const expectedCoords = [
            [-7, 0],
            [0, -0.5],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = getBaseMafsGraphProps();

        render(
            <MafsGraph
                state={getState()}
                dispatch={dispatch}
                {...baseMafsGraphProps} // So this spread doesn't overwrite the snapstep from initial state?
                snapStep={[0.5, 0.5]}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("[ArrowDown]");

        const newState = getState().coords ? getState() : null;
        expect(newState).toEqual(expectedCoords);

        /*
        const newState = getState();
        newState.coords ??= null;
        expect(newState).toEqual(expectedCoords);
         */
    });

    it("MovableLine moves up based on up keystroke ", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            markings: "graph",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [-6, -0.5],
                    [3, 0.5],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("[ArrowUp]");
        const action = moveLine(0, [0, 0.5]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const line = screen.getByTestId("movable-line__line");
        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const [expectedX1, expectedY1] = graphToPixel([-6, 0]);
        const [expectedX2, expectedY2] = graphToPixel([3, 1]);

        expect(line.getAttribute("x1")).toBe(expectedX1 + "");
        expect(line.getAttribute("y1")).toBe(-expectedY1 + "");
        expect(line.getAttribute("x2")).toBe(expectedX2 + "");
        expect(line.getAttribute("y2")).toBe(-expectedY2 + "");
    });

    it("MovableLine moves right based on right keystroke ", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            markings: "graph",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [0.5, -8],
                    [-0.5, 0],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("[ArrowRight]");
        const action = moveLine(0, [0.5, 0]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const line = screen.getByTestId("movable-line__line");
        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const [expectedX1, expectedY1] = graphToPixel([1, -8]);
        const [expectedX2, expectedY2] = graphToPixel([0, 0]);

        expect(line.getAttribute("x1")).toBe(expectedX1 + "");
        expect(line.getAttribute("y1")).toBe(-expectedY1 + "");
        expect(line.getAttribute("x2")).toBe(expectedX2 + "");
        expect(line.getAttribute("y2")).toBe(-expectedY2 + "");
    });

    it("MovableLine moves left based on left keystroke ", async () => {
        const mockDispatch = jest.fn();
        const state: InteractiveGraphState = {
            type: "segment",
            markings: "graph",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [
                    [1.5, -2],
                    [-2.5, 4],
                ],
            ],
        };

        const baseMafsGraphProps = getBaseMafsGraphProps();

        const {rerender} = render(
            <MafsGraph
                state={state}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const group = screen.getByTestId("movable-line");
        group.focus();
        await userEvent.keyboard("[ArrowLeft]");
        const action = moveLine(0, [-0.5, 0]);
        expect(mockDispatch).toHaveBeenCalledWith(action);

        const updatedState = interactiveGraphReducer(state, action);

        rerender(
            <MafsGraph
                state={updatedState}
                dispatch={mockDispatch}
                {...baseMafsGraphProps}
            />,
        );

        const line = screen.getByTestId("movable-line__line");
        expect(line).toBeInTheDocument();

        // Map graph coordinates to SVG coordinates
        const [expectedX1, expectedY1] = graphToPixel([1, -2]);
        const [expectedX2, expectedY2] = graphToPixel([-3, 4]);

        expect(line.getAttribute("x1")).toBe(expectedX1 + "");
        expect(line.getAttribute("y1")).toBe(-expectedY1 + "");
        expect(line.getAttribute("x2")).toBe(expectedX2 + "");
        expect(line.getAttribute("y2")).toBe(-expectedY2 + "");
    });
});
