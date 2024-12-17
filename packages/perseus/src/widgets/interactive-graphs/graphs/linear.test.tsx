import {render, screen} from "@testing-library/react";
import * as React from "react";

import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import type {InteractiveGraphState} from "../types";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLinearState: InteractiveGraphState = {
    type: "linear",
    coords: [
        [-5, 5],
        [5, 5],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const overallGraphLabel = "A line on a coordinate plane.";

describe("Linear graph screen reader", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for overall linear graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(
            "A line on a coordinate plane.",
        );

        // Assert
        expect(linearGraph).toBeInTheDocument();
        expect(linearGraph).toHaveAttribute(
            "aria-describedby",
            ":r1:-points :r1:-intercept :r1:-slope",
        );
    });

    test("should have aria labels for both points on the line", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        // eslint-disable-next-line testing-library/no-node-access
        const points = screen.getAllByTestId("movable-point__focusable-handle");

        // Assert
        // Check aria-label for both points on the line.
        expect(points[0]).toHaveAttribute(
            "aria-label",
            "Point 1 at -5 comma 5",
        );
        expect(points[1]).toHaveAttribute("aria-label", "Point 2 at 5 comma 5");
    });

    test("points description should include points info", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(overallGraphLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
    });

    test.each`
        case                         | coords              | interceptDescription
        ${"origin intercept"}        | ${[[1, 1], [2, 2]]} | ${"The line crosses the x and y axes at the graph's origin."}
        ${"both x and y intercepts"} | ${[[4, 4], [7, 1]]} | ${"The line crosses the X-axis at 8 comma 0 and the Y-axis at 0 comma 8."}
        ${"x intercept only"}        | ${[[5, 5], [5, 2]]} | ${"The line crosses the X-axis at 5 comma 0."}
        ${"y intercept only"}        | ${[[5, 5], [2, 5]]} | ${"The line crosses the Y-axis at 0 comma 5."}
    `(
        `slope description should include slope info for $case`,
        ({coords, interceptDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseLinearState,
                        coords,
                    }}
                />,
            );

            // Act
            const linearGraph = screen.getByLabelText(overallGraphLabel);

            // Assert
            expect(linearGraph).toHaveTextContent(interceptDescription);
        },
    );

    test.each`
        case                 | coords              | slopeDescription
        ${"positive slope"}  | ${[[1, 1], [3, 3]]} | ${"Its slope increases from left to right."}
        ${"negative slope"}  | ${[[3, 3], [1, 6]]} | ${"Its slope decreases from left to right."}
        ${"horizontal line"} | ${[[1, 1], [3, 1]]} | ${"Its slope is zero."}
        ${"vertical line"}   | ${[[1, 1], [1, 3]]} | ${"Its slope is undefined."}
    `(
        `slope description should include slope info for $case`,
        ({coords, slopeDescription}) => {
            // Arrange
            render(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={{
                        ...baseLinearState,
                        coords,
                    }}
                />,
            );

            // Act
            const linearGraph = screen.getByLabelText(overallGraphLabel);

            // Assert
            expect(linearGraph).toHaveTextContent(slopeDescription);
        },
    );
});
