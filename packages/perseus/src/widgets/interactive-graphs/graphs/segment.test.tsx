import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";
import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getSegmentGraphDescription} from "./segment";

import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseSingleSegmentState: InteractiveGraphState = {
    type: "segment",
    coords: [
        [
            [-5, 5],
            [5, 5],
        ],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const baseMultipleSegmentState: InteractiveGraphState = {
    type: "segment",
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

const singleGraphOverallLabel = "A line segment on a coordinate plane.";
const multipleGraphOverallLabel = "2 segments on a coordinate plane.";

describe("Segment graph screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for overall single segment graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseSingleSegmentState}
            />,
        );

        // Act
        const segmentGraph = screen.getByLabelText(singleGraphOverallLabel);

        // Assert
        expect(segmentGraph).toBeInTheDocument();
        expect(segmentGraph).toHaveAccessibleName(
            "A line segment on a coordinate plane.",
        );
        expect(segmentGraph).toHaveAccessibleDescription(
            "Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5. Segment length 10 units.",
        );
    });

    test("should have aria label and describedby for overall multiple segments graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseMultipleSegmentState}
            />,
        );

        // Act
        const segmentGraph = screen.getByLabelText(multipleGraphOverallLabel);

        // Assert
        expect(segmentGraph).toBeInTheDocument();
        expect(segmentGraph).toHaveAccessibleName(
            "2 segments on a coordinate plane.",
        );
        expect(segmentGraph).toHaveAccessibleDescription(
            "Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5. Segment 2: Endpoint 1 at -5 comma -5. Endpoint 2 at 5 comma -5.",
        );
    });

    test.each`
        element         | index | expectedValue
        ${"point1"}     | ${0}  | ${"Endpoint 1 at -5 comma 5."}
        ${"grabHandle"} | ${1}  | ${"Segment from -5 comma 5 to 5 comma 5."}
        ${"point2"}     | ${2}  | ${"Endpoint 2 at 5 comma 5."}
    `(
        "should have aria label for $element on a single segment",
        ({index, expectedValue}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseSingleSegmentState}
                />,
            );

            // Act
            // Moveable elements: point 1, grab handle, point 2
            const movableElements = screen.getAllByRole("button");
            const element = movableElements[index];

            // Assert
            expect(element).toHaveAttribute("aria-label", expectedValue);
        },
    );

    test.each`
        element                   | index | expectedValue
        ${"segment 1 point1"}     | ${0}  | ${"Endpoint 1 on segment 1 at -5 comma 5."}
        ${"segment 1 grabHandle"} | ${1}  | ${"Segment from -5 comma 5 to 5 comma 5."}
        ${"segment 1 point2"}     | ${2}  | ${"Endpoint 2 on segment 1 at 5 comma 5."}
        ${"segment 2 point1"}     | ${3}  | ${"Endpoint 1 on segment 2 at -5 comma -5."}
        ${"segment 2 grabHandle"} | ${4}  | ${"Segment from -5 comma -5 to 5 comma -5."}
        ${"segment 2 point2"}     | ${5}  | ${"Endpoint 2 on segment 2 at 5 comma -5."}
    `(
        "should have aria label for $element on multiple segments",
        ({index, expectedValue}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseMultipleSegmentState}
                />,
            );

            // Act
            // Moveable elements: point 1, grab handle, point 2
            const movableElements = screen.getAllByRole("button");
            const element = movableElements[index];

            // Assert
            expect(element).toHaveAttribute("aria-label", expectedValue);
        },
    );

    test("Single segment points description should include points info", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseSingleSegmentState}
            />,
        );

        // Act
        const linearGraph = screen.getByLabelText(singleGraphOverallLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5.",
        );
    });

    test("Multiple segments points description should include points info", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseMultipleSegmentState}
            />,
        );

        // Act
        const linearGraph = screen.getByLabelText(multipleGraphOverallLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5. Segment 2: Endpoint 1 at -5 comma -5. Endpoint 2 at 5 comma -5.",
        );
    });

    test("Single segment aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseSingleSegmentState,
                    // Different points than default (-5, 5) and (5, 5)
                    coords: [
                        [
                            [-2, 3],
                            [3, 3],
                        ],
                    ],
                }}
            />,
        );

        const interactiveElements = screen.getAllByRole("button");
        const [point1, grabHandle, point2] = interactiveElements;

        // Assert
        // Check updated aria-label for the segment graph.
        expect(point1).toHaveAttribute(
            "aria-label",
            "Endpoint 1 at -2 comma 3.",
        );
        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Segment from -2 comma 3 to 3 comma 3.",
        );
        expect(point2).toHaveAttribute(
            "aria-label",
            "Endpoint 2 at 3 comma 3.",
        );
    });

    test("Multiple segment aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseSingleSegmentState,
                    // Different points than default (-5, 5) and (5, 5)
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
                }}
            />,
        );

        const interactiveElements = screen.getAllByRole("button");
        const [
            seg1Point1,
            seg1GrabHandle,
            seg1Point2,
            seg2Point1,
            seg2GrabHandle,
            seg2Point2,
        ] = interactiveElements;

        // Assert
        // Check updated aria-label for the segment graph.
        expect(seg1Point1).toHaveAttribute(
            "aria-label",
            "Endpoint 1 on segment 1 at -2 comma 3.",
        );
        expect(seg1GrabHandle).toHaveAttribute(
            "aria-label",
            "Segment from -2 comma 3 to 3 comma 3.",
        );
        expect(seg1Point2).toHaveAttribute(
            "aria-label",
            "Endpoint 2 on segment 1 at 3 comma 3.",
        );
        expect(seg2Point1).toHaveAttribute(
            "aria-label",
            "Endpoint 1 on segment 2 at -2 comma -3.",
        );
        expect(seg2GrabHandle).toHaveAttribute(
            "aria-label",
            "Segment from -2 comma -3 to 3 comma -3.",
        );
        expect(seg2Point2).toHaveAttribute(
            "aria-label",
            "Endpoint 2 on segment 2 at 3 comma -3.",
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
                    state={baseSingleSegmentState}
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
            expect(point1).toHaveAttribute("aria-live", expectedAriaLive[0]);
            expect(grabHandle).toHaveAttribute(
                "aria-live",
                expectedAriaLive[1],
            );
            expect(point2).toHaveAttribute("aria-live", expectedAriaLive[2]);
        },
    );
});

describe("getSegmentGraphDescription", () => {
    test("describes a single segment", () => {
        // Arrange

        // Act
        const interactiveElementsString = getSegmentGraphDescription(
            baseSingleSegmentState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5.",
        );
    });

    test("describes multiple segments", () => {
        // Arrange

        // Act
        const interactiveElementsString = getSegmentGraphDescription(
            baseMultipleSegmentState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5. Segment 2: Endpoint 1 at -5 comma -5. Endpoint 2 at 5 comma -5.",
        );
    });

    test("describes a segment graph with updated points", () => {
        // Arrange

        // Act
        const interactiveElementsString = getSegmentGraphDescription(
            {
                ...baseSingleSegmentState,
                coords: [
                    [
                        [-1, 2],
                        [3, 4],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -1 comma 2. Endpoint 2 at 3 comma 4.",
        );
    });

    test("describes a segment graph with multiple segments and updated points", () => {
        // Arrange

        // Act
        const interactiveElementsString = getSegmentGraphDescription(
            {
                ...baseMultipleSegmentState,
                coords: [
                    [
                        [-1, 2],
                        [3, 4],
                    ],
                    [
                        [-1, -2],
                        [3, -4],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -1 comma 2. Endpoint 2 at 3 comma 4. Segment 2: Endpoint 1 at -1 comma -2. Endpoint 2 at 3 comma -4.",
        );
    });
});
