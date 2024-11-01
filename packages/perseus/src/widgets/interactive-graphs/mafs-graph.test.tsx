import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {vec} from "mafs";
import React from "react";
import invariant from "tiny-invariant";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import {calculateNestedSVGCoords, MafsGraph} from "./mafs-graph";
import {actions, REMOVE_POINT} from "./reducer/interactive-graph-action";
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
        readOnly: false,
        labels: ["x", "y"],
        static: false,
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

    it("renders ARIA labels for each point", () => {
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

        render(
            <MafsGraph
                {...getBaseMafsGraphProps()}
                state={state}
                dispatch={() => {}}
            />,
        );

        expect(screen.getByLabelText("Point at 0 comma 0")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Point at -7 comma 0.5"),
        ).toBeInTheDocument();
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
            numPoints: 2,
            focusedPointIndex: null,
            hasBeenInteractedWith: true,
            showRemovePointButton: false,
            interactionMode: "mouse",
            showKeyboardInteractionInvitation: false,
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

        const group = screen.getByTestId("movable-point__focusable-handle");
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
        await userEvent.keyboard("{arrowdown}");

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
        await userEvent.keyboard("{arrowup}");

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
        await userEvent.keyboard("{arrowright}");

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
        await userEvent.keyboard("{arrowleft}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    describe("with an unlimited graph", () => {
        it("point - shows a remove point button when a point is focused", async () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "point",
                numPoints: "unlimited",
                focusedPointIndex: 0,
                hasBeenInteractedWith: true,
                showRemovePointButton: true,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                snapStep: [2, 2],
                coords: [[4, 5]],
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...getBaseMafsGraphProps(),
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Assert: Find the button
            const addPointButton = await screen.findByText("Remove Point");
            expect(addPointButton).not.toBe(null);
        });

        it("polygon - shows a remove point button when a point is focused", async () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "polygon",
                numSides: "unlimited",
                focusedPointIndex: 0,
                hasBeenInteractedWith: true,
                showRemovePointButton: true,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
                showAngles: false,
                showSides: false,
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                snapStep: [2, 2],
                snapTo: "grid",
                coords: [[4, 5]],
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...getBaseMafsGraphProps(),
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Assert: Find the button
            const addPointButton = await screen.findByText("Remove Point");
            expect(addPointButton).not.toBe(null);
        });

        it("point - removes a point when the remove point button is clicked", async () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "point",
                numPoints: "unlimited",
                focusedPointIndex: 0,
                hasBeenInteractedWith: true,
                showRemovePointButton: true,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                snapStep: [2, 2],
                coords: [[9, 9]],
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...getBaseMafsGraphProps(),
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Act: Click the button
            const removePointButton = await screen.findByText("Remove Point");
            await userEvent.click(removePointButton);

            expect(mockDispatch.mock.calls).toContainEqual([
                {type: REMOVE_POINT, index: 0},
            ]);
        });

        it("polygon - removes a point when the remove point button is clicked", async () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "polygon",
                numSides: "unlimited",
                focusedPointIndex: 0,
                hasBeenInteractedWith: true,
                showRemovePointButton: true,
                interactionMode: "mouse",
                showKeyboardInteractionInvitation: false,
                showAngles: false,
                showSides: false,
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                snapStep: [2, 2],
                snapTo: "grid",
                coords: [[9, 9]],
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...getBaseMafsGraphProps(),
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Act: Click the button
            const removePointButton = await screen.findByText("Remove Point");
            await userEvent.click(removePointButton);

            expect(mockDispatch.mock.calls).toContainEqual([
                {type: REMOVE_POINT, index: 0},
            ]);
        });
    });
});

describe("calculateNestedSVGCoords", () => {
    it("calculates nested SVG coordinates for a centered graph", () => {
        const range: GraphRange = [
            [-10, 10],
            [-10, 10],
        ];
        const graphSize: vec.Vector2 = [400, 400];

        const result = calculateNestedSVGCoords(
            range,
            graphSize[0],
            graphSize[1],
        );

        expect(result).toEqual({
            viewboxX: -200,
            viewboxY: -200,
        });
    });
    it("calculates nested SVG coordinates for an off center graph", () => {
        const range: GraphRange = [
            [5, 10], // the x range is wholly positive
            [-10, 10],
        ];
        const graphSize: vec.Vector2 = [400, 400];

        const result = calculateNestedSVGCoords(
            range,
            graphSize[0],
            graphSize[1],
        );

        expect(result).toEqual({
            viewboxX: 400,
            viewboxY: -200,
        });
    });
});
