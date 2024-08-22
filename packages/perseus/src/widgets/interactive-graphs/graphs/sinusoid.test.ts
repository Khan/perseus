import {computeSine, getSinusoidCoefficients} from "./sinusoid";

import type {SinusoidGraphState} from "../types";

describe("SinusoidGraph", () => {
    it("should accurately calculate the sine coefficients", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 3],
            [2, 5],
        ];
        const expected = {
            amplitude: 2,
            angularFrequency: 0.7853981633974483,
            phase: 0,
            verticalOffset: 3,
        };

        expect(getSinusoidCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate the sine wave for a given x-coordinate", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];

        // Ensure that the coefficients are defined
        const coefficients = getSinusoidCoefficients(coords);
        expect(coefficients).toBeDefined();

        // Grab a point where the sine wave should be 0
        const pointToTest = coords[0][0] + 4;

        // The sine wave should be roughly 0 at this point when accounting for floating point errors
        // We already know that the coefficients are defined from the previous test
        expect(Math.round(computeSine(pointToTest, coefficients!))).toEqual(0);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [0, 0],
        ];
        expect(getSinusoidCoefficients(coords)).toBe(undefined);
    });
});
