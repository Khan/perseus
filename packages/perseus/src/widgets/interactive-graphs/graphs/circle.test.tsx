import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs} from "mafs";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import * as ReducerGraphConfig from "../reducer/use-graph-config";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {CircleGraph, getCircleKeyboardConstraint} from "./circle";
import * as UseDraggableModule from "./use-draggable";

import type {GraphConfig} from "../reducer/use-graph-config";
import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseCircleState: InteractiveGraphState = {
    type: "circle",
    center: [0, 0],
    radiusPoint: [1, 0],
    hasBeenInteractedWith: true,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};
const baseGraphConfigContext: GraphConfig = {
    range: [
        [0, 1],
        [0, 1],
    ],
    tickStep: [1, 1],
    gridStep: [1, 1],
    snapStep: [1, 1],
    markings: "graph",
    showTooltips: false,
    graphDimensionsInPixels: [200, 200],
    width: 200,
    height: 200,
    labels: [],
    showAxisArrows: {
        xMin: true,
        xMax: true,
        yMin: true,
        yMax: true,
    },
    showAxisTicks: {x: true, y: true},
};

describe("Circle graph", () => {
    let useGraphConfigMock: jest.SpyInstance;
    let useDraggableMock: jest.SpyInstance;
    let userEvent: UserEvent;
    beforeEach(() => {
        useGraphConfigMock = jest.spyOn(ReducerGraphConfig, "default");
        useDraggableMock = jest
            .spyOn(UseDraggableModule, "useDraggable")
            .mockReturnValue({dragging: false});
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Shows hairlines when dragging and 'markings' are NOT set to 'none'", () => {
        // Arrange
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        // MovableCircle uses two `useDraggable` calls (keyboard + mouse) —
        // mock both so they apply to the circle but not the radius point's
        // MovablePoint that follows.
        useDraggableMock
            .mockReturnValueOnce({dragging: true})
            .mockReturnValueOnce({dragging: true});
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // Act
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairlines = container.querySelectorAll("svg line");

        // Assert
        expect(hairlines).toHaveLength(2);
    });

    it("Shows hairlines when focused via keyboard and 'markings' are NOT set to 'none'", async () => {
        // Arrange
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // Act
        // Tab to the graph first.
        await userEvent.tab();
        // Tab to the circle to give it focus.
        await userEvent.tab();

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairlines = container.querySelectorAll("svg line");

        // Assert
        expect(hairlines).toHaveLength(2);
    });

    it("Shows hairlines when focused via click and 'markings' are NOT set to 'none'", async () => {
        // Arrange
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // Act
        const circleGraph = await screen.findByRole("button", {
            name: "Circle. The center point is at 0 comma 0.",
        });
        await userEvent.click(circleGraph);

        // Act
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairlines = container.querySelectorAll("svg line");
        expect(hairlines).toHaveLength(2);
    });

    it("Hairlines do NOT show when not dragging and not focused", () => {
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairLines = container.querySelectorAll("svg line");
        expect(hairLines).toHaveLength(0);
    });

    it("Hairlines do NOT show when dragging and 'markings' are set to 'none'", () => {
        const graphStateContext = {...baseGraphConfigContext};
        graphStateContext.markings = "none";
        useGraphConfigMock.mockReturnValue(graphStateContext);
        useDraggableMock.mockReturnValue({dragging: true});
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairLines = container.querySelectorAll("svg line");
        expect(hairLines).toHaveLength(0);
    });

    it("Hairlines do NOT show when focused and 'markings' are set to 'none'", async () => {
        const graphStateContext = {...baseGraphConfigContext};
        graphStateContext.markings = "none";
        useGraphConfigMock.mockReturnValue(graphStateContext);
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // Tab to the graph first.
        await userEvent.tab();
        // Tab to the circle to give it focus.
        await userEvent.tab();

        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairLines = container.querySelectorAll("svg line");
        expect(hairLines).toHaveLength(0);
    });
});

describe("Circle graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have aria label for circle graph", async () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);

        // Act
        const circleGraph = await screen.findByRole("button", {
            name: "Circle. The center point is at 0 comma 0.",
        });
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check aria-label and aria-describedby for circle and radius point.
        expect(circleGraph).toHaveAttribute(
            "aria-label",
            "Circle. The center point is at 0 comma 0.",
        );
        expect(circleGraph).toHaveAccessibleDescription(
            "Circle radius is 1. Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );

        expect(radiusPoint).toHaveAttribute(
            "aria-label",
            "Right radius endpoint at 1 comma 0. Circle radius is 1.",
        );
        expect(radiusPoint).toHaveAccessibleDescription(
            "Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );
    });

    it("aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseCircleState,
                    // Different center than default
                    center: [2, 3],
                    // Different radius point than default
                    radiusPoint: [7, 3],
                }}
            />,
        );
        const circleGraph = await screen.findByRole("button", {
            name: "Circle. The center point is at 2 comma 3.",
        });
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check updated aria-label for the circle and radius point.
        expect(circleGraph).toHaveAttribute(
            "aria-label",
            "Circle. The center point is at 2 comma 3.",
        );
        expect(radiusPoint).toHaveAttribute(
            "aria-label",
            "Right radius endpoint at 7 comma 3. Circle radius is 5.",
        );
    });

    test.each`
        side       | point
        ${"Right"} | ${[2, 0]}
        ${"Left"}  | ${[-2, 0]}
    `(
        "radius aria-label reflects its side relative to the center",
        ({side, point}) => {
            // Arrange

            // Act
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseCircleState,
                        center: [0, 0],
                        radiusPoint: point,
                    }}
                />,
            );
            const radiusPoint = screen.getByTestId(
                "movable-point__focusable-handle",
            );

            // Assert
            expect(radiusPoint).toHaveAttribute(
                "aria-label",
                `${side} radius endpoint at ${point[0]} comma ${point[1]}. Circle radius is 2.`,
            );
        },
    );
});

// pointLabels for circle is interpreted as `[radiusPointLabel]`: only the
// radius point (a `MovablePoint`) is labelable. The center is a
// `MovableCircle` whose announcement describes the whole shape and is not
// overridden. The SR-tree summary is deferred to the post-PR-7 i18n work.
// TODO(LEMS-3995, post-PR-7): route the circle SR-tree summary through buildPointAriaLabel once new locale string keys land.
describe("Circle graph pointLabels", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("uses a custom pointLabels[0] for the radius point's accessible name", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseCircleState, pointLabels: ["R"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point R at 1 comma 0."}),
        ).toBeInTheDocument();
    });

    it("does not override the center's announcement", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseCircleState, pointLabels: ["R"]}}
            />,
        );

        // Assert — the center is a MovableCircle and intentionally NOT
        // labelable; its announcement keeps its shape description even
        // when `pointLabels` is set.
        expect(
            screen.getByRole("button", {
                name: "Circle. The center point is at 0 comma 0.",
            }),
        ).toBeInTheDocument();
    });

    it("falls back to the default semantic label for an empty-string entry", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseCircleState, pointLabels: [""]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Right radius endpoint at 1 comma 0. Circle radius is 1.",
            }),
        ).toBeInTheDocument();
    });

    it("falls back to the default semantic label for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseCircleState,
                    // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
                    pointLabels: [42] as unknown as string[],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Right radius endpoint at 1 comma 0. Circle radius is 1.",
            }),
        ).toBeInTheDocument();
    });
});

describe("getCircleKeyboardConstraint", () => {
    it("should snap to the snapStep and avoid putting points on a vertical line", () => {
        const radiusPoint: vec.Vector2 = [0, 0];
        const center: vec.Vector2 = [1, 0];
        const snapStep: vec.Vector2 = [1, 1];

        const constraint = getCircleKeyboardConstraint(
            center,
            radiusPoint,
            snapStep,
        );

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [2, 0], // Avoids overlapping the points
        });
    });
});
