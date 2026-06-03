import {
    generateIGLinearGraph,
    generateInteractiveGraphQuestion,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {renderQuestion} from "../../__testutils__/renderQuestion";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {describeLinearGraph} from "./linear";

import type {InteractiveGraphState} from "../types";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLinearState: InteractiveGraphState = {
    type: "linear",
    coords: [
        [-5, 5],
        [5, 5],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const overallGraphLabel = "A line on a coordinate plane.";

describe("Linear graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for overall linear graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(
            "A line on a coordinate plane.",
        );

        // Assert
        expect(linearGraph).toBeInTheDocument();
        expect(linearGraph).toHaveAccessibleDescription(
            "The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5. The line crosses the Y-axis at 0 comma 5. Its slope is zero.",
        );
    });

    test.each`
        element         | index | expectedValue
        ${"point1"}     | ${0}  | ${"Point 1 at -5 comma 5."}
        ${"grabHandle"} | ${1}  | ${"Line going through point -5 comma 5 and point 5 comma 5."}
        ${"point2"}     | ${2}  | ${"Point 2 at 5 comma 5."}
    `(
        "should have aria label for $element on the line",
        ({index, expectedValue}) => {
            // Arrange
            render(
                <MafsGraph {...baseMafsGraphProps} state={baseLinearState} />,
            );

            // Act
            // Moveable elements: point 1, grab handle, point 2
            const movableElements = screen.getAllByRole("button");
            const element = movableElements[index];

            // Assert
            // Check aria-label and describedby on interactive elements.
            // (The actual description text is tested separately below.)
            expect(element).toHaveAttribute("aria-label", expectedValue);
        },
    );

    test.each`
        element         | index
        ${"point1"}     | ${0}
        ${"grabHandle"} | ${1}
        ${"point2"}     | ${2}
    `("should have aria describedby for $element on the line", ({index}) => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        // Moveable elements: point 1, grab handle, point 2
        const movableElements = screen.getAllByRole("button");
        const element = movableElements[index];

        // Assert
        // Check aria-describedby on interactive elements.
        // (The actual description text is tested separately below.)
        // We don't know the exact ID because of React.useID(), but we can
        // check the suffix.
        expect(element.getAttribute("aria-describedby")).toContain(
            "-intercept",
        );
        expect(element.getAttribute("aria-describedby")).toContain("-slope");
    });

    test("points description should include points info", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(overallGraphLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
    });

    test.each`
        case                         | coords              | interceptDescription
        ${"origin intercept"}        | ${[[1, 1], [2, 2]]} | ${"The line crosses the X and Y axes at the graph's origin."}
        ${"both x and y intercepts"} | ${[[4, 4], [7, 1]]} | ${"The line crosses the X-axis at 8 comma 0 and the Y-axis at 0 comma 8."}
        ${"x intercept only"}        | ${[[5, 5], [5, 2]]} | ${"The line crosses the X-axis at 5 comma 0."}
        ${"y intercept only"}        | ${[[5, 5], [2, 5]]} | ${"The line crosses the Y-axis at 0 comma 5."}
    `(
        "slope description should include slope info for $case",
        ({coords, interceptDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseLinearState,
                        coords,
                    }}
                />,
            );

            // Act
            const linearGraph = screen.getByLabelText(overallGraphLabel);

            // Assert
            expect(linearGraph).toHaveTextContent(interceptDescription);
        },
    );

    test.each`
        case                 | coords              | slopeDescription
        ${"positive slope"}  | ${[[1, 1], [3, 3]]} | ${"Its slope increases from left to right."}
        ${"negative slope"}  | ${[[3, 3], [1, 6]]} | ${"Its slope decreases from left to right."}
        ${"horizontal line"} | ${[[1, 1], [3, 1]]} | ${"Its slope is zero."}
        ${"vertical line"}   | ${[[1, 1], [1, 3]]} | ${"Its slope is undefined."}
    `(
        "slope description should include slope info for $case",
        ({coords, slopeDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseLinearState,
                        coords,
                    }}
                />,
            );

            // Act
            const linearGraph = screen.getByLabelText(overallGraphLabel);

            // Assert
            expect(linearGraph).toHaveTextContent(slopeDescription);
        },
    );

    test("aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLinearState,
                    // Different points than default (-5, 5) and (5, 5)
                    coords: [
                        [-2, 3],
                        [3, 3],
                    ],
                }}
            />,
        );

        const interactiveElements = screen.getAllByRole("button");
        const [point1, grabHandle, point2] = interactiveElements;

        // Assert
        // Check updated aria-label for the linear graph.
        expect(point1).toHaveAttribute("aria-label", "Point 1 at -2 comma 3.");
        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Line going through point -2 comma 3 and point 3 comma 3.",
        );
        expect(point2).toHaveAttribute("aria-label", "Point 2 at 3 comma 3.");
    });
});

describe("Linear graph pointLabels", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("uses custom pointLabels in each endpoint's accessible name", () => {
        // Arrange, Act
        renderQuestion(
            generateInteractiveGraphQuestion({
                correct: generateIGLinearGraph({
                    pointLabels: ["A", "B"],
                }),
            }),
        );
        const [point1, , point2] = screen.getAllByRole("button");

        // Assert
        expect(point1).toHaveAttribute("aria-label", "Point A at -5 comma 5.");
        expect(point2).toHaveAttribute("aria-label", "Point B at 5 comma 5.");
    });

    it("falls back to numeric default for indices without a custom label", () => {
        // Arrange, Act — only the first endpoint is named
        renderQuestion(
            generateInteractiveGraphQuestion({
                correct: generateIGLinearGraph({
                    // eslint-disable-next-line no-restricted-syntax -- short array tests the missing-index fallback
                    pointLabels: ["A"] as unknown as [string, string],
                }),
            }),
        );
        const [point1, , point2] = screen.getAllByRole("button");

        // Assert
        expect(point1).toHaveAttribute("aria-label", "Point A at -5 comma 5.");
        expect(point2).toHaveAttribute("aria-label", "Point 2 at 5 comma 5.");
    });

    // The editor encodes "only the second endpoint named" as `["", "B"]`.
    // An empty string at any index must fall back to the numeric default.
    it("falls back to numeric default for explicit empty-string entries", () => {
        // Arrange, Act
        renderQuestion(
            generateInteractiveGraphQuestion({
                correct: generateIGLinearGraph({
                    pointLabels: ["", "B"],
                }),
            }),
        );
        const [point1, , point2] = screen.getAllByRole("button");

        // Assert
        expect(point1).toHaveAttribute("aria-label", "Point 1 at -5 comma 5.");
        expect(point2).toHaveAttribute("aria-label", "Point B at 5 comma 5.");
    });

    it("falls back to the numeric default for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        renderQuestion(
            generateInteractiveGraphQuestion({
                correct: generateIGLinearGraph({
                    // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
                    pointLabels: [42, "B"] as unknown as [string, string],
                }),
            }),
        );
        const [point1, , point2] = screen.getAllByRole("button");

        // Assert
        expect(point1).toHaveAttribute("aria-label", "Point 1 at -5 comma 5.");
        expect(point2).toHaveAttribute("aria-label", "Point B at 5 comma 5.");
    });
});

describe("describeLinearGraph", () => {
    test("describes a default linear graph", () => {
        // Arrange

        // Act
        const strings = describeLinearGraph(
            baseLinearState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srLinearGraph).toBe("A line on a coordinate plane.");
        expect(strings.srLinearGraphPoints).toBe(
            "The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
        expect(strings.srLinearGrabHandle).toBe(
            "Line going through point -5 comma 5 and point 5 comma 5.",
        );
        expect(strings.slopeString).toBe("Its slope is zero.");
        expect(strings.interceptString).toBe(
            "The line crosses the Y-axis at 0 comma 5.",
        );
        expect(strings.srLinearInteractiveElement).toBe(
            "Interactive elements: A line on a coordinate plane. The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
    });

    test("describes a linear graph with updated points", () => {
        // Arrange

        // Act
        const strings = describeLinearGraph(
            {
                ...baseLinearState,
                coords: [
                    [-1, 2],
                    [3, 4],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srLinearGraph).toBe("A line on a coordinate plane.");
        expect(strings.srLinearGraphPoints).toBe(
            "The line has two points, point 1 at -1 comma 2 and point 2 at 3 comma 4.",
        );
        expect(strings.srLinearGrabHandle).toBe(
            "Line going through point -1 comma 2 and point 3 comma 4.",
        );
        expect(strings.slopeString).toBe(
            "Its slope increases from left to right.",
        );
        expect(strings.interceptString).toBe(
            "The line crosses the X-axis at -5 comma 0 and the Y-axis at 0 comma 2.5.",
        );
        expect(strings.srLinearInteractiveElement).toBe(
            "Interactive elements: A line on a coordinate plane. The line has two points, point 1 at -1 comma 2 and point 2 at 3 comma 4.",
        );
    });
});
