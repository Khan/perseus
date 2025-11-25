import {screen, render, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {vec} from "mafs";
import React from "react";
import invariant from "tiny-invariant";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import {MafsGraph} from "./mafs-graph";
import {actions, REMOVE_POINT} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {calculateNestedSVGCoords, getBaseMafsGraphPropsForTests} from "./utils";

import type {MafsGraphProps} from "./mafs-graph";
import type {InteractiveGraphState} from "./types";
import type {PerseusDependenciesV2} from "../../types";
import type {GraphRange} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsProps = getBaseMafsGraphPropsForTests();

function expectLabelInDoc(label: string) {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
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

        const baseMafsGraphProps = baseMafsProps;

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

    it("should send analytics even when widget is rendered", () => {
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

        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

        render(
            <Dependencies.DependenciesContext.Provider value={depsV2}>
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />
            </Dependencies.DependenciesContext.Provider>,
        );

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "segment",
                widgetType: "interactive-graph",
                widgetId: "interactive-graph",
            },
        });
    });

    it("renders TeX in axis Labels", () => {
        const basePropsWithTexLabels = {
            ...baseMafsProps,
            labels: ["$1/2$", "$3/4$"],
        };

        render(<MafsGraph {...basePropsWithTexLabels} />);
        expect(screen.getByText("\\text{$1/2$}")).toBeInTheDocument();
        expect(screen.getByText("\\text{$3/4$}")).toBeInTheDocument();
    });

    it("renders plain text in axis Labels", () => {
        const basePropsWithTexLabels = {
            ...baseMafsProps,
            labels: ["4/5", "5/6"],
        };

        render(<MafsGraph {...basePropsWithTexLabels} />);
        expect(screen.getByText("\\text{4/5}")).toBeInTheDocument();
        expect(screen.getByText("\\text{5/6}")).toBeInTheDocument();
    });

    it("renders ARIA labels for each point (segment)", () => {
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
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Endpoint 1 at 0 comma 0.");
        expectLabelInDoc("Endpoint 2 at -7 comma 0.5.");
    });

    it("renders ARIA labels for each point (multiple segments)", () => {
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
                [
                    [1, 1],
                    [7, 0.5],
                ],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Endpoint 1 on segment 1 at 0 comma 0.");
        expectLabelInDoc("Endpoint 2 on segment 1 at -7 comma 0.5.");
        expectLabelInDoc("Endpoint 1 on segment 2 at 1 comma 1.");
        expectLabelInDoc("Endpoint 2 on segment 2 at 7 comma 0.5.");
    });

    it("renders ARIA labels for each point (linear)", () => {
        const state: InteractiveGraphState = {
            type: "linear",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [0, 0],
                [-7, 0.5],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Point 1 at 0 comma 0.");
        expectLabelInDoc("Point 2 at -7 comma 0.5.");
    });

    it("renders ARIA labels for each point (linear system)", () => {
        const state: InteractiveGraphState = {
            type: "linear-system",
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
                [
                    [1, 1],
                    [7, 0.5],
                ],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Point 1 on line 1 at 0 comma 0.");
        expectLabelInDoc("Point 2 on line 1 at -7 comma 0.5.");
        expectLabelInDoc("Point 1 on line 2 at 1 comma 1.");
        expectLabelInDoc("Point 2 on line 2 at 7 comma 0.5.");
    });

    it("renders ARIA labels for each point (ray)", () => {
        const state: InteractiveGraphState = {
            type: "ray",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [0, 0],
                [-7, 0.5],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Endpoint at 0 comma 0.");
        expectLabelInDoc("Through point at -7 comma 0.5.");
    });

    it("renders ARIA labels for each point (circle)", () => {
        const state: InteractiveGraphState = {
            type: "circle",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            center: [0, 0],
            radiusPoint: [2, 0],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        // Circle's radius point has a special label
        expectLabelInDoc(
            "Right radius endpoint at 2 comma 0. Circle radius is 2.",
        );
    });

    it("renders ARIA labels for each point (quadratic)", () => {
        const state: InteractiveGraphState = {
            type: "quadratic",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        const points = screen.getAllByRole("button");
        const [point1, point2, point3] = points;

        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola in quadrant 2 at -1 comma 1. Vertex is at the origin.",
        );
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola at the origin. Vertex is at the origin.",
        );
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola in quadrant 1 at 1 comma 1. Vertex is at the origin.",
        );
    });

    it("renders ARIA labels for each point (sinusoid)", () => {
        const state: InteractiveGraphState = {
            type: "sinusoid",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [
                [-1, 1],
                [0, 0],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        const points = screen.getAllByRole("button");
        const [point1, point2] = points;

        expect(point1).toHaveAccessibleName(
            "Midline intersection at -1 comma 1.",
        );
        expect(point2).toHaveAccessibleName("Minimum point at 0 comma 0.");
    });

    it("renders ARIA labels for each point (point)", () => {
        const state: InteractiveGraphState = {
            type: "point",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            focusedPointIndex: null,
            showRemovePointButton: false,
            interactionMode: "mouse",
            showKeyboardInteractionInvitation: false,
            // 2 points
            coords: [
                [-1, 1],
                [0, 0],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Point 1 at -1 comma 1.");
        expectLabelInDoc("Point 2 at 0 comma 0.");
    });

    it("renders ARIA labels for each point (polygon)", () => {
        const state: InteractiveGraphState = {
            type: "polygon",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            showAngles: false,
            showSides: false,
            snapTo: "grid",
            focusedPointIndex: null,
            showRemovePointButton: false,
            interactionMode: "mouse",
            showKeyboardInteractionInvitation: false,
            closedPolygon: false,
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expectLabelInDoc("Point 1 at -1 comma 1.");
        expectLabelInDoc("Point 2 at 0 comma 0.");
        expectLabelInDoc("Point 3 at 1 comma 1.");
    });

    it("renders a screenreader description summarizing the interactive elements on the graph", () => {
        const state: InteractiveGraphState = {
            type: "point",
            hasBeenInteractedWith: true,
            focusedPointIndex: null,
            showRemovePointButton: false,
            interactionMode: "keyboard",
            showKeyboardInteractionInvitation: false,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [0.5, 0.5],
            coords: [[-7, 0.5]],
        };

        render(
            <MafsGraph {...baseMafsProps} state={state} dispatch={() => {}} />,
        );

        expect(
            screen.getByText("Interactive elements: Point 1 at -7 comma 0.5."),
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

        const baseMafsGraphProps = baseMafsProps;

        const {rerender} = render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={state}
                dispatch={mockDispatch}
            />,
        );

        const group = screen.getByTestId("movable-point__focusable-handle");
        act(() => group.focus());
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

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        act(() => group.focus());
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

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        act(() => group.focus());
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

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        act(() => group.focus());
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

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getByTestId("movable-line");
        act(() => group.focus());
        await userEvent.keyboard("{arrowleft}");

        const state = getState();
        invariant(
            state.type === "segment",
            `state type must be segment but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("Quadratic moves points over invalid locations on keystroke", async () => {
        const initialState: InteractiveGraphState = {
            type: "quadratic",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        };

        const expectedCoords = [
            [3, 0],
            [1, 1],
            [2, 2],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getAllByTestId("movable-point__focusable-handle");
        act(() => group[0].focus());
        await userEvent.keyboard("{arrowright}");

        const state = getState();
        invariant(
            state.type === "quadratic",
            `state type must be quadratic but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("Sinusoid moves points over invalid locations on keystroke", async () => {
        const initialState: InteractiveGraphState = {
            type: "sinusoid",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const expectedCoords = [
            [2, 0],
            [1, 1],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getAllByTestId("movable-point__focusable-handle");
        act(() => group[0].focus());
        await userEvent.keyboard("{arrowright}");

        const state = getState();
        invariant(
            state.type === "sinusoid",
            `state type must be sinusoid but was ${state.type}`,
        );
        expect(state.coords).toEqual(expectedCoords);
    });

    it("Circle moves the radius point over the center point on keystroke", async () => {
        const initialState: InteractiveGraphState = {
            type: "circle",
            hasBeenInteractedWith: true,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            snapStep: [1, 1],
            center: [1, 0],
            radiusPoint: [0, 0],
        };

        const expectedRadiusPoint = [2, 0];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getAllByTestId("movable-point__focusable-handle");
        act(() => group[0].focus());
        await userEvent.keyboard("{arrowright}");

        const state = getState();
        invariant(
            state.type === "circle",
            `state type must be sinusoid but was ${state.type}`,
        );
        expect(state.radiusPoint).toEqual(expectedRadiusPoint);
    });

    it("Graphs using MovableLine move points over invalid locations on keystroke", async () => {
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
                    [0, 0],
                    [1, 0],
                ],
            ],
        };

        const expectedCoords = [
            [
                [2, 0],
                [1, 0],
            ],
        ];

        const {dispatch, getState} = createFakeStore(
            interactiveGraphReducer,
            initialState,
        );

        const baseMafsGraphProps = baseMafsProps;

        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={getState()}
                dispatch={dispatch}
            />,
        );

        const group = screen.getAllByTestId("movable-point__focusable-handle");
        act(() => group[0].focus());
        await userEvent.keyboard("{arrowright}");

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
                ...baseMafsProps,
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
                closedPolygon: false,
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...baseMafsProps,
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
                ...baseMafsProps,
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
                closedPolygon: false,
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...baseMafsProps,
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

        it("polygon - enables the 'Close shape' button when the polygon has 3 or more unique points", () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "polygon",
                numSides: "unlimited",
                focusedPointIndex: null,
                hasBeenInteractedWith: true,
                showRemovePointButton: false,
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
                coords: [
                    [4, 5],
                    [5, 6],
                    [6, 7],
                ],
                closedPolygon: false,
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...baseMafsProps,
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Assert
            // Find the button
            const closeShapeButton = screen.getByRole("button", {
                name: "Close shape",
            });
            // Make sure the button is enabled
            expect(closeShapeButton).toHaveAttribute("aria-disabled", "false");
        });

        it("polygon - disables the 'Close shape' button when the polygon has fewer than 3 unique points", () => {
            // Arrange
            // Render the question
            const mockDispatch = jest.fn();
            const state: InteractiveGraphState = {
                type: "polygon",
                numSides: "unlimited",
                focusedPointIndex: null,
                hasBeenInteractedWith: true,
                showRemovePointButton: false,
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
                coords: [
                    [4, 5],
                    [5, 6],
                    // not unique
                    [5, 6],
                ],
                closedPolygon: false,
            };

            const baseMafsGraphProps: MafsGraphProps = {
                ...baseMafsProps,
                markings: "none",
            };

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={state}
                    dispatch={mockDispatch}
                />,
            );

            // Assert
            // Find the button
            const closeShapeButton = screen.getByRole("button", {
                name: "Close shape",
            });
            // Make sure the button is disabled
            expect(closeShapeButton).toHaveAttribute("aria-disabled", "true");
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

        expect(result).toEqual({viewboxX: -200, viewboxY: -200});
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

        expect(result).toEqual({viewboxX: 400, viewboxY: -200});
    });
});
