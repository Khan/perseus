import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    computeTangent,
    getTangentCoefficients,
    getTangentKeyboardConstraint,
} from "./tangent";

import type {InteractiveGraphState, TangentGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseTangentState: InteractiveGraphState = {
    type: "tangent",
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

describe("Tangent graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have aria label and describedby for tangent graph", () => {
        // Arrange, Act
        render(<MafsGraph {...baseMafsGraphProps} state={baseTangentState} />);
        const graph = screen.getByLabelText(
            "A tangent function on a coordinate plane.",
        );

        // Assert
        expect(graph).toBeInTheDocument();
        expect(graph).toHaveAccessibleDescription(
            "The graph shows a tangent function with an inflection point at 0 comma 0.",
        );
    });

    it("should have aria labels for tangent graph points", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseTangentState} />);

        // Act
        const points = screen.getAllByRole("button");
        const [inflection, control] = points;

        // Assert
        expect(inflection).toHaveAccessibleName(
            "Inflection point at 0 comma 0.",
        );
        expect(control).toHaveAccessibleName("Control point at 2 comma 2.");
    });

    it("overall graph description should include interactive elements", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseTangentState} />);

        // Act
        const overallGraph = screen.getByText(
            "Interactive elements: Tangent graph with inflection point at 0 comma 0 and control point at 2 comma 2.",
        );

        // Assert
        expect(overallGraph).toBeInTheDocument();
    });
});

// TODO(LEMS-3995, post-PR-7): route the curve SR-tree summaries through buildPointAriaLabel once new locale string keys land.
describe("Tangent graph pointLabels", () => {
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
                state={{...baseTangentState, pointLabels: ["A", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at 0 comma 0."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 2 comma 2."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default semantic label for indices without a custom label", () => {
        // Arrange, Act — only the first point is named
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseTangentState, pointLabels: ["A"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Point A at 0 comma 0."}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Control point at 2 comma 2."}),
        ).toBeInTheDocument();
    });

    // The editor encodes "only the second point named" as `["", "B"]`.
    // An empty string at any index must fall back to the semantic default.
    it("falls back to the default semantic label for explicit empty-string entries", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{...baseTangentState, pointLabels: ["", "B"]}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Inflection point at 0 comma 0.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 2 comma 2."}),
        ).toBeInTheDocument();
    });

    it("falls back to the default semantic label for truthy non-string entries (defensive against malformed hand-authored JSON bypassing the parser)", () => {
        // Arrange, Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseTangentState,
                    // eslint-disable-next-line no-restricted-syntax -- cast simulates malformed JSON the parser would reject
                    pointLabels: [42, "B"] as unknown as string[],
                }}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {
                name: "Inflection point at 0 comma 0.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Point B at 2 comma 2."}),
        ).toBeInTheDocument();
    });
});

describe("TangentGraph", () => {
    it("should accurately calculate the tangent coefficients", () => {
        const coords: TangentGraphState["coords"] = [
            [0, 3],
            [2, 5],
        ];
        const expected = {
            amplitude: 2,
            angularFrequency: Math.PI / 8,
            phase: 0,
            verticalOffset: 3,
        };

        expect(getTangentCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate the tangent for a given x-coordinate", () => {
        const coords: TangentGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];

        const coefficients = getTangentCoefficients(coords);
        expect(coefficients).toBeDefined();

        // At the inflection point (x=0), tan(0) = 0, so f(0) = 0
        expect(computeTangent(0, coefficients!)).toBeCloseTo(0);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: TangentGraphState["coords"] = [
            [0, 0],
            [0, 0],
        ];
        expect(getTangentCoefficients(coords)).toBe(undefined);
    });
});

describe("getTangentKeyboardConstraint", () => {
    it("should snap to the grid and avoid putting points on a vertical line", () => {
        const coords: TangentGraphState["coords"] = [
            [0, 0],
            [1, 1],
        ];
        const snapStep: vec.Vector2 = [1, 1];
        const constraint = getTangentKeyboardConstraint(coords, snapStep, 0);

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [2, 0], // Avoids putting the point on a vertical line
        });
    });
});
