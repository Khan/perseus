import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    computeAbsoluteValue,
    getAbsoluteValueCoefficients,
    getAbsoluteValueKeyboardConstraint,
} from "./absolute-value";

import type {AbsoluteValueGraphState, InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseAbsoluteValueState: InteractiveGraphState = {
    type: "absolute_value",
    // vertex at (0, 0), second point at (2, 2) → m=1, h=0, k=0
    coords: [
        [0, 0],
        [2, 2],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("Absolute value graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have aria label for the graph container", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "An absolute value function on a coordinate plane.",
            ),
        ).toBeInTheDocument();
    });

    it("should have accessible description for the graph", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const graph = screen.getByLabelText(
            "An absolute value function on a coordinate plane.",
        );

        // Assert
        expect(graph).toHaveAccessibleDescription(
            "The graph shows a V-shaped absolute value function with vertex at 0, 0 and slope 1.",
        );
    });

    it("should have accessible description reflecting updated coords", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseAbsoluteValueState,
                    // vertex at (1, 3), second point at (3, 1) → m=-1
                    coords: [
                        [1, 3],
                        [3, 1],
                    ],
                }}
            />,
        );
        const graph = screen.getByLabelText(
            "An absolute value function on a coordinate plane.",
        );

        // Assert
        expect(graph).toHaveAccessibleDescription(
            "The graph shows a V-shaped absolute value function with vertex at 1, 3 and slope -1.",
        );
    });

    it("should have aria labels for the vertex point and the second point", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );

        // Act
        const [vertex, second] = screen.getAllByRole("button");

        // Assert
        expect(vertex).toHaveAccessibleName("Vertex point at 0 comma 0.");
        expect(second).toHaveAccessibleName("Second point at 2 comma 2.");
    });

    it("should have aria labels for points reflecting updated coords", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseAbsoluteValueState,
                    coords: [
                        [-3, 5],
                        [1, 1],
                    ],
                }}
            />,
        );

        // Act
        const [vertex, second] = screen.getAllByRole("button");

        // Assert
        expect(vertex).toHaveAccessibleName("Vertex point at -3 comma 5.");
        expect(second).toHaveAccessibleName("Second point at 1 comma 1.");
    });

    it("should include interactive elements description in the overall graph", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );

        // Act, Assert
        expect(
            screen.getByText(
                "Interactive elements: Absolute value graph with vertex point at 0 comma 0 and second point at 2 comma 2.",
            ),
        ).toBeInTheDocument();
    });
});

describe("getAbsoluteValueCoefficients", () => {
    it("computes correct coefficients for an upward-opening V", () => {
        // vertex at origin, second point above-right → m=1
        const coords: AbsoluteValueGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];
        expect(getAbsoluteValueCoefficients(coords)).toEqual({
            m: 1,
            h: 0,
            k: 0,
        });
    });

    it("computes correct coefficients for a downward-opening V", () => {
        // vertex at (1, 3), second point lower-right → m=-1
        const coords: AbsoluteValueGraphState["coords"] = [
            [1, 3],
            [3, 1],
        ];
        expect(getAbsoluteValueCoefficients(coords)).toEqual({
            m: -1,
            h: 1,
            k: 3,
        });
    });

    it("computes correct coefficients when second point is to the left of the vertex", () => {
        // vertex at (2, 0), second point to the left → |x2 - h| = 2, m = 4/2 = 2
        const coords: AbsoluteValueGraphState["coords"] = [
            [2, 0],
            [0, 4],
        ];
        expect(getAbsoluteValueCoefficients(coords)).toEqual({
            m: 2,
            h: 2,
            k: 0,
        });
    });

    it("returns undefined when both points share the same x-coordinate", () => {
        const coords: AbsoluteValueGraphState["coords"] = [
            [3, 0],
            [3, 5],
        ];
        expect(getAbsoluteValueCoefficients(coords)).toBeUndefined();
    });
});

describe("computeAbsoluteValue", () => {
    it("evaluates f(x) = 1 * |x - 0| + 0 correctly", () => {
        const coeffs = {m: 1, h: 0, k: 0};
        expect(computeAbsoluteValue(3, coeffs)).toBe(3);
        expect(computeAbsoluteValue(-3, coeffs)).toBe(3);
        expect(computeAbsoluteValue(0, coeffs)).toBe(0);
    });

    it("evaluates f(x) = -1 * |x - 1| + 3 correctly", () => {
        const coeffs = {m: -1, h: 1, k: 3};
        // At vertex: f(1) = -1 * 0 + 3 = 3
        expect(computeAbsoluteValue(1, coeffs)).toBe(3);
        // f(3) = -1 * |3 - 1| + 3 = -2 + 3 = 1
        expect(computeAbsoluteValue(3, coeffs)).toBe(1);
        // f(-1) = -1 * |-1 - 1| + 3 = -2 + 3 = 1
        expect(computeAbsoluteValue(-1, coeffs)).toBe(1);
    });
});

describe("getAbsoluteValueKeyboardConstraint", () => {
    it("allows normal movement when points won't overlap on the same x", () => {
        const coords: AbsoluteValueGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];
        const snapStep: vec.Vector2 = [1, 1];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            snapStep,
            0,
        );

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [1, 0],
        });
    });

    it("skips the position that would place both points on the same x", () => {
        // coords[0] is at x=1, coords[1] is at x=2; moving right once would
        // land coords[0] at x=2, which is forbidden — it should skip to x=3.
        const coords: AbsoluteValueGraphState["coords"] = [
            [1, 0],
            [2, 2],
        ];
        const snapStep: vec.Vector2 = [1, 1];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            snapStep,
            0,
        );

        expect(constraint.right).toEqual([3, 0]); // skipped x=2
    });

    it("skips the position when moving left would cause overlap", () => {
        // coords[0] is at x=3, coords[1] is at x=2; moving left once would
        // land coords[0] at x=2, which is forbidden — it should skip to x=1.
        const coords: AbsoluteValueGraphState["coords"] = [
            [3, 0],
            [2, 2],
        ];
        const snapStep: vec.Vector2 = [1, 1];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            snapStep,
            0,
        );

        expect(constraint.left).toEqual([1, 0]); // skipped x=2
    });
});
