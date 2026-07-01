import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeVectorGraph} from "./vector";

import type {InteractiveGraphState} from "../../types";

const baseVectorState: InteractiveGraphState = {
    type: "vector",
    coords: [
        [-5, 0],
        [5, 0],
    ],
    hasBeenInteractedWith: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

describe("describeVectorGraph", () => {
    it("describes a default vector", () => {
        // Arrange, Act
        const strings = describeVectorGraph(
            baseVectorState,
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srVectorGraph).toBe("A vector on a coordinate plane.");
        expect(strings.srVectorPoints).toBe(
            "The tail is at -5 comma 0 and the head is at 5 comma 0.",
        );
        expect(strings.srVectorHeadPoint).toBe("Vector head at 5 comma 0.");
        expect(strings.srVectorGrabHandle).toBe(
            "Vector from -5 comma 0 to 5 comma 0.",
        );
        expect(strings.srVectorInteractiveElement).toBe(
            "Interactive elements: A vector on a coordinate plane. The tail is at -5 comma 0 and the head is at 5 comma 0.",
        );
    });

    it("describes a vector with updated points", () => {
        // Arrange, Act
        const strings = describeVectorGraph(
            {
                ...baseVectorState,
                coords: [
                    [1, 2],
                    [4, 6],
                ],
            },
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srVectorGraph).toBe("A vector on a coordinate plane.");
        expect(strings.srVectorPoints).toBe(
            "The tail is at 1 comma 2 and the head is at 4 comma 6.",
        );
        expect(strings.srVectorHeadPoint).toBe("Vector head at 4 comma 6.");
        expect(strings.srVectorGrabHandle).toBe(
            "Vector from 1 comma 2 to 4 comma 6.",
        );
    });
});
