import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs, Polygon} from "mafs";
import React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    getAngleSnapConstraint,
    getSideSnapConstraint,
    hasFocusVisible,
} from "./polygon";

import type {InteractiveGraphState, PolygonGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLimitedPolygonState: InteractiveGraphState = {
    type: "polygon",
    closedPolygon: false,
    coords: [
        [3, -2],
        [0, 4],
        [-3, -2],
    ],
    focusedPointIndex: null,
    hasBeenInteractedWith: false,
    interactionMode: "keyboard",
    numSides: 0,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    showAngles: false,
    showKeyboardInteractionInvitation: false,
    showRemovePointButton: false,
    showSides: false,
    snapStep: [1, 1],
    snapTo: "grid",
};
const baseUnlimitedPolygonStateClosed: InteractiveGraphState = {
    ...baseLimitedPolygonState,
    closedPolygon: true,
    numSides: "unlimited",
};
const baseUnlimitedPolygonStateOpen: InteractiveGraphState = {
    ...baseLimitedPolygonState,
    closedPolygon: false,
    numSides: "unlimited",
};
const emptyUnlimitedPolygonState: InteractiveGraphState = {
    ...baseUnlimitedPolygonStateOpen,
    coords: [],
};

describe("hasFocusVisible", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("returns true when polygon is focused", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                        tabIndex: 0,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        await act(async () => {
            if (polygon) {
                await userEvent.tab();
                await userEvent.tab();
            }
        });

        expect(polygon).toBeInTheDocument();
        expect(polygon).toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(true);
    });

    it("returns false when polygon is not focused", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                        tabIndex: 0,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        if (polygon) {
            await act(async () => await userEvent.tab());
        }

        expect(polygon).toBeInTheDocument();
        expect(polygon).not.toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(false);
    });
});

// Common tests among limited polygons, closed unlimited polygons, and
// open unlimited polygons.
describe.each`
    polygonType             | polygonState
    ${"Limited"}            | ${baseLimitedPolygonState}
    ${"Unlimited (closed)"} | ${baseUnlimitedPolygonStateClosed}
    ${"Unlimited (open)"}   | ${baseUnlimitedPolygonStateOpen}
`("$polygonType Polygon screen reader full graph", ({polygonState}) => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("Has description of interactive elements on graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={polygonState} />);

        // Act
        const mafsGraph = screen.getByText(
            "Interactive elements: A polygon with 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
        );

        // Assert
        expect(mafsGraph).toBeInTheDocument();
    });

    test("Has overall graph label and description", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={polygonState} />);

        // Act
        const polygonGraph = screen.getByLabelText(
            "A polygon on a coordinate plane.",
        );

        // Assert
        expect(polygonGraph).toBeInTheDocument();
        expect(polygonGraph).toHaveAccessibleDescription(
            "The polygon has 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
        );
    });

    test.each`
        markings   | expectedDescription
        ${"axes"}  | ${"A polygon on a coordinate plane."}
        ${"graph"} | ${"A polygon on a coordinate plane."}
        ${"grid"}  | ${"A polygon."}
        ${"none"}  | ${"A polygon."}
    `(
        "Uses overall graph label based on graph markings $markings",
        ({markings, expectedDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={polygonState}
                    markings={markings}
                />,
            );

            // Act
            const polygonGraph = screen.getByLabelText(expectedDescription);

            // Assert
            expect(polygonGraph).toBeInTheDocument();
        },
    );
});

// Unlimited polygon should have the same experience as
// limited polygon when it is closed.
// These tests don't apply to open unlimited polygons.
describe.each`
    polygonType    | polygonState
    ${"Limited"}   | ${baseLimitedPolygonState}
    ${"Unlimited"} | ${baseUnlimitedPolygonStateClosed}
`(
    "$polygonType Polygon screen reader interactive elements",
    ({polygonState}) => {
        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        test.each`
            markings   | expectedLabel
            ${"axes"}  | ${" Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2."}
            ${"graph"} | ${" Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2."}
            ${"grid"}  | ${""}
            ${"none"}  | ${""}
        `(
            "Uses movable polygon label based on graph markings $markings",
            ({markings, expectedLabel}) => {
                // Arrange
                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={polygonState}
                        markings={markings}
                    />,
                );

                // Act
                const movablePolygon = screen.getAllByRole("button")[0];
                const concatenatedLabel = `A polygon with 3 points.${expectedLabel}`;

                // Assert
                expect(movablePolygon).toHaveAccessibleName(concatenatedLabel);
            },
        );

        test("Interactive elements have expected descriptions (approx angles, approx and exact sides)", () => {
            // Arrange
            render(<MafsGraph {...baseMafsGraphProps} state={polygonState} />);

            // Act
            const interactiveElements = screen.getAllByRole("button");
            const [polygon, point1, point2, point3] = interactiveElements;

            // Assert
            expect(polygon).toHaveAccessibleName(
                "A polygon with 3 points. Point 1 at 3 comma -2. Point 2 at 0 comma 4. Point 3 at -3 comma -2.",
            );
            expect(point1).toHaveAccessibleName("Point 1 at 3 comma -2.");
            expect(point1).toHaveAccessibleDescription(
                "Angle approximately equal to 63.4 degrees. A line segment, length equal to 6 units, connects to point 3. A line segment, length approximately equal to 6.7 units, connects to point 2.",
            );
            expect(point2).toHaveAccessibleName("Point 2 at 0 comma 4.");
            expect(point2).toHaveAccessibleDescription(
                "Angle approximately equal to 53.1 degrees. A line segment, length approximately equal to 6.7 units, connects to point 1. A line segment, length approximately equal to 6.7 units, connects to point 3.",
            );
            expect(point3).toHaveAccessibleName("Point 3 at -3 comma -2.");
            expect(point3).toHaveAccessibleDescription(
                "Angle approximately equal to 63.4 degrees. A line segment, length approximately equal to 6.7 units, connects to point 2. A line segment, length equal to 6 units, connects to point 1.",
            );
        });

        test("Interactive elements have expected descriptions (exact angles, approx and exact sides)", () => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...polygonState,
                        // Rectangle
                        coords: [
                            [-5, 5.5],
                            [5, 5.5],
                            [5, -5],
                            [-5, -5],
                        ],
                    }}
                />,
            );

            // Act
            const interactiveElements = screen.getAllByRole("button");
            const [polygon, point1, point2, point3, point4] =
                interactiveElements;

            // Assert
            expect(polygon).toHaveAccessibleName(
                "A polygon with 4 points. Point 1 at -5 comma 5.5. Point 2 at 5 comma 5.5. Point 3 at 5 comma -5. Point 4 at -5 comma -5.",
            );
            expect(point1).toHaveAccessibleName("Point 1 at -5 comma 5.5.");
            expect(point1).toHaveAccessibleDescription(
                "Angle equal to 90 degrees. A line segment, length approximately equal to 10.5 units, connects to point 4. A line segment, length equal to 10 units, connects to point 2.",
            );
            expect(point2).toHaveAccessibleName("Point 2 at 5 comma 5.5.");
            expect(point2).toHaveAccessibleDescription(
                "Angle equal to 90 degrees. A line segment, length equal to 10 units, connects to point 1. A line segment, length approximately equal to 10.5 units, connects to point 3.",
            );
            expect(point3).toHaveAccessibleName("Point 3 at 5 comma -5.");
            expect(point3).toHaveAccessibleDescription(
                "Angle equal to 90 degrees. A line segment, length approximately equal to 10.5 units, connects to point 2. A line segment, length equal to 10 units, connects to point 4.",
            );
            expect(point4).toHaveAccessibleName("Point 4 at -5 comma -5.");
            expect(point4).toHaveAccessibleDescription(
                "Angle equal to 90 degrees. A line segment, length equal to 10 units, connects to point 3. A line segment, length approximately equal to 10.5 units, connects to point 1.",
            );
        });

        test.each`
            elementName  | index
            ${"polygon"} | ${0}
            ${"point1"}  | ${1}
            ${"point2"}  | ${2}
            ${"point3"}  | ${3}
        `(
            "Should update the aria-live when $elementName is moved",
            async ({index}) => {
                // Arrange
                render(
                    <MafsGraph {...baseMafsGraphProps} state={polygonState} />,
                );
                const interactiveElements = screen.getAllByRole("button");
                const [polygon, point1, point2, point3] = interactiveElements;
                const movingElement = interactiveElements[index];

                // Act - Move the element
                act(() => movingElement.focus());
                await userEvent.keyboard("{ArrowRight}");

                const expectedAriaLive = ["off", "off", "off", "off"];
                expectedAriaLive[index] = "polite";

                // Assert
                expect(polygon).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[0],
                );
                expect(point1).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[1],
                );
                expect(point2).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[2],
                );
                expect(point3).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[3],
                );
            },
        );
    },
);

describe("Unlimited Polygon (open) screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("Empty graph does not have description of interactive elements on graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={emptyUnlimitedPolygonState}
            />,
        );

        // Act
        const mafsGraph = screen.queryByText(/Interactive elements/);

        // Assert
        expect(mafsGraph).not.toBeInTheDocument();
    });

    test("Empty graph the coordinate plane as empty", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={emptyUnlimitedPolygonState}
            />,
        );

        // Act
        const polygonGraph = screen.getByLabelText(
            "An empty coordinate plane.",
        );

        // Assert
        expect(polygonGraph).toBeInTheDocument();
    });

    test("Empty graph does not describe the nonexistent polygon", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={emptyUnlimitedPolygonState}
            />,
        );

        // Act
        const polygon = screen.queryByText(/polygon/);

        // Assert
        expect(polygon).not.toBeInTheDocument();
    });

    test("Polygon with 3 point has expected elements and aria labels", () => {
        // Arrange
        const polygonState: InteractiveGraphState = {
            ...baseUnlimitedPolygonStateOpen,
            coords: [[0, 0]],
        };

        // Act
        render(<MafsGraph {...baseMafsGraphProps} state={polygonState} />);

        const overallGraph = screen.getByText(
            "Interactive elements: A polygon with 1 point. Point 1 at 0 comma 0.",
        );
        const polygonGraph = screen.getByLabelText(
            "A polygon on a coordinate plane.",
        );
        const point = screen.getByRole("button", {
            name: "Point 1 at 0 comma 0.",
        });

        // Assert
        expect(overallGraph).toBeInTheDocument();
        expect(polygonGraph).toHaveAccessibleDescription(
            "The polygon has 1 point. Point 1 at 0 comma 0.",
        );
        expect(point).toHaveAccessibleName("Point 1 at 0 comma 0.");
    });

    test("Interactive elements have expected descriptions (approx angles, approx and exact sides)", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseUnlimitedPolygonStateOpen}
            />,
        );

        // Act
        // The overall polygon is not an interactive element if
        // the polygon is open.
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        expect(point1).toHaveAccessibleName("Point 1 at 3 comma -2.");
        // Since the polygon is open, the first point doesn't have an angle,
        // and it only connects to the point after it.
        expect(point1).toHaveAccessibleDescription(
            "A line segment, length approximately equal to 6.7 units, connects to point 2.",
        );
        expect(point2).toHaveAccessibleName("Point 2 at 0 comma 4.");
        expect(point2).toHaveAccessibleDescription(
            "Angle approximately equal to 53.1 degrees. A line segment, length approximately equal to 6.7 units, connects to point 1. A line segment, length approximately equal to 6.7 units, connects to point 3.",
        );
        expect(point3).toHaveAccessibleName("Point 3 at -3 comma -2.");
        // Since the polygon is open, the last point doesn't have an angle,
        // and it only connects to the point before it.
        expect(point3).toHaveAccessibleDescription(
            "A line segment, length approximately equal to 6.7 units, connects to point 2.",
        );
    });

    test("Interactive elements have expected descriptions (exact angles, approx and exact sides)", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseUnlimitedPolygonStateOpen,
                    // Rectangle
                    coords: [
                        [-5, 5.5],
                        [5, 5.5],
                        [5, -5],
                        [-5, -5],
                    ],
                }}
            />,
        );

        // Act
        // The overall polygon is not an interactive element if
        // the polygon is open.
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3, point4] = interactiveElements;

        // Assert
        expect(point1).toHaveAccessibleName("Point 1 at -5 comma 5.5.");
        // Since the polygon is open, the first point doesn't have an angle,
        // and it only connects to the point after it.
        expect(point1).toHaveAccessibleDescription(
            "A line segment, length equal to 10 units, connects to point 2.",
        );
        expect(point2).toHaveAccessibleName("Point 2 at 5 comma 5.5.");
        expect(point2).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length equal to 10 units, connects to point 1. A line segment, length approximately equal to 10.5 units, connects to point 3.",
        );
        expect(point3).toHaveAccessibleName("Point 3 at 5 comma -5.");
        expect(point3).toHaveAccessibleDescription(
            "Angle equal to 90 degrees. A line segment, length approximately equal to 10.5 units, connects to point 2. A line segment, length equal to 10 units, connects to point 4.",
        );
        expect(point4).toHaveAccessibleName("Point 4 at -5 comma -5.");
        // Since the polygon is open, the last point doesn't have an angle,
        // and it only connects to the point before it.
        expect(point4).toHaveAccessibleDescription(
            "A line segment, length equal to 10 units, connects to point 3.",
        );
    });

    test.each`
        elementName  | index
        ${"polygon"} | ${0}
        ${"point1"}  | ${1}
        ${"point2"}  | ${2}
        ${"point3"}  | ${3}
    `(
        "Should update the aria-live when $elementName is moved",
        async ({index}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseUnlimitedPolygonStateOpen}
                />,
            );
            const interactiveElements = screen.getAllByRole("button");
            const [point1, point2, point3] = interactiveElements;
            const movingElement = interactiveElements[index];

            // Act - Move the element
            act(() => movingElement.focus());
            await userEvent.keyboard("{ArrowRight}");

            const expectedAriaLive = ["off", "off", "off", "off"];
            expectedAriaLive[index] = "polite";

            // Assert
            expect(point1).toHaveAttribute("aria-live", expectedAriaLive[0]);
            expect(point2).toHaveAttribute("aria-live", expectedAriaLive[1]);
            expect(point3).toHaveAttribute("aria-live", expectedAriaLive[2]);
        },
    );
});

describe("getSideSnapConstraint", () => {
    it("should find the next available coordinate to maintain a whole length sides", () => {
        const range: PolygonGraphState["range"] = [
            [-10, 10],
            [-10, 10],
        ];
        const points: PolygonGraphState["coords"] = [
            [0, 0],
            [0, 2],
            [2, 2],
            [2, 0],
        ];

        // We're moving the third point in the top right corner of the polygon (square).
        const constraint = getSideSnapConstraint(points, 2, range);

        expect(constraint).toEqual({
            up: [1.7385890143294638, 2.9885890143294653],
            down: [1.7057189138830724, 0.9557189138830715],
            left: [0.9557189138830734, 1.7057189138830726],
            right: [2.9885890143294644, 1.7385890143294631],
        });
    });

    it("should restrict the available points by the bounds of the graph", () => {
        const range: PolygonGraphState["range"] = [
            [0, 2],
            [0, 2],
        ];
        const points: PolygonGraphState["coords"] = [
            [0, 0],
            [0, 2],
            [2, 2],
            [2, 0],
        ];

        // We're moving the third point in the top right corner of the polygon (square).
        const constraint = getSideSnapConstraint(points, 2, range);

        expect(constraint).toEqual({
            up: [2, 2], // direction restricted due to going off the graph
            down: [1.7057189138830724, 0.9557189138830715],
            left: [0.9557189138830734, 1.7057189138830726],
            right: [2, 2], // direction restricted due to going off the graph
        });
    });
});

describe("getAngleSnapConstraint", () => {
    it("should find the next available coordinate to maintain a whole length sides", () => {
        const range: PolygonGraphState["range"] = [
            [-10, 10],
            [-10, 10],
        ];
        const points: PolygonGraphState["coords"] = [
            [0, 0],
            [0, 2],
            [2, 2],
            [2, 0],
        ];

        // We're moving the third point in the top right corner of the polygon (square).
        const constraint = getAngleSnapConstraint(points, 2, range);

        // The points below represent available angles around the 90 degrees
        // angle of the initial top right square (89, 91, etc).
        expect(constraint).toEqual({
            up: [1.9999999999999998, 2.1048155585660826],
            down: [1.9999999999999998, 1.8951844414339165],
            left: [1.8951844414339178, 1.9999999999999996],
            right: [2.1048155585660826, 1.9999999999999996],
        });
    });

    it("should restrict the available points by the bounds of the graph", () => {
        const range: PolygonGraphState["range"] = [
            [0, 2.01],
            [0, 2.01],
        ];
        const points: PolygonGraphState["coords"] = [
            [0, 0],
            [0, 2],
            [2, 2],
            [2, 0],
        ];

        // We're moving the third point in the top right corner of the polygon (square).
        const constraint = getAngleSnapConstraint(points, 2, range);

        expect(constraint).toEqual({
            up: [2, 1.9999999999999996], // direction restricted due to going off the graph
            down: [1.9999999999999998, 1.8951844414339165],
            left: [1.8951844414339178, 1.9999999999999996],
            right: [2, 1.9999999999999996], // direction restricted due to going off the graph
        });
    });
});

describe("Angle indicators", () => {
    // Polygon that looks like a chevron, with a concave vertex on the left,
    // drawn from the top left.
    const concavePolygonClockwise = [
        [-7, 5],
        [1, 5],
        [6, 0],
        [1, -5],
        [-7, -5],
        [-2, 0], // concave vertex
    ] satisfies vec.Vector2[];

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        // Clear any previous calls to the mock
        jest.clearAllMocks();
    });

    it("should show correct angles for concave polygons when the points are clockwise", () => {
        // Arrange

        // Act - render with angles showing
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLimitedPolygonState,
                    coords: concavePolygonClockwise,
                    showAngles: true,
                }}
            />,
        );

        const angleIndicators = screen.getAllByText(/°/);

        // Assert
        expect(angleIndicators).toHaveLength(concavePolygonClockwise.length);
        // Checking angles in render order
        expect(angleIndicators[0]).toHaveTextContent("45°");
        expect(angleIndicators[1]).toHaveTextContent("135°");
        expect(angleIndicators[2]).toHaveTextContent("90°");
        expect(angleIndicators[3]).toHaveTextContent("135°");
        expect(angleIndicators[4]).toHaveTextContent("45°");
        // Concave vertex, greater than 180 degrees
        expect(angleIndicators[5]).toHaveTextContent("270°");
    });

    it("should show correct angles for concave polygons when the points are counter-clockwise", () => {
        // Arrange

        // Act - render with angles showing
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLimitedPolygonState,
                    // Reverse the points to make them counter-clockwise
                    coords: [...concavePolygonClockwise].reverse(),
                    showAngles: true,
                }}
            />,
        );

        const angleIndicators = screen.getAllByText(/°/);

        // Assert
        expect(angleIndicators).toHaveLength(concavePolygonClockwise.length);
        // Checking angles in render order
        // Concave vertex, greater than 180 degrees
        expect(angleIndicators[0]).toHaveTextContent("270°");
        expect(angleIndicators[1]).toHaveTextContent("45°");
        expect(angleIndicators[2]).toHaveTextContent("135°");
        expect(angleIndicators[3]).toHaveTextContent("90°");
        expect(angleIndicators[4]).toHaveTextContent("135°");
        expect(angleIndicators[5]).toHaveTextContent("45°");
    });
});
