import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeLinearSystemGraph} from "./linear-system";

import type {InteractiveGraphState} from "../../types";

const baseLinearSystemState: InteractiveGraphState = {
    type: "linear-system",
    coords: [
        [
            [-5, 5],
            [5, 5],
        ],
        [
            [-5, -5],
            [5, -5],
        ],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("describeLinearSystemGraph", () => {
    test("describes a default linear system graph", () => {
        // Arrange

        // Act
        const linearSystemGraphDescription = describeLinearSystemGraph(
            baseLinearSystemState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(linearSystemGraphDescription).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5. Line 2 has two points, point 1 at -5 comma -5 and point 2 at 5 comma -5.",
        );
    });

    test("describes a linear system graph with updated points", () => {
        // Arrange

        // Act
        const linearSystemGraphDescription = describeLinearSystemGraph(
            {
                ...baseLinearSystemState,
                coords: [
                    [
                        [-2, 3],
                        [3, 3],
                    ],
                    [
                        [-2, -3],
                        [3, -3],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(linearSystemGraphDescription).toEqual(
            "Interactive elements: Two lines on a coordinate plane. Line 1 has two points, point 1 at -2 comma 3 and point 2 at 3 comma 3. Line 2 has two points, point 1 at -2 comma -3 and point 2 at 3 comma -3.",
        );
    });
});
