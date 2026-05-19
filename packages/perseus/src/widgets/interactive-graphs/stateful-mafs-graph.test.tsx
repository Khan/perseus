import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";

import {initializeGraphState} from "./reducer/initialize-graph-state";
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
        const {container} = render(
            <StatefulMafsGraph {...getBaseStatefulMafsGraphProps()} />,
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
                              pointIndex: 0,
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
