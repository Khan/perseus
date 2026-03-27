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

    it("moves point up by one snap step when valid", () => {
        // Arrange, Act
        const constraint = getLogarithmKeyboardConstraint(
            coords,
            asymptote,
            snapStep,
            0,
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
        );

        // Assert — skips x=-5 (same x as point 1) and x=-6 (asymptote), lands on x=-7
        expect(constraint.left).toEqual([-7, -3]);
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
