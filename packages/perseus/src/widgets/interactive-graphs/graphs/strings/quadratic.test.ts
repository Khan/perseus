import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeQuadraticGraph} from "./quadratic";

import type {InteractiveGraphState} from "../../types";

const baseQuadraticState: InteractiveGraphState = {
    type: "quadratic",
    coords: [
        [-5, 5],
        [0, -5],
        [5, 5],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("describedQuadraticGraph interactive elements", () => {
    test("describes interactive elements on a default quadratic graph", () => {
        // Arrange

        // Act
        const strings = describeQuadraticGraph(
            baseQuadraticState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srQuadraticInteractiveElements).toBe(
            "Interactive elements: Parabola with points at -5 comma 5, 0 comma -5, and 5 comma 5.",
        );
    });

    test("describes interactive elements on a quadratic graph with updated points", () => {
        // Arrange

        // Act
        const strings = describeQuadraticGraph(
            {
                ...baseQuadraticState,
                coords: [
                    [-1, 2],
                    [3, 4],
                    [5, 5],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srQuadraticInteractiveElements).toBe(
            "Interactive elements: Parabola with points at -1 comma 2, 3 comma 4, and 5 comma 5.",
        );
    });
});
