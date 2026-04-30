import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs} from "mafs";
import * as React from "react";

jest.mock("@khanacademy/wonder-blocks-announcer", () => ({
    announceMessage: jest.fn(),
}));
const announceMessageMock = announceMessage as jest.MockedFunction<
    typeof announceMessage
>;

import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import * as ReducerGraphConfig from "../reducer/use-graph-config";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    CircleGraph,
    describeCircleGraph,
    getCircleKeyboardConstraint,
} from "./circle";
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

    test("Shows hairlines when dragging and 'markings' are NOT set to 'none'", () => {
        // Arrange
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        // Only mock once so it applies just to the circle and not
        // to the radius point's MovablePoint.
        useDraggableMock.mockReturnValueOnce({dragging: true});
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

    test("Shows hairlines when focused via keyboard and 'markings' are NOT set to 'none'", async () => {
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

    test("Shows hairlines when focused via click and 'markings' are NOT set to 'none'", async () => {
        // Arrange
        useGraphConfigMock.mockReturnValue(baseGraphConfigContext);
        const {container} = render(
            <Mafs width={200} height={200}>
                <CircleGraph graphState={baseCircleState} dispatch={() => {}} />
            </Mafs>,
        );

        // Act
        const circleGraph = screen.getAllByRole("button")[0];
        await userEvent.click(circleGraph);

        // Act
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const hairlines = container.querySelectorAll("svg line");
        expect(hairlines).toHaveLength(2);
    });

    test("Hairlines do NOT show when not dragging and not focused", () => {
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

    test("Hairlines do NOT show when dragging and 'markings' are set to 'none'", () => {
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

    test("Hairlines do NOT show when focused and 'markings' are set to 'none'", async () => {
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
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label for circle graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);

        // Act
        // eslint-disable-next-line testing-library/no-node-access
        const circleGraph = document.querySelector(".movable-circle");
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check aria-label, aria-describedby, and aria-live
        // for circle and radius point.
        expect(circleGraph).toHaveAttribute(
            "aria-label",
            "Circle. The center point is at 0 comma 0.",
        );
        expect(circleGraph).toHaveAccessibleDescription(
            "Circle radius is 1. Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );
        expect(circleGraph).toHaveAttribute("aria-live", "polite");

        expect(radiusPoint).toHaveAttribute(
            "aria-label",
            "Right radius endpoint at 1 comma 0. Circle radius is 1.",
        );
        expect(radiusPoint).toHaveAccessibleDescription(
            "Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );
        // Radius point's aria-live is off by default so that it doesn't
        // override the circle's aria-live when the circle is moved (since
        // the radius point also moves when the circle moves).
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });

    test("aria label reflects updated values", async () => {
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
        const buttons = await screen.findAllByRole("button");
        const circleGraph = buttons[0];
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

    test("radius point has aria-live off by default", async () => {
        // Arrange

        // Act
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        // eslint-disable-next-line testing-library/no-node-access
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check aria-live for the radius point.
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });

    test("announces the new radius via WB Announcer when the radius point is moved", async () => {
        // Arrange
        announceMessageMock.mockClear();
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Act
        // move the radius point
        act(() => radiusPoint.focus());
        await userEvent.keyboard("{arrowright}");

        // Assert
        // Aria-live stays "off" — WB Announcer owns the on-change announcement
        // for resize, so we must NOT also flip aria-live to "polite" or the
        // user would hear the radius announced twice.
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
        expect(announceMessageMock).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.stringContaining("Circle resized"),
            }),
        );
    });

    test("passes a debounceThreshold on every per-graph announcement so continuous motion collapses to one trailing announcement", async () => {
        // Arrange
        announceMessageMock.mockClear();
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Act
        // Simulate continuous arrow-key motion: three rapid keypresses.
        act(() => radiusPoint.focus());
        await userEvent.keyboard("{arrowright}{arrowright}{arrowright}");

        // Assert
        // Each call must carry a debounceThreshold so WB Announcer can collapse
        // the burst. We don't assert exact timing here — the mock doesn't
        // actually debounce; that's WB's responsibility. We just verify every
        // call passes the option, which is what we control.
        expect(announceMessageMock).toHaveBeenCalled();
        for (const call of announceMessageMock.mock.calls) {
            expect(call[0]).toEqual(
                expect.objectContaining({
                    debounceThreshold: expect.any(Number),
                }),
            );
            expect(call[0].debounceThreshold).toBeGreaterThan(0);
        }
    });

    test("does not flip the radius point's aria-live when the circle is moved", async () => {
        // Arrange
        announceMessageMock.mockClear();
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        const buttons = await screen.findAllByRole("button");
        const circleGraph = buttons[0];
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Act
        // move the radius point first (used to flip aria-live to "polite")
        act(() => radiusPoint.focus());
        await userEvent.keyboard("{arrowright}");
        // then move the circle
        act(() => circleGraph.focus());
        await userEvent.keyboard("{arrowright}");

        // Assert
        // With WB Announcer owning the resize announcement, aria-live should
        // stay "off" throughout — no flip to "polite", no flip back.
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });
});

describe("describeCircleGraph", () => {
    test("describes a default circle", () => {
        // Arrange

        // Act
        const strings = describeCircleGraph(
            baseCircleState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srCircleGraph).toBe("A circle on a coordinate plane.");
        expect(strings.srCircleShape).toBe(
            "Circle. The center point is at 0 comma 0.",
        );
        expect(strings.srCircleRadiusPoint).toBe(
            "Right radius endpoint at 1 comma 0.",
        );
        expect(strings.srCircleRadius).toBe("Circle radius is 1.");
        expect(strings.srCircleOuterPoints).toBe(
            "Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );
        expect(strings.srCircleInteractiveElement).toBe(
            "Interactive elements: Circle. The center point is at 0 comma 0. Circle radius is 1.",
        );
    });

    test("describes a circle with updated values", () => {
        // Arrange

        // Act
        const strings = describeCircleGraph(
            {
                ...baseCircleState,
                center: [2, 3],
                radiusPoint: [7, 3],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srCircleGraph).toBe("A circle on a coordinate plane.");
        expect(strings.srCircleShape).toBe(
            "Circle. The center point is at 2 comma 3.",
        );
        expect(strings.srCircleRadiusPoint).toBe(
            "Right radius endpoint at 7 comma 3.",
        );
        expect(strings.srCircleRadius).toBe("Circle radius is 5.");
        expect(strings.srCircleOuterPoints).toBe(
            "Points on the circle at 7 comma 3, 2 comma 8, -3 comma 3, 2 comma -2.",
        );
        expect(strings.srCircleInteractiveElement).toBe(
            "Interactive elements: Circle. The center point is at 2 comma 3. Circle radius is 5.",
        );
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
