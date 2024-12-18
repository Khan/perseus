import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

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
        expect(linearSystemGraph).toHaveAttribute(
            "aria-describedby",
            ":r1:-line1-points :r1:-line1-intercept :r1:-line1-slope :r1:-line2-points :r1:-line2-intercept :r1:-line2-slope",
        );
    });

    test("should have aria labels and describedbys for both points and grab handle on the line", () => {
        // Arrange
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLinearSystemState} />,
        );

        // Act
        // Moveable elements: point 1, grab handle, point 2
        const movableElements = screen.getAllByRole("button");
        const [
            line1Point1,
            line1Grab,
            line1Point2,
            line2Point1,
            line2Grab,
            line2Point2,
        ] = movableElements;

        // Assert
        // Check aria-label and describedby on interactive elements.
        // (The actual description text is tested separately below.)
        expect(line1Point1).toHaveAttribute(
            "aria-label",
            "Point 1 on line 1 at -5 comma 5.",
        );
        // We don't know the exact ID because of React.useID(), but we can
        // check the suffix.
        expect(line1Point1.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line1Point1.getAttribute("aria-describedby")).toContain(
            "-slope",
        );

        expect(line1Grab).toHaveAttribute(
            "aria-label",
            "Line 1 from -5 comma 5 to 5 comma 5.",
        );
        expect(line1Grab.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line1Grab.getAttribute("aria-describedby")).toContain("-slope");

        expect(line1Point2).toHaveAttribute(
            "aria-label",
            "Point 2 on line 1 at 5 comma 5.",
        );
        expect(line1Point2.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line1Point2.getAttribute("aria-describedby")).toContain(
            "-slope",
        );

        expect(line2Point1).toHaveAttribute(
            "aria-label",
            "Point 1 on line 2 at -5 comma -5.",
        );
        // We don't know the exact ID because of React.useID(), but we can
        // check the suffix.
        expect(line2Point1.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line2Point1.getAttribute("aria-describedby")).toContain(
            "-slope",
        );

        expect(line2Grab).toHaveAttribute(
            "aria-label",
            "Line 2 from -5 comma -5 to 5 comma -5.",
        );
        expect(line2Grab.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line2Grab.getAttribute("aria-describedby")).toContain("-slope");

        expect(line2Point2).toHaveAttribute(
            "aria-label",
            "Point 2 on line 2 at 5 comma -5.",
        );
        expect(line2Point2.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(line2Point2.getAttribute("aria-describedby")).toContain(
            "-slope",
        );
    });

    test("points description should include points info", () => {
        // Arrange
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLinearSystemState} />,
        );

        // Act
        const linearSystemGraph = screen.getByLabelText(overallGraphLabel);

        // Assert
        expect(linearSystemGraph).toHaveTextContent(
            "Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
        expect(linearSystemGraph).toHaveTextContent(
            "Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5.",
        );
    });

    // Test each line in the linear system graph separately.
    describe.each`
        lineSequence
        ${1}
        ${2}
    `(`Line $lineSequence`, ({lineSequence}) => {
        test.each`
            case                         | coords              | interceptDescription
            ${"origin intercept"}        | ${[[1, 1], [2, 2]]} | ${"The line crosses the x and y axes at the graph's origin."}
            ${"both x and y intercepts"} | ${[[4, 4], [7, 1]]} | ${"The line crosses the X-axis at 8 comma 0 and the Y-axis at 0 comma 8."}
            ${"x intercept only"}        | ${[[5, 5], [5, 2]]} | ${"The line crosses the X-axis at 5 comma 0."}
            ${"y intercept only"}        | ${[[5, 5], [2, 5]]} | ${"The line crosses the Y-axis at 0 comma 5."}
        `(
            "slope description should include slope info for $case",
            ({coords, interceptDescription}) => {
                // Arrange
                const newCoords = [...baseLinearSystemState.coords];
                newCoords[lineSequence - 1] = coords;

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
        `(
            "slope description should include slope info for $case",
            ({coords, slopeDescription}) => {
                // Arrange
                const newCoords = [...baseLinearSystemState.coords];
                newCoords[lineSequence - 1] = coords;

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
            newCoords[lineSequence - 1] = [
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
            const point1 = interactiveElements[0 + (lineSequence - 1) * 3];
            const grabHandle = interactiveElements[1 + (lineSequence - 1) * 3];
            const point2 = interactiveElements[2 + (lineSequence - 1) * 3];

            // Assert
            // Check updated aria-label for the linear graph.
            expect(point1).toHaveAttribute(
                "aria-label",
                `Point 1 on line ${lineSequence} at -2 comma 3.`,
            );
            expect(grabHandle).toHaveAttribute(
                "aria-label",
                `Line ${lineSequence} from -2 comma 3 to 3 comma 3.`,
            );
            expect(point2).toHaveAttribute(
                "aria-label",
                `Point 2 on line ${lineSequence} at 3 comma 3.`,
            );
        });

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
                movingElement.focus();
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
