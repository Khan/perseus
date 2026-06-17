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
            screen.getByRole("button", {
                name: "Point 1 on an exponential curve at 0 comma 3.",
            }),
        ).toBeInTheDocument();
    });

    it("labels point 2 with its coordinates", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 2 on an exponential curve at 1 comma 6.",
            }),
        ).toBeInTheDocument();
    });

    it("labels the asymptote with its y-value", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Horizontal asymptote at y equals 1",
            }),
        ).toBeInTheDocument();
    });

    it("describes the curve's behavior, asymptote, and intercepts", () => {
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
            "The curve passes through 0 comma 3 and 1 comma 6 as the curve approaches y equals 1 from the right and extends to negative infinity. The curve lies above the asymptote. The y-intercept is at 0 comma 3.",
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
            "The curve passes through -2 comma 4 and 2 comma 8 as the curve approaches y equals 1 from the right and extends to negative infinity. The curve lies above the asymptote. The y-intercept is at 0 comma 5.583.",
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
            "The curve passes through 0 comma 3 and 1 comma 6 as the curve approaches y equals -3 from the right and extends to negative infinity. The curve lies above the asymptote. The x-intercept is at -1.71 comma 0. The y-intercept is at 0 comma 3.",
        );
    });

    it("describes a curve that approaches from the left and lies below the asymptote", () => {
        // Arrange, Act — decreasing curve (b < 0) sitting below the
        // asymptote (a < 0). Exercises the LeftPos directional variant and
        // the "below" clause.
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    coords: [
                        [0, -2],
                        [2, -0.5],
                    ],
                    asymptote: 0,
                }}
            />,
        );

        // Assert
        expect(
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "The curve passes through 0 comma -2 and 2 comma -0.5 as the curve approaches y equals 0 from the left and extends to positive infinity. The curve lies below the asymptote. The y-intercept is at 0 comma -2.",
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

        // Assert — asymptote still rendered, and the points drop the
        // "on an exponential curve" phrasing since no curve is plotted.
        expect(
            screen.getByRole("button", {name: /Horizontal asymptote/}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point 1 at 0 comma 3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point 2 at 1 comma 6."}),
        ).toBeInTheDocument();
    });

    it("describes the no-curve case when the asymptote sits between the points", () => {
        // Arrange, Act — asymptote y=4 falls between points at y=3 and y=6,
        // so no exponential fits and nothing is plotted.
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

        // Assert
        expect(
            screen.getByLabelText(
                "An exponential curve on a coordinate plane.",
            ),
        ).toHaveAccessibleDescription(
            "No exponential curve can be drawn through 0 comma 3 and 1 comma 6 with a horizontal asymptote at y equals 4. Move both points to the same side of the asymptote to draw the curve.",
        );
    });

    it("describes the interactive elements for the graph", () => {
        // Arrange, Act
        render(
            <MafsGraph {...baseMafsGraphProps} state={baseExponentialState} />,
        );

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Exponential graph with points at 0 comma 3, 1 comma 6, and a horizontal asymptote at y equals 1.",
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
                "Interactive elements: Exponential graph with points at 3 comma 5, 4 comma 7, and a horizontal asymptote at y equals 2.",
            ),
        ).toBeInTheDocument();
    });
});

// TODO(LEMS-3995, post-PR-7): route the curve SR-tree summaries through buildPointAriaLabel once new locale string keys land.
describe("Exponential graph pointLabels", () => {
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
                state={{...baseExponentialState, pointLabels: ["A", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at 0 comma 3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 1 comma 6."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for indices without a custom label", () => {
        // Arrange, Act — only the first point is named
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseExponentialState, pointLabels: ["A"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at 0 comma 3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Point 2 on an exponential curve at 1 comma 6.",
            }),
        ).toBeInTheDocument();
    });

    // The editor encodes "only the second point named" as `["", "B"]`.
    // An empty string at any index must fall back to the default label.
    it("falls back to the default label for explicit empty-string entries", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseExponentialState, pointLabels: ["", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 1 on an exponential curve at 0 comma 3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 1 comma 6."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseExponentialState,
                    // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
                    pointLabels: [42, "B"] as unknown as string[],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 1 on an exponential curve at 0 comma 3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 1 comma 6."}),
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

    it("walks past an x-collision with the other point when moving right", () => {
        // Point 0 is at (8, 3) and the other point at (9, 6). Moving
        // right by one step would put both points at x=9, which
        // exponential graphs don't allow, so the move skips ahead to
        // x=10 — the right edge, which is fine.
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

        // Assert — walks past x=9 and lands at x=10 (graph edge)
        expect(constraint.right).toEqual([10, 3]);
    });
});
