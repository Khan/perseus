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
const baseCircleState: InteractiveGraphState = {
    type: "circle",
    center: [0, 0],
    radiusPoint: [1, 0],
    hasBeenInteractedWith: true,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("Circle graph screen reader", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("should have aria label for circle graph", () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);

        // Act
        // eslint-disable-next-line testing-library/no-node-access
        const circleGraph = document.querySelector(".movable-circle");
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check aria-label, aria-describedby, and aria-live
        // for circle and radius point.
        expect(circleGraph).toHaveAttribute(
            "aria-label",
            "Circle. The center point is at 0 comma 0.",
        );
        expect(circleGraph).toHaveAttribute(
            "aria-describedby",
            // IDs for the radius and outer points hidden description elements
            ":r1:-radius :r1:-outer-points",
        );
        expect(circleGraph).toHaveAttribute("aria-live", "polite");

        expect(radiusPoint).toHaveAttribute(
            "aria-label",
            "Radius point at 1 comma 0. Circle radius is 1.",
        );
        expect(radiusPoint).toHaveAttribute(
            "aria-describedby",
            // ID for the outer points hidden description elements
            ":r1:-outer-points",
        );
        // Radius point's aria-live is off by default so that it doesn't
        // override the circle's aria-live when the circle is moved (since
        // the radius point also moves when the circle moves).
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });

    test("aria label reflects updated values", async () => {
        // Arrange

        // Act
        render(
            <MafsGraph
                {...baseMafsGraphProps}
                state={{
                    ...baseCircleState,
                    // Different center than default
                    center: [2, 3],
                    // Different radius point than default
                    radiusPoint: [7, 3],
                }}
            />,
        );
        const buttons = await screen.findAllByRole("button");
        const circleGraph = buttons[0];
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check updated aria-label for the circle and radius point.
        expect(circleGraph).toHaveAttribute(
            "aria-label",
            "Circle. The center point is at 2 comma 3.",
        );
        expect(radiusPoint).toHaveAttribute(
            "aria-label",
            "Radius point at 7 comma 3. Circle radius is 5.",
        );
    });

    test("radius point has aria-live off by default", async () => {
        // Arrange

        // Act
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        // eslint-disable-next-line testing-library/no-node-access
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Assert
        // Check aria-live for the radius point.
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });

    test("set aria-live to polite on the radius point when the radius point is interacted with", async () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Act
        // move the radius point
        radiusPoint.focus();
        await userEvent.keyboard("{arrowright}");

        // Assert
        expect(radiusPoint).toHaveAttribute("aria-live", "polite");
    });

    test("set aria-live to off on the radius point when the circle is interacted with", async () => {
        // Arrange
        render(<MafsGraph {...baseMafsGraphProps} state={baseCircleState} />);
        const buttons = await screen.findAllByRole("button");
        const circleGraph = buttons[0];
        const radiusPoint = screen.getByTestId(
            "movable-point__focusable-handle",
        );

        // Act
        // move the radius point so that its aria-live is set to polite
        radiusPoint.focus();
        await userEvent.keyboard("{arrowright}");
        expect(radiusPoint).toHaveAttribute("aria-live", "polite");

        // move the circle
        circleGraph.focus();
        await userEvent.keyboard("{arrowright}");

        // Assert
        expect(radiusPoint).toHaveAttribute("aria-live", "off");
    });
});
