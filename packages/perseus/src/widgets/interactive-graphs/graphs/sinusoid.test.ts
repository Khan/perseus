import {
    computeSine,
    getSinusoidCoefficients,
    isValidDestination,
} from "./sinusoid";

import type {SinusoidGraphState} from "../types";
import type {vec} from "mafs";

describe("SinusoidGraph", () => {
    it("should accurately calculate the sine coefficients", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 3],
            [2, 5],
        ];
        const expected: [number, number, number, number] = [
            2, // amplitude
            0.7853981633974483, // angularFrequency
            0, // phase
            3, // verticalOffset
        ];
        expect(getSinusoidCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate the sine wave", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];
        const coefficients = getSinusoidCoefficients(coords);

        const pointToTest = coords[0][0] + 4;

        // The sine wave should be roughly 0 at this point when accounting for floating point errors
        expect(Math.round(computeSine(pointToTest, ...coefficients))).toEqual(
            0,
        );
    });

    it("should accurately determine when proposed coordinates would result in an invalid graph", () => {
        const originalCoords: SinusoidGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];
        const pointToTest: vec.Vector2 = [2, 0];
        const elementId = 0;

        expect(
            isValidDestination(pointToTest, elementId, originalCoords),
        ).toEqual(false);
    });
});
