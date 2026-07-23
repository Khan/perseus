import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describeRayGraph} from "./ray";

import type {InteractiveGraphState} from "../../types";

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

describe("describeRayGraph", () => {
    it("describes a default ray", () => {
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

    it("describes a ray with updated points", () => {
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

    it("folds custom pointLabels into the endpoint / through-point roles", () => {
        // Arrange, Act
        const strings = describeRayGraph(
            {...baseRayState, pointLabels: ["A", "B"]},
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srRayEndpoint).toBe("Endpoint A at -5 comma 5.");
        expect(strings.srRayTerminalPoint).toBe(
            "Through point B at 5 comma 5.",
        );
    });

    it("falls back to the plain role label for empty-string entries", () => {
        // Arrange, Act
        const strings = describeRayGraph(
            {...baseRayState, pointLabels: ["", "B"]},
            mockPerseusI18nContext,
        );

        // Assert
        expect(strings.srRayEndpoint).toBe("Endpoint at -5 comma 5.");
        expect(strings.srRayTerminalPoint).toBe(
            "Through point B at 5 comma 5.",
        );
    });
});
