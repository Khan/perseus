import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeLinearGraph} from "./linear";

import type {InteractiveGraphState} from "../../types";

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

describe("describeLinearGraph", () => {
    test("describes a default linear graph", () => {
        // Arrange

        // Act
        const strings = describeLinearGraph(
            baseLinearState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srLinearGraph).toBe("A line on a coordinate plane.");
        expect(strings.srLinearGraphPoints).toBe(
            "The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
        expect(strings.srLinearGrabHandle).toBe(
            "Line going through point -5 comma 5 and point 5 comma 5.",
        );
        expect(strings.slopeString).toBe("Its slope is zero.");
        expect(strings.interceptString).toBe(
            "The line crosses the Y-axis at 0 comma 5.",
        );
        expect(strings.srLinearInteractiveElement).toBe(
            "Interactive elements: A line on a coordinate plane. The line has two points, point 1 at -5 comma 5 and point 2 at 5 comma 5.",
        );
    });

    test("describes a linear graph with updated points", () => {
        // Arrange

        // Act
        const strings = describeLinearGraph(
            {
                ...baseLinearState,
                coords: [
                    [-1, 2],
                    [3, 4],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srLinearGraph).toBe("A line on a coordinate plane.");
        expect(strings.srLinearGraphPoints).toBe(
            "The line has two points, point 1 at -1 comma 2 and point 2 at 3 comma 4.",
        );
        expect(strings.srLinearGrabHandle).toBe(
            "Line going through point -1 comma 2 and point 3 comma 4.",
        );
        expect(strings.slopeString).toBe(
            "Its slope increases from left to right.",
        );
        expect(strings.interceptString).toBe(
            "The line crosses the X-axis at -5 comma 0 and the Y-axis at 0 comma 2.5.",
        );
        expect(strings.srLinearInteractiveElement).toBe(
            "Interactive elements: A line on a coordinate plane. The line has two points, point 1 at -1 comma 2 and point 2 at 3 comma 4.",
        );
    });
});
