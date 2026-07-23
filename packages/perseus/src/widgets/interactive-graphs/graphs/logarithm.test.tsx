import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {getLogarithmKeyboardConstraint} from "./logarithm";

import type {LogarithmGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

// Curve right of asymptote: f(-4)=-3, f(-5)=-7, asymptote x=-6
const baseLogarithmState: LogarithmGraphState = {
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

function renderLogarithmGraph(overrides?: Partial<LogarithmGraphState>) {
    return render(
        <MafsGraph
            {...baseMafsGraphProps}
            state={{...baseLogarithmState, ...overrides}}
        />,
    );
}

describe("Logarithm graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("has the correct aria-label on the graph element", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toBeInTheDocument();
    });

    it("labels point 1 with its coordinates", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 1 on a logarithmic curve at -4 comma -3.",
            }),
        ).toBeInTheDocument();
    });

    it("labels point 2 with its coordinates", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 2 on a logarithmic curve at -5 comma -7.",
            }),
        ).toBeInTheDocument();
    });

    it("labels the asymptote with its x-value", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Vertical asymptote at x equals -6.",
            }),
        ).toBeInTheDocument();
    });

    it("describes the curve's behavior, asymptote, and intercepts", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through -4 comma -3 and -5 comma -7 as the curve approaches x equals -6 from the right and extends to negative infinity. The curve is to the right of the asymptote. The x-intercept is at -2.636 comma 0. The y-intercept is at 0 comma 3.34.",
        );
    });

    it("updates the graph description when point positions change", () => {
        // Arrange, Act
        renderLogarithmGraph({
            coords: [
                [-2, 4],
                [-3, 2],
            ],
        });

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through -2 comma 4 and -3 comma 2 as the curve approaches x equals -6 from the right and extends to negative infinity. The curve is to the right of the asymptote. The x-intercept is at -3.75 comma 0. The y-intercept is at 0 comma 6.819.",
        );
    });

    it("updates the graph description when the asymptote changes", () => {
        // Arrange, Act
        renderLogarithmGraph({asymptote: -8});

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through -4 comma -3 and -5 comma -7 as the curve approaches x equals -8 from the right and extends to negative infinity. The curve is to the right of the asymptote. The x-intercept is at -3.037 comma 0. The y-intercept is at 0 comma 6.638.",
        );
    });

    it("describes a curve to the left of the asymptote with both intercepts", () => {
        // Arrange, Act — points left of the asymptote (b < 0) with an
        // increasing curve (a > 0). Exercises the LeftNeg directional variant
        // and the "to the left" clause; the asymptote at x=3 keeps x=0 in the
        // domain so a y-intercept exists.
        renderLogarithmGraph({
            coords: [
                [0, 2],
                [2, -1],
            ],
            asymptote: 3,
        });

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through 0 comma 2 and 2 comma -1 as the curve approaches x equals 3 from the left and extends to negative infinity. The curve is to the left of the asymptote. The x-intercept is at 1.558 comma 0. The y-intercept is at 0 comma 2.",
        );
    });

    it("describes a curve to the right that extends to positive infinity with no y-intercept", () => {
        // Arrange, Act — points right of the asymptote (b > 0) with a
        // decreasing curve (a < 0). Exercises the RightPos directional variant.
        // The asymptote at x=0 puts x=0 on the boundary, so there is no
        // y-intercept and only the x-intercept is described.
        renderLogarithmGraph({
            coords: [
                [1, 3],
                [5, -2],
            ],
            asymptote: 0,
        });

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through 1 comma 3 and 5 comma -2 as the curve approaches x equals 0 from the right and extends to positive infinity. The curve is to the right of the asymptote. The x-intercept is at 2.627 comma 0.",
        );
    });

    it("describes a curve to the left that extends to positive infinity", () => {
        // Arrange, Act — points left of the asymptote (b < 0) with a
        // decreasing curve (a < 0). Exercises the LeftPos directional variant.
        renderLogarithmGraph({
            coords: [
                [-1, 3],
                [-5, -2],
            ],
            asymptote: 0,
        });

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "The curve passes through -1 comma 3 and -5 comma -2 as the curve approaches x equals 0 from the left and extends to positive infinity. The curve is to the left of the asymptote. The x-intercept is at -2.627 comma 0.",
        );
    });

    it("renders without crashing when the asymptote sits between the curve points", () => {
        // Arrange, Act — asymptote x=-4.5 sits between points at x=-4 and x=-5.
        // There is no logarithm curve that fits, so the Plot.OfX is skipped.
        renderLogarithmGraph({asymptote: -4.5});

        // Assert — asymptote still rendered, and the points drop the
        // "on a logarithmic curve" phrasing since no curve is plotted.
        expect(
            screen.getByRole("button", {name: /Vertical asymptote/}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point 1 at -4 comma -3."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point 2 at -5 comma -7."}),
        ).toBeInTheDocument();
    });

    it("describes the no-curve case when the asymptote sits between the points", () => {
        // Arrange, Act — asymptote x=-4.5 falls between points at x=-4 and
        // x=-5, so no logarithm fits and nothing is plotted.
        renderLogarithmGraph({asymptote: -4.5});

        // Assert
        expect(
            screen.getByLabelText("A logarithmic curve on a coordinate plane."),
        ).toHaveAccessibleDescription(
            "No curve can be drawn through -4 comma -3 and -5 comma -7 with a vertical asymptote at x equals -4.5. Move both points to the same side of the asymptote to draw the curve.",
        );
    });

    it("describes the interactive elements for the graph", () => {
        // Arrange, Act
        renderLogarithmGraph();

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Logarithmic graph with points at -4 comma -3, -5 comma -7, and a vertical asymptote at x equals -6.",
            ),
        ).toBeInTheDocument();
    });

    it("updates the interactive elements description when state changes", () => {
        // Arrange, Act
        renderLogarithmGraph({
            coords: [
                [3, 5],
                [4, 7],
            ],
            asymptote: 2,
        });

        // Assert
        expect(
            screen.getByText(
                "Interactive elements: Logarithmic graph with points at 3 comma 5, 4 comma 7, and a vertical asymptote at x equals 2.",
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
        renderLogarithmGraph({pointLabels: ["A", "B"]});

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point A on a logarithmic curve at -4 comma -3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Point B on a logarithmic curve at -5 comma -7.",
            }),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for indices without a custom label", () => {
        // Arrange, Act — only the first point is named
        renderLogarithmGraph({pointLabels: ["A"]});

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point A on a logarithmic curve at -4 comma -3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Point 2 on a logarithmic curve at -5 comma -7.",
            }),
        ).toBeInTheDocument();
    });

    // The editor encodes "only the second point named" as `["", "B"]`.
    // An empty string at any index must fall back to the default label.
    it("falls back to the default label for explicit empty-string entries", () => {
        // Arrange, Act
        renderLogarithmGraph({pointLabels: ["", "B"]});

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 1 on a logarithmic curve at -4 comma -3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Point B on a logarithmic curve at -5 comma -7.",
            }),
        ).toBeInTheDocument();
    });

    it("falls back to the default label for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        renderLogarithmGraph({
            // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
            pointLabels: [42, "B"] as unknown as string[],
        });

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Point 1 on a logarithmic curve at -4 comma -3.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Point B on a logarithmic curve at -5 comma -7.",
            }),
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
