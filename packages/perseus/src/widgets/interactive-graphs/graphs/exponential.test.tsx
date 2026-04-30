import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getExponentialKeyboardConstraint} from "./exponential";

import type {InteractiveGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

// Curve above asymptote: f(0)=3, f(1)=6, asymptote y=1
const baseExponentialState: InteractiveGraphState = {
    type: "exponential",
    coords: [
        [0, 3],
        [1, 6],
    ],
    asymptote: 1,
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
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
        ).toBeInTheDocument();
    });

    it("labels point 1 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 1 at 0 comma 3."}),
        ).toBeInTheDocument();
    });

    it("labels point 2 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 2 at 1 comma 6."}),
        ).toBeInTheDocument();
    });

    it("labels the asymptote with its y-value and keyboard instructions", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
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
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
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
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
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
                    asymptote: -3,
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "The graph shows an exponential curve passing through point 0 comma 3 and point 1 comma 6 with a horizontal asymptote at y equals -3.",
        );
    });

    it("renders without crashing when the asymptote sits between the curve points", () => {
        // Arrange, Act — asymptote y=4 sits between points at y=3 and y=6.
        // There is no exponential curve that fits, so the Plot.OfX is skipped.
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    coords: [
                        [0, 3],
                        [1, 6],
                    ],
                    asymptote: 4,
                }}
            />,
        );

        // Assert — asymptote + both points still rendered
        expect(
            screen.getByRole("button", {name: /Horizontal asymptote/}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: /Point 1/}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: /Point 2/}),
        ).toBeInTheDocument();
    });

    it("describes the interactive elements for the graph", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
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
                    asymptote: 2,
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
    const asymptote = 1;
    const snapStep: vec.Vector2 = [1, 1];
    const range: [vec.Vector2, vec.Vector2] = [
        [-10, 10],
        [-10, 10],
    ];

    it("moves point up by one snap step when valid", () => {
        // Arrange, Act
        const constraint = getExponentialKeyboardConstraint(
            coords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.up).toEqual([0, 4]);
    });

    it("allows moving down onto the asymptote line", () => {
        // Arrange — point 0 at (-1, 2), asymptote at y=1. Moving down used
        // to skip past y=1; asymptote crossings are now allowed so the
        // point lands on the asymptote line (off the drag handle's x).
        const nearAsymptoteCoords: [vec.Vector2, vec.Vector2] = [
            [-1, 2],
            [2, 6],
        ];

        // Act
        const constraint = getExponentialKeyboardConstraint(
            nearAsymptoteCoords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.down).toEqual([-1, 1]);
    });

    it("skips the position that would land on the asymptote drag handle", () => {
        // Arrange — handle coord is (midX=0, asymptote=2). Point 0 at (0, 3)
        // moving down to (0, 2) would land on the handle and is skipped;
        // the next step (0, 1) is valid.
        const onHandleCoords: [vec.Vector2, vec.Vector2] = [
            [0, 3],
            [2, 6],
        ];

        // Act
        const constraint = getExponentialKeyboardConstraint(
            onHandleCoords,
            2,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.down).toEqual([0, 1]);
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
            range,
        );

        // Assert — skips x=2 and lands on x=3
        expect(constraint.right).toEqual([3, 3]);
    });

    it("rejects positions where the clamped coord collides with the other point's x", () => {
        // Arrange — point 0 at x=8, point 1 at x=9 (graph edge).
        // Moving right: x=9 shares x with point 1, x=10 clamps to 9.
        // No valid right move — falls back to original position.
        const edgeCoords: [vec.Vector2, vec.Vector2] = [
            [8, 3],
            [9, 6],
        ];

        // Act
        const constraint = getExponentialKeyboardConstraint(
            edgeCoords,
            asymptote,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.right).toEqual([8, 3]);
    });
});
