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

    it("should accurately calculate the sine wave", () => {
        const coords: SinusoidGraphState["coords"] = [
            [0, 0],
            [2, 2],
        ];
        const coefficients = getSinusoidCoefficients(coords);

        const pointToTest = coords[0][0] + 4;

        // The sine wave should be roughly 0 at this point when accounting for floating point errors
        expect(Math.round(computeSine(pointToTest, coefficients))).toEqual(0);
    });
});
