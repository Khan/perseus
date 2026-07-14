import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeSegmentGraph} from "./segment";

import type {InteractiveGraphState} from "../../types";

const baseSingleSegmentState: InteractiveGraphState = {
    type: "segment",
    coords: [
        [
            [-5, 5],
            [5, 5],
        ],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const baseMultipleSegmentState: InteractiveGraphState = {
    type: "segment",
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

describe("describeSegmentGraph", () => {
    test("describes a single segment", () => {
        // Arrange

        // Act
        const interactiveElementsString = describeSegmentGraph(
            baseSingleSegmentState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5.",
        );
    });

    test("describes multiple segments", () => {
        // Arrange

        // Act
        const interactiveElementsString = describeSegmentGraph(
            baseMultipleSegmentState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -5 comma 5. Endpoint 2 at 5 comma 5. Segment 2: Endpoint 1 at -5 comma -5. Endpoint 2 at 5 comma -5.",
        );
    });

    test("describes a segment graph with updated points", () => {
        // Arrange

        // Act
        const interactiveElementsString = describeSegmentGraph(
            {
                ...baseSingleSegmentState,
                coords: [
                    [
                        [-1, 2],
                        [3, 4],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -1 comma 2. Endpoint 2 at 3 comma 4.",
        );
    });

    test("describes a segment graph with multiple segments and updated points", () => {
        // Arrange

        // Act
        const interactiveElementsString = describeSegmentGraph(
            {
                ...baseMultipleSegmentState,
                coords: [
                    [
                        [-1, 2],
                        [3, 4],
                    ],
                    [
                        [-1, -2],
                        [3, -4],
                    ],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(interactiveElementsString).toBe(
            "Interactive elements: Segment 1: Endpoint 1 at -1 comma 2. Endpoint 2 at 3 comma 4. Segment 2: Endpoint 1 at -1 comma -2. Endpoint 2 at 3 comma -4.",
        );
    });
});
