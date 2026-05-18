import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    getAbsoluteValueCoefficients,
    getAbsoluteValueKeyboardConstraint,
} from "./absolute-value";

import type {InteractiveGraphState} from "../types";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseAbsoluteValueState: InteractiveGraphState = {
    type: "absolute-value",
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

describe("getAbsoluteValueCoefficients", () => {
    it("returns correct coefficients for a basic upward V", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [0, 0],
            [2, 2],
        ]);
        expect(coeffs).toEqual({m: 1, h: 0, v: 0});
    });

    it("returns correct coefficients for a downward V", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [1, 3],
            [3, 1],
        ]);
        expect(coeffs).toEqual({m: -1, h: 1, v: 3});
    });

    it("returns correct coefficients for a steeper slope", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [0, 0],
            [1, 2],
        ]);
        expect(coeffs).toEqual({m: 2, h: 0, v: 0});
    });

    it("returns correct coefficients when vertex is not at origin", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [1, 3],
            [2, 5],
        ]);
        expect(coeffs).toEqual({m: 2, h: 1, v: 3});
    });

    it("returns undefined when both points share the same x-coordinate", () => {
        const coeffs = getAbsoluteValueCoefficients([
            [2, 0],
            [2, 4],
        ]);
        expect(coeffs).toBeUndefined();
    });

    it("treats left-arm and right-arm points as equivalent (same slope magnitude)", () => {
        const rightArm = getAbsoluteValueCoefficients([
            [0, 0],
            [2, 2],
        ]);
        const leftArm = getAbsoluteValueCoefficients([
            [0, 0],
            [-2, 2],
        ]);
        expect(rightArm?.m).toBe(leftArm?.m);
    });
});

describe("getAbsoluteValueKeyboardConstraint", () => {
    it("returns standard directions when no same-x conflict", () => {
        const coords: [number, number][] = [
            [0, 0],
            [2, 2],
        ];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            [1, 1],
            0,
        );
        expect(constraint.right).toEqual([1, 0]);
        expect(constraint.left).toEqual([-1, 0]);
        expect(constraint.up).toEqual([0, 1]);
        expect(constraint.down).toEqual([0, -1]);
    });

    it("skips over same-x position when moving left", () => {
        // Moving point 0 from x=3 left toward x=2 (where point 1 is)
        const coords: [number, number][] = [
            [3, 0],
            [2, 2],
        ];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            [1, 1],
            0,
        );
        // left one step would be [2, 0] — same x as point 1 — so skip to [1, 0]
        expect(constraint.left).toEqual([1, 0]);
    });

    it("skips over same-x position when moving right", () => {
        // Moving point 0 from x=1 right toward x=2 (where point 1 is)
        const coords: [number, number][] = [
            [1, 0],
            [2, 2],
        ];
        const constraint = getAbsoluteValueKeyboardConstraint(
            coords,
            [1, 1],
            0,
        );
        // right one step would be [2, 0] — same x as point 1 — so skip to [3, 0]
        expect(constraint.right).toEqual([3, 0]);
    });
});

describe("Absolute value graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders with aria label for the graph", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const graph = screen.getByLabelText(
            "An absolute value function on a coordinate plane.",
        );
        expect(graph).toBeInTheDocument();
    });

    it("renders with accessible description containing vertex and slope", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const graph = screen.getByLabelText(
            "An absolute value function on a coordinate plane.",
        );
        expect(graph).toHaveAccessibleDescription(
            "The graph shows an absolute value function with vertex at 0 comma 0 and slope 1.",
        );
    });

    it("renders vertex point with aria label", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const points = screen.getAllByRole("button");
        expect(points[0]).toHaveAccessibleName("Vertex point at 0 comma 0.");
    });

    it("renders arm point with aria label", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const points = screen.getAllByRole("button");
        expect(points[1]).toHaveAccessibleName("Point on arm at 2 comma 2.");
    });

    it("includes interactive elements description with both point coordinates", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseAbsoluteValueState}
            />,
        );
        const description = screen.getByText(
            "Interactive elements: Absolute value graph with vertex point at 0 comma 0 and arm point at 2 comma 2.",
        );
        expect(description).toBeInTheDocument();
    });

    it("updates aria labels when coordinates change", () => {
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseAbsoluteValueState,
                    coords: [
                        [1, 3],
                        [3, 5],
                    ],
                }}
            />,
        );
        const points = screen.getAllByRole("button");
        expect(points[0]).toHaveAccessibleName("Vertex point at 1 comma 3.");
        expect(points[1]).toHaveAccessibleName("Point on arm at 3 comma 5.");
    });
});
