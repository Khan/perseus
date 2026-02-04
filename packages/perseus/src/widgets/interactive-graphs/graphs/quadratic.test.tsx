import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";
import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    describeQuadraticGraph,
    getQuadraticCoefficients,
    getQuadraticKeyboardConstraint,
} from "./quadratic";

import type {QuadraticGraphState, InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseQuadraticState: InteractiveGraphState = {
    type: "quadratic",
    coords: [
        [-5, 5],
        [0, -5],
        [5, 5],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const overallGraphLabel = "A parabola on a 4-quadrant coordinate plane.";

describe("Quadratic graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test.each`
        case                                           | points                         | direction     | vertex             | xIntercepts        | yIntercept
        ${"default - up, y-axis vertex, 2 intercepts"} | ${[[-5, 5], [0, -5], [5, 5]]}  | ${"upward"}   | ${"on the Y-axis"} | ${[3.536, -3.536]} | ${-5}
        ${"up, origin vertex, 1 intercept"}            | ${[[-5, 5], [0, 0], [5, 5]]}   | ${"upward"}   | ${"at the origin"} | ${[0]}             | ${0}
        ${"up, y-axis vertex, no intercepts"}          | ${[[-5, 5], [0, 1], [5, 5]]}   | ${"upward"}   | ${"on the Y-axis"} | ${[]}              | ${1}
        ${"down, y-axis vertex, 2 intercepts"}         | ${[[-5, -5], [0, 1], [5, -5]]} | ${"downward"} | ${"on the Y-axis"} | ${[-2.041, 2.041]} | ${1}
        ${"up, x-axis vertex, 1 intercept"}            | ${[[-6, 5], [-1, 0], [4, 5]]}  | ${"upward"}   | ${"on the X-axis"} | ${[-1]}            | ${0.2}
        ${"up, quadrant vertex, 2 intercepts"}         | ${[[-6, 5], [-1, -1], [4, 5]]} | ${"upward"}   | ${"in quadrant 3"} | ${[1.041, -3.041]} | ${-0.76}
        ${"sloped line, no vertex, 1 intercept"}       | ${[[-5, -5], [0, 0], [5, 5]]}  | ${undefined}  | ${undefined}       | ${[0]}             | ${0}
        ${"horizontal line, no vertex, no intercept"}  | ${[[-5, 1], [0, 1], [5, 1]]}   | ${undefined}  | ${undefined}       | ${[]}              | ${1}
    `(
        "should have aria label and describedby for quadratic graph - $case",
        ({points, direction, vertex, xIntercepts, yIntercept}) => {
            // Arrange
            // Direction is undefined when the parabola is a line.
            const directionString = direction
                ? `The parabola opens ${direction}. `
                : "";
            // Vertex is undefined when the parabola is a line.
            const vertexString = vertex ? `Vertex is ${vertex}. ` : "";
            // There is no x-intercept description when there
            // are no x-intercepts.
            const xInterceptsString =
                xIntercepts.length === 0
                    ? ""
                    : xIntercepts.length === 1
                      ? `The X-intercept is at ${xIntercepts[0]} comma 0. `
                      : `The X-intercepts are at ${xIntercepts[0]} comma 0 and ${xIntercepts[1]} comma 0. `;
            // There is always a Y intercept. There is no way to make a
            // vertical line with our current implementation.
            const yInterceptString = `The Y-intercept is at 0 comma ${yIntercept}.`;

            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{...baseQuadraticState, coords: points}}
                />,
            );

            // Act
            const quadraticGraph = screen.getByLabelText(overallGraphLabel);

            // Assert
            expect(quadraticGraph).toBeInTheDocument();
            expect(quadraticGraph).toHaveAccessibleDescription(
                `${directionString}${vertexString}${xInterceptsString}${yInterceptString}`,
            );
        },
    );

    test("point labels for default graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseQuadraticState}}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        // Point in quadrant
        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola in quadrant 2 at -5 comma 5. Vertex is on the Y-axis.",
        );
        // Point on axis
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola at 0 comma -5. Vertex is on the Y-axis.",
        );
        // Point in quadrant
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola in quadrant 1 at 5 comma 5. Vertex is on the Y-axis.",
        );
    });

    test("point labels for default graph, vertex on Y-axis", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseQuadraticState}}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        // Point in quadrant 2
        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola in quadrant 2 at -5 comma 5. Vertex is on the Y-axis.",
        );
        // Point on Y-axis
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola at 0 comma -5. Vertex is on the Y-axis.",
        );
        // Point in quadrant 1
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola in quadrant 1 at 5 comma 5. Vertex is on the Y-axis.",
        );
    });

    test("updated points' labels, vertex at the origin", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseQuadraticState,
                    coords: [
                        [-5, -5],
                        [0, 0],
                        [5, -5],
                    ],
                }}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        // Check updated aria-label for the points.
        // Point in quadrant 3
        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola in quadrant 3 at -5 comma -5. Vertex is at the origin.",
        );
        // Point at origin
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola at the origin. Vertex is at the origin.",
        );
        // Point in quadrant 4
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola in quadrant 4 at 5 comma -5. Vertex is at the origin.",
        );
    });

    test("updated points' labels, vertex in quadrant", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseQuadraticState,
                    coords: [
                        [-5, 0],
                        [-1, 5],
                        [2, 0],
                    ],
                }}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        // Check updated aria-label for the points.
        // Point on X-axis
        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola at -5 comma 0. Vertex is in quadrant 2.",
        );
        // Point in quadrant 2
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola in quadrant 2 at -1 comma 5. Vertex is in quadrant 2.",
        );
        // Point on X-axis
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola at 2 comma 0. Vertex is in quadrant 2.",
        );
    });

    test("updated points' labels, horizontal line (no vertex)", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseQuadraticState,
                    coords: [
                        [-5, 1],
                        [0, 1],
                        [5, 1],
                    ],
                }}
            />,
        );

        // Act
        const interactiveElements = screen.getAllByRole("button");
        const [point1, point2, point3] = interactiveElements;

        // Assert
        // Check updated aria-label for the points.
        // Point in quadrant 2
        expect(point1).toHaveAccessibleName(
            "Point 1 on parabola in quadrant 2 at -5 comma 1.",
        );
        // Point on parabola
        expect(point2).toHaveAccessibleName(
            "Point 2 on parabola at 0 comma 1.",
        );
        // Point in quadrant 1
        expect(point3).toHaveAccessibleName(
            "Point 3 on parabola in quadrant 1 at 5 comma 1.",
        );
    });
});

describe("describedQuadraticGraph interactive elements", () => {
    test("describes interactive elements on a default quadratic graph", () => {
        // Arrange

        // Act
        const strings = describeQuadraticGraph(
            baseQuadraticState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srQuadraticInteractiveElements).toBe(
            "Interactive elements: Parabola with points at -5 comma 5, 0 comma -5, and 5 comma 5.",
        );
    });

    test("describes interactive elements on a quadratic graph with updated points", () => {
        // Arrange

        // Act
        const strings = describeQuadraticGraph(
            {
                ...baseQuadraticState,
                coords: [
                    [-1, 2],
                    [3, 4],
                    [5, 5],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srQuadraticInteractiveElements).toBe(
            "Interactive elements: Parabola with points at -1 comma 2, 3 comma 4, and 5 comma 5.",
        );
    });
});

describe("getQuadraticCoefficients", () => {
    it("should accurately calculate coefficients", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [0, -5],
            [4, 5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate coefficients regardless of the provided order", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [4, 5],
            [0, -5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        expect(getQuadraticCoefficients(coords)).toBe(undefined);
    });
});

describe("getQuadraticKeyboardConstraint", () => {
    it("should snap to the snapStep and avoid putting points on a vertical line", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [1, 1],
            [3, 3],
        ];
        const snapStep: vec.Vector2 = [1, 1];

        // We're moving the first point
        const constraint = getQuadraticKeyboardConstraint(coords, snapStep, 0);

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [2, 0], // Avoids putting the point on a vertical line
        });
    });

    it("should avoid vertical alignment even when all points are one snapStep apart", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [1, 1],
            [2, 2],
        ];
        const snapStep: vec.Vector2 = [1, 1];

        // We're moving the first point
        const constraint = getQuadraticKeyboardConstraint(coords, snapStep, 0);

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [3, 0], // Avoids putting the point on a vertical line
        });
    });
});
