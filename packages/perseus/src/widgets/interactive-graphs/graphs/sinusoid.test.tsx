import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {
    computeSine,
    getSinusoidCoefficients,
    getSinusoidKeyboardConstraint,
} from "./sinusoid";

import type {InteractiveGraphState, SinusoidGraphState} from "../types";
import type {vec} from "mafs";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseSinusoidState: InteractiveGraphState = {
    type: "sinusoid",
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

describe("Sinusoid graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for sinusoid graph", () => {
        // Arrange

        // Act
        render(<MafsGraph {...baseMafsGraphProps} state={baseSinusoidState} />);
        const graph = screen.getByLabelText(
            "A sinusoid function on a coordinate plane.",
        );

        // Assert
        expect(graph).toBeInTheDocument();
        expect(graph).toHaveAccessibleDescription(
            "The graph shows a wave with a minimum value of -2 and a maximum value of 2. The wave completes a full cycle from -4 to 4.",
        );
    });

    test("should have aria label and describedby for sinusoid graph with updated values", () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseSinusoidState,
                    coords: [
                        [-1, -1],
                        [3, 2],
                    ],
                }}
            />,
        );
        const graph = screen.getByLabelText(
            "A sinusoid function on a coordinate plane.",
        );

        // Assert
        expect(graph).toBeInTheDocument();
        expect(graph).toHaveAccessibleDescription(
            "The graph shows a wave with a minimum value of -4 and a maximum value of 2. The wave completes a full cycle from -9 to 7.",
        );
    });

    test("should have aria labels for sinusoid graph points", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseSinusoidState} />);

        // Act
        const points = screen.getAllByRole("button");
        const [root, peak] = points;

        // Assert
        expect(root).toHaveAccessibleName("Midline intersection at 0 comma 0.");
        expect(peak).toHaveAccessibleName("Maximum point at 2 comma 2.");
    });

    test("should have aria labels for sinusoid graph points with updated values", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseSinusoidState,
                    coords: [
                        [-1, -1],
                        [3, 2],
                    ],
                }}
            />,
        );

        // Act
        const points = screen.getAllByRole("button");
        const [root, peak] = points;

        // Assert
        expect(root).toHaveAccessibleName(
            "Midline intersection at -1 comma -1.",
        );
        expect(peak).toHaveAccessibleName("Maximum point at 3 comma 2.");
    });

    test.each`
        case               | extremum    | expectedLabel
        ${"max on right"}  | ${[2, 2]}   | ${"Maximum point at 2 comma 2."}
        ${"max on left"}   | ${[-2, 2]}  | ${"Maximum point at -2 comma 2."}
        ${"min on right"}  | ${[2, -2]}  | ${"Minimum point at 2 comma -2."}
        ${"min on left"}   | ${[-2, -2]} | ${"Minimum point at -2 comma -2."}
        ${"flat on right"} | ${[2, 0]}   | ${"Line through point at 2 comma 0."}
        ${"flat on left"}  | ${[-2, 0]}  | ${"Line through point at -2 comma 0."}
    `(
        "Should have aria label reflecting where the extremum point is relative to the midline ($case)",
        ({extremum, expectedLabel}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseSinusoidState,
                        coords: [[0, 0], extremum],
                    }}
                />,
            );

            // Act
            const buttons = screen.getAllByRole("button");
            // First button is the midline intersection, second is the extremum.
            const extremumPoint = buttons[1];

            // Assert
            expect(extremumPoint).toHaveAccessibleName(expectedLabel);
        },
    );

    test("overall graph description should include interactive elements", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseSinusoidState} />);

        // Act
        const overallGraph = screen.getByText(
            "Interactive elements: Sinusoid graph with midline intersection point at 0 comma 0 and extremum point at 2 comma 2.",
        );

        // Assert
        expect(overallGraph).toBeInTheDocument();
    });

    test("overall graph description should include interactive elements with updated values", () => {
        // Arrange
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseSinusoidState,
                    coords: [
                        [-1, -1],
                        [3, 2],
                    ],
                }}
            />,
        );

        // Act
        const overallGraph = screen.getByText(
            "Interactive elements: Sinusoid graph with midline intersection point at -1 comma -1 and extremum point at 3 comma 2.",
        );

        // Assert
        expect(overallGraph).toBeInTheDocument();
    });
});

describe("SinusoidGraph", () => {
    it("should accurately calculate the sine coefficients", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 3],
            [2, 5],
        ];
        const expected = {
            amplitude: 2,
            angularFrequency: 0.7853981633974483,
            phase: 0,
            verticalOffset: 3,
        };

        expect(getSinusoidCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate the sine wave for a given x-coordinate", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];

        // Ensure that the coefficients are defined
        const coefficients = getSinusoidCoefficients(coords);
        expect(coefficients).toBeDefined();

        // Grab a point where the sine wave should be 0
        const pointToTest = coords[0][0] + 4;

        // The sine wave should be roughly 0 at this point when accounting for floating point errors
        // We already know that the coefficients are defined from the previous test
        expect(Math.round(computeSine(pointToTest, coefficients!))).toEqual(0);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [0, 0],
        ];
        expect(getSinusoidCoefficients(coords)).toBe(undefined);
    });
});

describe("getSinusoidKeyboardConstraint", () => {
    it("should snap to the grid and avoid putting points on a vertical line", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [1, 1],
        ];
        const snapStep: vec.Vector2 = [1, 1];
        const constraint = getSinusoidKeyboardConstraint(coords, snapStep, 0);

        expect(constraint).toEqual({
            up: [0, 1],
            down: [0, -1],
            left: [-1, 0],
            right: [2, 0], // Avoids putting the point on a vertical line
        });
    });
});
