import {generatePolarGraphOptions} from "../../utils/generators/polar-graph-widget-generator";

import {getPolarGraphStartState} from "./polar-graph-start-state";
import {fromPolar, toPolar} from "./polar-math";

describe("getPolarGraphStartState", () => {
    it("starts every point on its own grid spot, even on a coarse grid", () => {
        // Arrange: four spokes for five points.
        const options = generatePolarGraphOptions({
            maxRadius: 5,
            radiusStep: 1,
            angleStepDegrees: 90,
            graph: {type: "point", numPoints: 5},
        });

        // Act
        const state = getPolarGraphStartState(options);

        // Assert
        const spots = new Set(state.coords?.map(String));
        expect(state.coords).toHaveLength(5);
        expect(spots.size).toBe(5);
    });

    it("uses the author's start positions and fills in any it lacks", () => {
        // Arrange
        const options = generatePolarGraphOptions({
            maxRadius: 5,
            radiusStep: 1,
            angleStepDegrees: 15,
            graph: {
                type: "angle",
                startCoords: [fromPolar(2, 30), fromPolar(2, 120)],
            },
        });

        // Act
        const state = getPolarGraphStartState(options);

        // Assert
        expect(state.coords).toEqual([fromPolar(2, 30), fromPolar(2, 120)]);
    });

    it("starts a limaçon as a cardioid that fits inside the graph", () => {
        // Arrange, Act
        const state = getPolarGraphStartState(
            generatePolarGraphOptions({
                maxRadius: 5,
                radiusStep: 1,
                angleStepDegrees: 15,
                graph: {type: "limacon"},
            }),
        );

        // Assert
        const [farTip, nearPoint] = state.coords ?? [];
        expect(toPolar(farTip).r).toBe(2);
        expect(nearPoint).toEqual([0, 0]);
    });
});
