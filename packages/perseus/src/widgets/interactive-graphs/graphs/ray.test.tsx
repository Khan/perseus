import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseLinearState: InteractiveGraphState = {
    type: "ray",
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

const overallGraphLabel = "A ray on a coordinate plane.";

describe("Linear graph screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label and describedby for overall linear graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(
            "A ray on a coordinate plane.",
        );

        // Assert
        expect(linearGraph).toBeInTheDocument();
        expect(linearGraph).toHaveAttribute("aria-describedby", ":r1:-points");
    });

    test("should have aria labels and describedbys for both points and grab handle on the line", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        // Moveable elements: point 1, grab handle, point 2
        const movableElements = screen.getAllByRole("button");
        const [point1, grabHandle, point2] = movableElements;

        // Assert
        // Check aria-label and describedby on interactive elements.
        // (The actual description text is tested separately below.)
        expect(point1).toHaveAttribute("aria-label", "Endpoint at -5 comma 5.");

        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Ray from endpoint -5 comma 5 to terminal point 5 comma 5.",
        );

        expect(point2).toHaveAttribute(
            "aria-label",
            "Terminal point at 5 comma 5.",
        );
    });

    test("points description should include points info", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseLinearState} />);

        // Act
        const linearGraph = screen.getByLabelText(overallGraphLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "The endpoint is at -5 comma 5 and the terminal point is at 5 comma 5.",
        );
    });

    test("aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseLinearState,
                    // Different points than default (-5, 5) and (5, 5)
                    coords: [
                        [-2, 3],
                        [3, 3],
                    ],
                }}
            />,
        );

        const interactiveElements = screen.getAllByRole("button");
        const [point1, grabHandle, point2] = interactiveElements;

        // Assert
        // Check updated aria-label for the linear graph.
        expect(point1).toHaveAttribute("aria-label", "Endpoint at -2 comma 3.");
        expect(grabHandle).toHaveAttribute(
            "aria-label",
            "Ray from endpoint -2 comma 3 to terminal point 3 comma 3.",
        );
        expect(point2).toHaveAttribute(
            "aria-label",
            "Terminal point at 3 comma 3.",
        );
    });

    test.each`
        elementName     | index
        ${"point1"}     | ${0}
        ${"grabHandle"} | ${1}
        ${"point2"}     | ${2}
    `(
        "Should update the aria-live when $elementName is moved",
        async ({index}) => {
            // Arrange
            render(
                <MafsGraph {...baseMafsGraphProps} state={baseLinearState} />,
            );
            const interactiveElements = screen.getAllByRole("button");
            const [point1, grabHandle, point2] = interactiveElements;
            const movingElement = interactiveElements[index];

            // Act - Move the element
            movingElement.focus();
            await userEvent.keyboard("{ArrowRight}");

            const expectedAriaLive = ["off", "off", "off"];
            expectedAriaLive[index] = "polite";

            // Assert
            expect(point1).toHaveAttribute("aria-live", expectedAriaLive[0]);
            expect(grabHandle).toHaveAttribute(
                "aria-live",
                expectedAriaLive[1],
            );
            expect(point2).toHaveAttribute("aria-live", expectedAriaLive[2]);
        },
    );
});
