import {getPolarGraphPublicWidgetOptions} from "./polar-graph-util";

import type {PerseusPolarGraphWidgetOptions} from "../../data-schema";

describe("getPolarGraphPublicWidgetOptions", () => {
    it("removes the correct answer and keeps every other option", () => {
        // Arrange
        const options: PerseusPolarGraphWidgetOptions = {
            maxRadius: 5,
            radiusStep: 1,
            angleStepDegrees: 15,
            angleUnit: "degrees",
            graph: {type: "point", numPoints: 1},
            correct: {type: "point", coords: [[3, 0]]},
            lockedFigures: [],
            lockedLabels: [],
            fullGraphAriaLabel: "A polar graph",
        };

        // Act
        const publicOptions = getPolarGraphPublicWidgetOptions(options);

        // Assert
        expect(publicOptions).toEqual({
            maxRadius: 5,
            radiusStep: 1,
            angleStepDegrees: 15,
            angleUnit: "degrees",
            graph: {type: "point", numPoints: 1},
            lockedFigures: [],
            lockedLabels: [],
            fullGraphAriaLabel: "A polar graph",
        });
        expect(publicOptions).not.toHaveProperty("correct");
    });
});
