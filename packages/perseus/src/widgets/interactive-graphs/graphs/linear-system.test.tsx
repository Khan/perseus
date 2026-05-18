import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getLinearSystemGraphDescription} from "./linear-system";

import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLinearSystemState: InteractiveGraphState = {
    type: "linear-system",
    coords: [
        [
            [-5, 5],
            [5, 5],
        ],
        [
            [-5, -5],
            [5, -5],
        ],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const overallGraphLabel = "Two lines on a coordinate plane.";

describe("Linear System graph screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for overall linear system graph", () => {
        // Arrange
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLinearSystemState} />,
        );

        // Act
        const linearSystemGraph = screen.getByLabelText(
            "Two lines on a coordinate plane.",
        );

        // Assert
        expect(linearSystemGraph).toBeInTheDocument();
        expect(linearSystemGraph).toHaveAccessibleDescription(
            "Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5. The line crosses the Y-axis at 0 comma 5. Its slope is zero. Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5. The line crosses the Y-axis at 0 comma -5. Its slope is zero. Line 1 and line 2 are parallel.",
        );
    });

    // Test each line in the linear system graph separately.
    describe.each`
        lineNumber
        ${1}
        ${2}
    `(`Line $lineNumber`, ({lineNumber}) => {
        test.each`
            case                         | coords              | interceptDescription
            ${"origin intercept"}        | ${[[1, 1], [2, 2]]} | ${"The line crosses the X and Y axes at the graph's origin."}
            ${"both X and Y intercepts"} | ${[[4, 4], [7, 1]]} | ${"The line crosses the X-axis at 8 comma 0 and the Y-axis at 0 comma 8."}
            ${"x intercept only"}        | ${[[5, 5], [5, 2]]} | ${"The line crosses the X-axis at 5 comma 0."}
            ${"y intercept only"}        | ${[[5, 5], [2, 5]]} | ${"The line crosses the Y-axis at 0 comma 5."}
            ${"overlaps y-axis"}         | ${[[0, 5], [0, 2]]} | ${"The line crosses the X-axis at 0 comma 0."}
            ${"overlaps x-axis"}         | ${[[5, 0], [2, 0]]} | ${"The line crosses the Y-axis at 0 comma 0."}
        `(
            "slope description should include slope info for $case",
            ({coords, interceptDescription}) => {
                // Arrange
                const newCoords = [...baseLinearSystemState.coords];
                newCoords[lineNumber - 1] = coords;

                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={{
                            ...baseLinearSystemState,
                            coords: newCoords,
                        }}
                    />,
                );

                // Act
                const linearSystemGraph =
                    screen.getByLabelText(overallGraphLabel);

                // Assert
                expect(linearSystemGraph).toHaveTextContent(
                    interceptDescription,
                );
            },
        );

        test.each`
            case                 | coords              | slopeDescription
            ${"positive slope"}  | ${[[1, 1], [3, 3]]} | ${`Its slope increases from left to right.`}
            ${"negative slope"}  | ${[[3, 3], [1, 6]]} | ${`Its slope decreases from left to right.`}
            ${"horizontal line"} | ${[[1, 1], [3, 1]]} | ${`Its slope is zero.`}
            ${"vertical line"}   | ${[[1, 1], [1, 3]]} | ${`Its slope is undefined.`}
            ${"overlaps x-axis"} | ${[[1, 0], [3, 0]]} | ${`Its slope is zero.`}
            ${"overlaps y-axis"} | ${[[0, 1], [0, 3]]} | ${`Its slope is undefined.`}
        `(
            "slope description should include slope info for $case",
            ({coords, slopeDescription}) => {
                // Arrange
                const newCoords = [...baseLinearSystemState.coords];
                newCoords[lineNumber - 1] = coords;

                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={{
                            ...baseLinearSystemState,
                            coords: newCoords,
                        }}
                    />,
                );

                // Act
                const linearSystemGraph =
                    screen.getByLabelText(overallGraphLabel);

                // Assert
                expect(linearSystemGraph).toHaveTextContent(slopeDescription);
            },
        );

        test("aria label reflects updated values", async () => {
            // Arrange
            const newCoords = [...baseLinearSystemState.coords];
            newCoords[lineNumber - 1] = [
                [-2, 3],
                [3, 3],
            ];

            // Act
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseLinearSystemState,
                        // Different points than default (-5, 5) and (5, 5)
                        coords: newCoords,
                    }}
                />,
            );

            const interactiveElements = screen.getAllByRole("button");

            // Get interactive elements for this line.
            const point1 = interactiveElements[0 + (lineNumber - 1) * 3];
            const grabHandle = interactiveElements[1 + (lineNumber - 1) * 3];
            const point2 = interactiveElements[2 + (lineNumber - 1) * 3];

            // Assert
            // Check updated aria-label for the linear graph.
            expect(point1).toHaveAttribute(
                "aria-label",
                `Point 1 on line ${lineNumber} at -2 comma 3.`,
            );
            expect(grabHandle).toHaveAttribute(
                "aria-label",
                `Line ${lineNumber} going through point -2 comma 3 and point 3 comma 3.`,
            );
            expect(point2).toHaveAttribute(
                "aria-label",
                `Point 2 on line ${lineNumber} at 3 comma 3.`,
            );
        });

        test.each`
            element         | index
            ${"point1"}     | ${0}
            ${"grabHandle"} | ${1}
            ${"point2"}     | ${2}
        `(
            "should have describedby on all interactive elements (parallel lines)",
            ({index}) => {
                // Arrange
                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={baseLinearSystemState}
                    />,
                );

                // Act
                const interactiveElements = screen.getAllByRole("button");
                const element =
                    interactiveElements[index + (lineNumber - 1) * 3];

                const expectedDescription = `The line crosses the Y-axis at 0 comma ${lineNumber === 1 ? 5 : -5}. Its slope is zero. Line 1 and line 2 are parallel.`;

                // Assert
                expect(element).toHaveAccessibleDescription(
                    expectedDescription,
                );
            },
        );

        test.each`
            element         | index
            ${"point1"}     | ${0}
            ${"grabHandle"} | ${1}
            ${"point2"}     | ${2}
        `(
            "should have describedby on all interactive elements (intersecting lines)",
            ({index}) => {
                // Arrange
                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={{
                            ...baseLinearSystemState,
                            coords: [
                                [
                                    [-2, -2],
                                    [2, 2],
                                ],
                                [
                                    [-2, 2],
                                    [2, -2],
                                ],
                            ],
                        }}
                    />,
                );

                // Act
                const interactiveElements = screen.getAllByRole("button");
                const element =
                    interactiveElements[index + (lineNumber - 1) * 3];

                const expectedDescription = `The line crosses the X and Y axes at the graph's origin. Its slope ${lineNumber === 1 ? "increases" : "decreases"} from left to right. Line 1 and line 2 intersect at point 0 comma 0.`;

                // Assert
                expect(element).toHaveAccessibleDescription(
                    expectedDescription,
                );
            },
        );

        test.each`
            elementName     | index
            ${"point1"}     | ${0}
            ${"grabHandle"} | ${1}
            ${"point2"}     | ${2}
        `(
            "Should update the aria-live when $elementName is moved",
            async ({index}) => {
                // Arrange
                render(
                    <MafsGraph
                        {...baseMafsGraphProps}
                        state={baseLinearSystemState}
                    />,
                );
                const interactiveElements = screen.getAllByRole("button");
                const [point1, grabHandle, point2] = interactiveElements;
                const movingElement = interactiveElements[index];

                // Act - Move the element
                act(() => movingElement.focus());
                await userEvent.keyboard("{ArrowRight}");

                const expectedAriaLive = ["off", "off", "off"];
                expectedAriaLive[index] = "polite";

                // Assert
                expect(point1).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[0],
                );
                expect(grabHandle).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[1],
                );
                expect(point2).toHaveAttribute(
                    "aria-live",
                    expectedAriaLive[2],
                );
            },
        );
    });
});

describe("getLinearSystemGraphDescription", () => {
    test("describes a default linear system graph", () => {
        // Arrange

        // Act
        const linearSystemGraphDescription = getLinearSystemGraphDescription(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(linearSystemGraphDescription).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5. Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5.",
        );
    });

    test("describes a linear system graph with updated points", () => {
        // Arrange

        // Act
        const linearSystemGraphDescription = getLinearSystemGraphDescription(
            {
                ...baseLinearSystemState,
                coords: [
                    [
                        [-2, 3],
                        [3, 3],
                    ],
                    [
                        [-2, -3],
                        [3, -3],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(linearSystemGraphDescription).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -2 comma 3 and point 2 at 3 comma 3. Line 2 has two points, point 1 at -2 comma -3 and point 2 at 3 comma -3.",
        );
    });
});
