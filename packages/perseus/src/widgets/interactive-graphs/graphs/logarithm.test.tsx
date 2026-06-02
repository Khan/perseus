import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getLogarithmKeyboardConstraint} from "./logarithm";

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

    it("renders without crashing when the asymptote sits between the curve points", () => {
        // Arrange, Act — asymptote x=-4.5 sits between points at x=-4 and x=-5.
        // There is no logarithm curve that fits, so the Plot.OfX is skipped.
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLogarithmState,
                    asymptote: -4.5,
                }}
            />,
        );

        // Assert — asymptote + both points still rendered
        expect(
            screen.getByRole("button", {name: /Vertical asymptote/}),
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

// TODO(LEMS-3995, post-PR-7): route the curve SR-tree summaries through buildPointAriaLabel once new locale string keys land.
describe("Logarithm graph pointLabels", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("uses custom pointLabels in each point's accessible name", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseLogarithmState, pointLabels: ["A", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at -4 comma -3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at -5 comma -7."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for indices without a custom label", () => {
        // Arrange, Act — only the first point is named
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseLogarithmState, pointLabels: ["A"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at -4 comma -3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point 2 at -5 comma -7."}),
        ).toBeInTheDocument();
    });

    // The editor encodes "only the second point named" as `["", "B"]`.
    // An empty string at any index must fall back to the default label.
    it("falls back to the default label for explicit empty-string entries", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseLogarithmState, pointLabels: ["", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 1 at -4 comma -3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at -5 comma -7."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLogarithmState,
                    // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
                    pointLabels: [42, "B"] as unknown as string[],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point 1 at -4 comma -3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at -5 comma -7."}),
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

    it("allows moving onto the asymptote line", () => {
        // Arrange — point 0 at (-5, -3), asymptote at x=-6. Moving left used
        // to skip past x=-6; asymptote crossings are now allowed so the
        // point lands on the asymptote line (off the drag handle's y).
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

        // Assert
        expect(constraint.left).toEqual([-6, -3]);
    });

    it("skips the position that would land on the asymptote drag handle", () => {
        // Arrange — handle coord is (asymptote=-4, midY=0). Point 0 at (-4, 1)
        // moving down to (-4, 0) would land on the handle and is skipped;
        // the next step (-4, -1) is valid.
        const onHandleCoords: [vec.Vector2, vec.Vector2] = [
            [-4, 1],
            [-5, -7],
        ];

        // Act
        const constraint = getLogarithmKeyboardConstraint(
            onHandleCoords,
            -4,
            snapStep,
            0,
            range,
        );

        // Assert
        expect(constraint.down).toEqual([-4, -1]);
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

        // Assert — skips x=-5 (same x as point 1) and lands on x=-6
        expect(constraint.left).toEqual([-6, -3]);
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

        // Assert — no valid right move, falls back to original position
        expect(constraint.right).toEqual([9, 3]);
    });
});
