import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {mockPerseusI18nContext} from "../../../components/i18n-context";
import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import {describeRayGraph} from "./ray";

import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();
const baseRayState: InteractiveGraphState = {
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

    test("should have aria label and describedby for overall ray graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseRayState} />);

        // Act
        const linearGraph = screen.getByLabelText(
            "A ray on a coordinate plane.",
        );

        // Assert
        expect(linearGraph).toBeInTheDocument();
        expect(linearGraph).toHaveAccessibleDescription(
            "The endpoint is at -5 comma 5 and the ray goes through point 5 comma 5.",
        );
    });

    test.each`
        element         | index | expectedValue
        ${"point1"}     | ${0}  | ${"Endpoint at -5 comma 5."}
        ${"grabHandle"} | ${1}  | ${"Ray with endpoint -5 comma 5 going through point 5 comma 5."}
        ${"point2"}     | ${2}  | ${"Through point at 5 comma 5."}
    `(
        "should have aria label for $element on the line",
        ({index, expectedValue}) => {
            // Arrange
            render(<MafsGraph {...baseMafsGraphProps} state={baseRayState} />);

            // Act
            // Moveable elements: point 1, grab handle, point 2
            const movableElements = screen.getAllByRole("button");
            const element = movableElements[index];

            // Assert
            expect(element).toHaveAttribute("aria-label", expectedValue);
        },
    );

    test("points description should include points info", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseRayState} />);

        // Act
        const linearGraph = screen.getByLabelText(overallGraphLabel);

        // Assert
        expect(linearGraph).toHaveTextContent(
            "The endpoint is at -5 comma 5 and the ray goes through point 5 comma 5.",
        );
    });

    test("aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseRayState,
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
            "Ray with endpoint -2 comma 3 going through point 3 comma 3.",
        );
        expect(point2).toHaveAttribute(
            "aria-label",
            "Through point at 3 comma 3.",
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
            render(<MafsGraph {...baseMafsGraphProps} state={baseRayState} />);
            const interactiveElements = screen.getAllByRole("button");
            const [point1, grabHandle, point2] = interactiveElements;
            const movingElement = interactiveElements[index];

            // Act - Move the element
            act(() => movingElement.focus());
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

describe("describeRayGraph", () => {
    test("describes a default ray", () => {
        // Arrange

        // Act
        const strings = describeRayGraph(baseRayState, mockPerseusI18nContext);

        // Assert
        expect(strings.srRayGraph).toBe("A ray on a coordinate plane.");
        expect(strings.srRayPoints).toBe(
            "The endpoint is at -5 comma 5 and the ray goes through point 5 comma 5.",
        );
        expect(strings.srRayEndpoint).toBe("Endpoint at -5 comma 5.");
        expect(strings.srRayTerminalPoint).toBe("Through point at 5 comma 5.");
        expect(strings.srRayGrabHandle).toBe(
            "Ray with endpoint -5 comma 5 going through point 5 comma 5.",
        );
        expect(strings.srRayInteractiveElement).toBe(
            "Interactive elements: A ray on a coordinate plane. The endpoint is at -5 comma 5 and the ray goes through point 5 comma 5.",
        );
    });

    test("describes a ray with updated points", () => {
        // Arrange

        // Act
        const strings = describeRayGraph(
            {
                ...baseRayState,
                coords: [
                    [-1, 2],
                    [3, 4],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srRayGraph).toBe("A ray on a coordinate plane.");
        expect(strings.srRayPoints).toBe(
            "The endpoint is at -1 comma 2 and the ray goes through point 3 comma 4.",
        );
        expect(strings.srRayEndpoint).toBe("Endpoint at -1 comma 2.");
        expect(strings.srRayTerminalPoint).toBe("Through point at 3 comma 4.");
        expect(strings.srRayGrabHandle).toBe(
            "Ray with endpoint -1 comma 2 going through point 3 comma 4.",
        );
        expect(strings.srRayInteractiveElement).toBe(
            "Interactive elements: A ray on a coordinate plane. The endpoint is at -1 comma 2 and the ray goes through point 3 comma 4.",
        );
    });
});
