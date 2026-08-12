import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";

import {initializeGraphState} from "./reducer/initialize-graph-state";
import * as InteractiveGraphAction from "./reducer/interactive-graph-action";
import {MOVE_POINT_IN_FIGURE} from "./reducer/interactive-graph-action";
import * as GraphReducer from "./reducer/interactive-graph-reducer";
import {StatefulMafsGraph} from "./stateful-mafs-graph";

import type {StatefulMafsGraphProps} from "./stateful-mafs-graph";
import type {UserEvent} from "@testing-library/user-event";

jest.mock("@khanacademy/wonder-blocks-announcer", () => ({
    announceMessage: jest.fn(),
}));

function getBaseStatefulMafsGraphProps(): StatefulMafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        snapStep: [1, 1],
        gridStep: [1, 1],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
        showAxisTicks: {x: true, y: true},
        markings: "graph",
        containerSizeClass: "small",
        onChange: () => {},
        showTooltips: false,
        showProtractor: false,
        readOnly: false,
        labels: ["x", "y"],
        graph: {type: "segment"},
        correct: {type: "segment"},
        static: false,
        lockedFigures: [],
        widgetId: "test-widget-id",
    };
}

describe("StatefulMafsGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders", () => {
        render(<StatefulMafsGraph {...getBaseStatefulMafsGraphProps()} />);

        expect(screen.getAllByTestId("movable-point").length).toBeGreaterThan(
            0,
        );
    });

    it("calls onChange when using graph", async () => {
        const mockChangeHandler = jest.fn();

        render(
            <StatefulMafsGraph
                {...getBaseStatefulMafsGraphProps()}
                onChange={mockChangeHandler}
            />,
        );

        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}");

        expect(mockChangeHandler).toHaveBeenCalled();
    });

    it("re-renders when the graph type changes", () => {
        // Arrange: render a segment graph
        const segmentGraphProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "segment"},
        };
        const {rerender} = render(<StatefulMafsGraph {...segmentGraphProps} />);

        // Act: rerender with a quadratic graph
        const quadraticGraphProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "quadratic"},
        };
        rerender(<StatefulMafsGraph {...quadraticGraphProps} />);

        // Assert: there should be 3 movable points (which define the quadratic
        // function). If there are 2 points, it means we are still rendering
        // the segment graph.
        expect(screen.getAllByTestId("movable-point").length).toBe(3);
    });

    it("re-renders when the number of line segments on a segment graph changes", () => {
        // Arrange: render a segment graph with one segment
        const oneSegmentProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "segment", numSegments: 1},
        };
        const {rerender} = render(<StatefulMafsGraph {...oneSegmentProps} />);

        // Act: rerender with two segments
        const twoSegmentProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "segment", numSegments: 2},
        };
        rerender(<StatefulMafsGraph {...twoSegmentProps} />);

        // Assert: there should be 4 movable points. If there are 2 points, it
        // means we are still rendering a single segment.
        expect(screen.getAllByTestId("movable-point").length).toBe(4);
    });

    it("calls announceMessage when stateAnnouncement changes, not when undefined", async () => {
        // Arrange
        const props = getBaseStatefulMafsGraphProps();
        const baseState = initializeGraphState(props);

        // Spy before render so useReducer captures the mock. Returns a state
        // with stateAnnouncement only for point-move dispatches; all other
        // dispatches (range, snapStep, reinitialize) get the base state.
        jest.spyOn(GraphReducer, "interactiveGraphReducer").mockImplementation(
            (_state, action) =>
                action.type === MOVE_POINT_IN_FIGURE
                    ? {
                          ...baseState,
                          stateAnnouncement: {
                              type: "move-point" as const,
                              pointLabel: "1",
                              x: 3,
                              y: 5,
                          },
                      }
                    : baseState,
        );

        render(<StatefulMafsGraph {...props} />);

        // stateAnnouncement is undefined on initial render — no announcement
        expect(jest.mocked(announceMessage)).not.toHaveBeenCalled();

        // Act: tab to focus a point, then move it
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}");

        // Assert: announceMessage fired once stateAnnouncement was set
        expect(jest.mocked(announceMessage)).toHaveBeenCalledWith({
            message: expect.any(String),
        });
    });

    it("re-renders aria-labels and the SR-tree description when pointLabels changes", () => {
        // Arrange: render a point graph with no custom labels
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {
                type: "point",
                numPoints: 1,
                coords: [[0, 0]],
            },
            correct: {
                type: "point",
                numPoints: 1,
                coords: [[0, 0]],
            },
        };
        const {rerender} = render(<StatefulMafsGraph {...baseProps} />);

        // Initial: default numeric "Point 1 at..." announcement is present
        // on both the focusable handle (aria-label) and the SR-tree summary.
        expect(
            screen.getByLabelText("Point 1 at 0 comma 0."),
        ).toBeInTheDocument();
        expect(
            screen.getByText("Interactive elements: Point 1 at 0 comma 0."),
        ).toBeInTheDocument();

        // Act: rerender with a custom label on the only point.
        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["T"],
                }}
                correct={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["T"],
                }}
            />,
        );

        // Assert: both surfaces flip to "Point T at..." on the same render,
        // confirming the reinitialize effect picked up the pointLabels change.
        expect(
            screen.getByLabelText("Point T at 0 comma 0."),
        ).toBeInTheDocument();
        expect(
            screen.getByText("Interactive elements: Point T at 0 comma 0."),
        ).toBeInTheDocument();
    });

    it("shows visible point labels when showPointLabels changes to true after mount", () => {
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {
                type: "point",
                numPoints: 2,
                coords: [
                    [0, 0],
                    [2, 2],
                ],
                pointLabels: ["A", "B"],
                showPointLabels: false,
            },
            correct: {
                type: "point",
                numPoints: 2,
                coords: [
                    [0, 0],
                    [2, 2],
                ],
                pointLabels: ["A", "B"],
                showPointLabels: false,
            },
        };
        const {rerender} = render(<StatefulMafsGraph {...baseProps} />);

        expect(
            screen.queryAllByTestId("movable-point__visible-label"),
        ).toHaveLength(0);

        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 2,
                    coords: [
                        [0, 0],
                        [2, 2],
                    ],
                    pointLabels: ["A", "B"],
                    showPointLabels: true,
                }}
                correct={{
                    type: "point",
                    numPoints: 2,
                    coords: [
                        [0, 0],
                        [2, 2],
                    ],
                    pointLabels: ["A", "B"],
                    showPointLabels: true,
                }}
            />,
        );

        expect(
            screen.getAllByTestId("movable-point__visible-label"),
        ).toHaveLength(2);
    });

    it("does not reinitialize when pointLabels has the same values but a new array reference", () => {
        // The editor rebuilds props every render: a fresh-but-equal
        // pointLabels array must not re-fire reinitialize.
        const reinitializeSpy = jest.spyOn(
            InteractiveGraphAction,
            "reinitialize",
        );
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "point", numPoints: 1, coords: [[0, 0]]},
            correct: {type: "point", numPoints: 1, coords: [[0, 0]]},
        };
        const {rerender} = render(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["T"],
                }}
            />,
        );
        reinitializeSpy.mockClear();

        // Same values, new array reference: must not re-fire.
        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["T"],
                }}
            />,
        );
        expect(reinitializeSpy).not.toHaveBeenCalled();
    });

    it("reinitializes when pointLabels values change", () => {
        const reinitializeSpy = jest.spyOn(
            InteractiveGraphAction,
            "reinitialize",
        );
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "point", numPoints: 1, coords: [[0, 0]]},
            correct: {type: "point", numPoints: 1, coords: [[0, 0]]},
        };
        const {rerender} = render(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["T"],
                }}
            />,
        );
        reinitializeSpy.mockClear();

        // Changed value: re-fires.
        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{
                    type: "point",
                    numPoints: 1,
                    coords: [[0, 0]],
                    pointLabels: ["U"],
                }}
            />,
        );
        expect(reinitializeSpy).toHaveBeenCalledTimes(1);
    });

    it("does not reinitialize when startCoords has the same values but a new array reference", () => {
        // Same as pointLabels: a fresh-but-equal startCoords array must not
        // re-fire reinitialize.
        const reinitializeSpy = jest.spyOn(
            InteractiveGraphAction,
            "reinitialize",
        );
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "point", numPoints: 1, coords: [[0, 0]]},
            correct: {type: "point", numPoints: 1, coords: [[0, 0]]},
        };
        const {rerender} = render(
            <StatefulMafsGraph
                {...baseProps}
                graph={{type: "point", numPoints: 1, startCoords: [[1, 1]]}}
            />,
        );
        reinitializeSpy.mockClear();

        // Same values, new array reference: must not re-fire.
        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{type: "point", numPoints: 1, startCoords: [[1, 1]]}}
            />,
        );
        expect(reinitializeSpy).not.toHaveBeenCalled();
    });

    it("reinitializes when startCoords values change", () => {
        const reinitializeSpy = jest.spyOn(
            InteractiveGraphAction,
            "reinitialize",
        );
        const baseProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "point", numPoints: 1, coords: [[0, 0]]},
            correct: {type: "point", numPoints: 1, coords: [[0, 0]]},
        };
        const {rerender} = render(
            <StatefulMafsGraph
                {...baseProps}
                graph={{type: "point", numPoints: 1, startCoords: [[1, 1]]}}
            />,
        );
        reinitializeSpy.mockClear();

        // Changed value: re-fires.
        rerender(
            <StatefulMafsGraph
                {...baseProps}
                graph={{type: "point", numPoints: 1, startCoords: [[2, 2]]}}
            />,
        );
        expect(reinitializeSpy).toHaveBeenCalledTimes(1);
    });

    it("re-renders when the number of sides on a polygon graph changes", () => {
        // Arrange: render a polygon graph with three sides
        const threeSidesProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "polygon", numSides: 3},
        };
        const {rerender} = render(<StatefulMafsGraph {...threeSidesProps} />);

        // Act: rerender with four sides
        const fourSidesProps: StatefulMafsGraphProps = {
            ...getBaseStatefulMafsGraphProps(),
            graph: {type: "polygon", numSides: 4},
        };
        rerender(<StatefulMafsGraph {...fourSidesProps} />);

        // Assert: there should be 4 movable points. If there are 3 points, it
        // means we are still rendering only 3 sides.
        expect(screen.getAllByTestId("movable-point").length).toBe(4);
    });
});
