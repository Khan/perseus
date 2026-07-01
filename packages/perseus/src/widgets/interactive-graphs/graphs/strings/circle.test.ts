import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeCircleGraph} from "./circle";

import type {InteractiveGraphState} from "../../types";

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

describe("describeCircleGraph", () => {
    it("describes a default circle", () => {
        // Arrange

        // Act
        const strings = describeCircleGraph(
            baseCircleState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srCircleGraph).toBe("A circle on a coordinate plane.");
        expect(strings.srCircleShape).toBe(
            "Circle. The center point is at 0 comma 0.",
        );
        expect(strings.srCircleRadiusPoint).toBe(
            "Right radius endpoint at 1 comma 0.",
        );
        expect(strings.srCircleRadius).toBe("Circle radius is 1.");
        expect(strings.srCircleOuterPoints).toBe(
            "Points on the circle at 1 comma 0, 0 comma 1, -1 comma 0, 0 comma -1.",
        );
        expect(strings.srCircleInteractiveElement).toBe(
            "Interactive elements: Circle. The center point is at 0 comma 0. Circle radius is 1.",
        );
    });

    it("describes a circle with updated values", () => {
        // Arrange

        // Act
        const strings = describeCircleGraph(
            {
                ...baseCircleState,
                center: [2, 3],
                radiusPoint: [7, 3],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srCircleGraph).toBe("A circle on a coordinate plane.");
        expect(strings.srCircleShape).toBe(
            "Circle. The center point is at 2 comma 3.",
        );
        expect(strings.srCircleRadiusPoint).toBe(
            "Right radius endpoint at 7 comma 3.",
        );
        expect(strings.srCircleRadius).toBe("Circle radius is 5.");
        expect(strings.srCircleOuterPoints).toBe(
            "Points on the circle at 7 comma 3, 2 comma 8, -3 comma 3, 2 comma -2.",
        );
        expect(strings.srCircleInteractiveElement).toBe(
            "Interactive elements: Circle. The center point is at 2 comma 3. Circle radius is 5.",
        );
    });
});
