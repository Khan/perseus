import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    constrainAsymptoteKeyboard,
    getExponentialKeyboardConstraint,
} from "./exponential";

import type {ExponentialGraphState, InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

// Curve above asymptote: f(0)=3, f(1)=6, asymptote y=1
const baseExponentialState: InteractiveGraphState = {
    type: "exponential",
    coords: [
        [0, 3],
        [1, 6],
    ],
    asymptote: [
        [-10, 1],
        [10, 1],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("Exponential graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("has the correct aria-label on the graph element", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText("An exponential curve on a coordinate plane."),
        ).toBeInTheDocument();
    });

    it("labels point 1 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 1 at 0 comma 3."}),
        ).toBeInTheDocument();
    });

    it("labels point 2 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 2 at 1 comma 6."}),
        ).toBeInTheDocument();
    });

    it("labels the asymptote with its y-value and keyboard instructions", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Horizontal asymptote at y equals 1. Use up and down arrow keys to move.",
            }),
        ).toBeInTheDocument();
    });

    it("describes the graph with point positions and asymptote", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText("An exponential curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The graph shows an exponential curve passing through point 0 comma 3 and point 1 comma 6 with a horizontal asymptote at y equals 1.",
        );
    });

    it("updates the graph description when point positions change", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    coords: [
                        [-2, 4],
                        [2, 8],
                    ],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText("An exponential curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The graph shows an exponential curve passing through point -2 comma 4 and point 2 comma 8 with a horizontal asymptote at y equals 1.",
        );
    });

    it("updates the graph description when the asymptote changes", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    asymptote: [
                        [-10, -3],
                        [10, -3],
                    ],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText("An exponential curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The graph shows an exponential curve passing through point 0 comma 3 and point 1 comma 6 with a horizontal asymptote at y equals -3.",
        );
    });

    it("describes the interactive elements for the graph", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={baseExponentialState}
            />,
        );

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Exponential graph with point 1 at 0 comma 3, point 2 at 1 comma 6, and horizontal asymptote at y equals 1.",
            ),
        ).toBeInTheDocument();
    });

    it("updates the interactive elements description when state changes", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    coords: [
                        [3, 5],
                        [4, 7],
                    ],
                    asymptote: [
                        [-10, 2],
                        [10, 2],
                    ],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Exponential graph with point 1 at 3 comma 5, point 2 at 4 comma 7, and horizontal asymptote at y equals 2.",
            ),
        ).toBeInTheDocument();
    });
});

describe("getExponentialKeyboardConstraint", () => {
    const coords: [vec.Vector2, vec.Vector2] = [
        [0, 3],
        [2, 6],
    ];
    const asymptote: [vec.Vector2, vec.Vector2] = [
        [-10, 1],
        [10, 1],
    ];
    const snapStep: vec.Vector2 = [1, 1];

    it("moves point up by one snap step when valid", () => {
        // Arrange, Act
        const constraint = getExponentialKeyboardConstraint(
            coords,
            asymptote,
            snapStep,
            0,
        );

        // Assert
        expect(constraint.up).toEqual([0, 4]);
    });

    it("skips positions on the asymptote when moving down", () => {
        // Arrange — point at y=2, asymptote at y=1: moving down would hit y=1 then y=0
        const nearAsymptoteCoords: [vec.Vector2, vec.Vector2] = [
            [0, 2],
            [2, 6],
        ];

        // Act
        const constraint = getExponentialKeyboardConstraint(
            nearAsymptoteCoords,
            asymptote,
            snapStep,
            0,
        );

        // Assert — skips y=1 (asymptote) and lands on y=0
        expect(constraint.down).toEqual([0, 0]);
    });

    it("skips positions that share x-coordinate with the other point when moving right", () => {
        // Arrange — point 0 at x=1, moving right would hit x=2 which is point 1's x
        const alignedCoords: [vec.Vector2, vec.Vector2] = [
            [1, 3],
            [2, 6],
        ];

        // Act
        const constraint = getExponentialKeyboardConstraint(
            alignedCoords,
            asymptote,
            snapStep,
            0,
        );

        // Assert — skips x=2 and lands on x=3
        expect(constraint.right).toEqual([3, 3]);
    });
});

describe("constrainAsymptoteKeyboard", () => {
    const snapStep: vec.Vector2 = [1, 1];

    it("allows the asymptote to move freely when not between or on the curve points", () => {
        // Arrange — points at y=3 and y=6, asymptote moving to y=1 (below both)
        const coords: [vec.Vector2, vec.Vector2] = [
            [0, 3],
            [2, 6],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([0, 1], coords, snapStep);

        // Assert — y=1 is valid (below both points)
        expect(result).toEqual([0, 1]);
    });

    it("snaps the asymptote below both points when it would land between them", () => {
        // Arrange — points at y=2 and y=6, asymptote trying to land at y=4 (between)
        const coords: [vec.Vector2, vec.Vector2] = [
            [0, 2],
            [2, 6],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([0, 4], coords, snapStep);

        // Assert — snapped to one step below the lower point (y=2-1=1) or above upper (y=6+1=7)
        expect(result[1] < 2 || result[1] > 6).toBe(true);
    });

    it("skips a y-value exactly equal to a curve point", () => {
        // Arrange — points at y=2 and y=6, asymptote trying to land exactly at y=2
        const coords: [vec.Vector2, vec.Vector2] = [
            [0, 2],
            [2, 6],
        ];

        // Act
        const result = constrainAsymptoteKeyboard([0, 2], coords, snapStep);

        // Assert — must not land exactly on y=2
        expect(result[1]).not.toBe(2);
    });
});
