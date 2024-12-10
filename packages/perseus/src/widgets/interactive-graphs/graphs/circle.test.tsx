import {render, screen} from "@testing-library/react";
import * as React from "react";

import {Dependencies} from "@khanacademy/perseus";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {getBaseMafsGraphPropsForTests} from "../utils";

import type {InteractiveGraphState} from "../types";

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
    beforeEach(() => {
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
});
