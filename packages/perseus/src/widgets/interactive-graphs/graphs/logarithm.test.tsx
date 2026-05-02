import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    constrainAsymptoteKeyboard,
    getLogarithmKeyboardConstraint,
} from "./logarithm";

import type {InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

// Curve right of asymptote: f(-4)=-3, f(-5)=-7, asymptote x=-6
const baseLogarithmState: InteractiveGraphState = {
    type: "logarithm",
    coords: [
        [-4, -3],
        [-5, -7],
    ],
    asymptote: -6,
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("Logarithm graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("has the correct aria-label on the graph element", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "A logarithm function on a coordinate plane.",
            ),
        ).toBeInTheDocument();
    });

    it("labels point 1 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 1 at -4 comma -3."}),
        ).toBeInTheDocument();
    });

    it("labels point 2 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 2 at -5 comma -7."}),
        ).toBeInTheDocument();
    });

    it("labels the asymptote with its x-value and keyboard instructions", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Vertical asymptote at x equals -6. Use left and right arrow keys to move.",
            }),
        ).toBeInTheDocument();
    });

    it("describes the graph with point positions and asymptote", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "A logarithm function on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "The graph shows a logarithm curve passing through point -4 comma -3 and point -5 comma -7 with a vertical asymptote at x equals -6.",
        );
    });

    it("updates the graph description when point positions change", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLogarithmState,
                    coords: [
                        [-2, 4],
                        [-3, 2],
                    ],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "A logarithm function on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "The graph shows a logarithm curve passing through point -2 comma 4 and point -3 comma 2 with a vertical asymptote at x equals -6.",
        );
    });

    it("updates the graph description when the asymptote changes", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLogarithmState,
                    asymptote: -8,
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "A logarithm function on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "The graph shows a logarithm curve passing through point -4 comma -3 and point -5 comma -7 with a vertical asymptote at x equals -8.",
        );
    });

    it("describes the interactive elements for the graph", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseLogarithmState} />,
        );

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Logarithm graph with point 1 at -4 comma -3, point 2 at -5 comma -7, and vertical asymptote at x equals -6.",
            ),
        ).toBeInTheDocument();
    });

    it("updates the interactive elements description when state changes", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLogarithmState,
                    coords: [
                        [3, 5],
                        [4, 7],
                    ],
                    asymptote: 2,
                }}
            />,
        );

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Logarithm graph with point 1 at 3 comma 5, point 2 at 4 comma 7, and vertical asymptote at x equals 2.",
            ),
        ).toBeInTheDocument();
    });
});

describe("getLogarithmKeyboardConstraint", () => {
    const coords: [vec.Vector2, vec.Vector2] = [
        [-4, -3],
        [-5, -7],
    ];
    const asymptote = -6;
    const snapStep: vec.Vector2 = [1, 1];
    const range: [vec.Vector2, vec.Vector2] = [
        [-10, 10],
        [-10, 10],
    ];

    it("moves point up by one snap step when valid", () => {
        // Arrange, Act
        const constraint = getLogarithmKeyboardConstraint(
            coords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.up).toEqual([-4, -2]);
    });

    it("skips positions on the asymptote when moving left", () => {
        // Arrange — point at x=-5, asymptote at x=-6: moving left would hit x=-6 then x=-7
        const nearAsymptoteCoords: [vec.Vector2, vec.Vector2] = [
            [-5, -3],
            [-4, -7],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            nearAsymptoteCoords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert — skips x=-6 (asymptote) and lands on x=-7
        expect(constraint.left).toEqual([-7, -3]);
    });

    it("skips positions that share y-coordinate with the other point when moving down", () => {
        // Arrange — point 0 at y=-6, moving down would hit y=-7 which is point 1's y
        const alignedCoords: [vec.Vector2, vec.Vector2] = [
            [-4, -6],
            [-5, -7],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            alignedCoords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert — skips y=-7 and lands on y=-8
        expect(constraint.down).toEqual([-4, -8]);
    });

    it("skips positions that share x-coordinate with the other point when moving left", () => {
        // Arrange — point 0 at x=-4, moving left would hit x=-5 which is point 1's x
        const coords: [vec.Vector2, vec.Vector2] = [
            [-4, -3],
            [-5, -7],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            coords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert — skips x=-5 (same x as point 1), x=-6 (asymptote),
        // and x=-7 (reflected other point would collide), lands on x=-8
        expect(constraint.left).toEqual([-8, -3]);
    });

    it("stays put when all rightward positions would cause a y-collision", () => {
        // Both points start at y=3. Logarithm graphs need their two
        // points at different y values, and moving right doesn't
        // change y — so no rightward step works, and point 0 doesn't
        // move.
        const edgeCoords: [vec.Vector2, vec.Vector2] = [
            [5, 3],
            [6, 3],
        ];
        const edgeRange: [vec.Vector2, vec.Vector2] = [
            [-10, 10],
            [-10, 10],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            edgeCoords,
            -5,
            snapStep,
            0,
            edgeRange,
        );

        // Assert — no valid right move, falls back to original position
        expect(constraint.right).toEqual([5, 3]);
    });

    it("walks past the other point's x when moving right to find a valid position", () => {
        // The other point is at (10, 1), and point 0 is at (8, 3).
        // Moving point 0 right by one step lands it at (9, 3), which
        // doesn't conflict with the other point or the asymptote.
        const edgeCoords: [vec.Vector2, vec.Vector2] = [
            [8, 3],
            [10, 1],
        ];
        const edgeRange: [vec.Vector2, vec.Vector2] = [
            [-10, 10],
            [-10, 10],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            edgeCoords,
            -5,
            snapStep,
            0,
            edgeRange,
        );

        // Assert — lands at x=9 (first valid position short of otherPoint at x=10)
        expect(constraint.right).toEqual([9, 3]);
    });

    it("refuses to move right when the other point sits at the right edge", () => {
        // The other point is sitting at the right edge, and point 0
        // is one step inside. Moving right would either land on the
        // other point's x or clamp to it — there's nowhere valid to
        // go, so point 0 stays put.
        const edgeCoords: [vec.Vector2, vec.Vector2] = [
            [9, 3],
            [10, 1],
        ];
        const edgeRange: [vec.Vector2, vec.Vector2] = [
            [-10, 10],
            [-10, 10],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            edgeCoords,
            -5,
            snapStep,
            0,
            edgeRange,
        );

        // Assert — no valid right move, falls back to original position
        expect(constraint.right).toEqual([9, 3]);
    });
});

describe("constrainAsymptoteKeyboard", () => {
    const snapStep: vec.Vector2 = [1, 1];

    it("allows the asymptote to move freely when not between or on the curve points", () => {
        // Arrange — points at x=-4 and x=-5, asymptote moving to x=-7 (left of both)
        const coords: [vec.Vector2, vec.Vector2] = [
            [-4, -3],
            [-5, -7],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([-7, 0], coords, snapStep);

        // Assert — x=-7 is valid (left of both points)
        expect(result).toEqual([-7, 0]);
    });

    it("snaps the asymptote past both points when it would land between them", () => {
        // Arrange — points at x=-4 and x=-2, asymptote trying to land at x=-3 (between)
        const coords: [vec.Vector2, vec.Vector2] = [
            [-4, -3],
            [-2, -7],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([-3, 0], coords, snapStep);

        // Assert — snapped to one step past the points
        expect(result[0] < -4 || result[0] > -2).toBe(true);
    });

    it("skips an x-value exactly equal to a curve point", () => {
        // Arrange — points at x=-4 and x=-2, asymptote trying to land exactly at x=-4
        const coords: [vec.Vector2, vec.Vector2] = [
            [-4, -3],
            [-2, -7],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([-4, 0], coords, snapStep);

        // Assert — must not land exactly on x=-4
        expect(result[0]).not.toBe(-4);
    });
});
