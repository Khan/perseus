import {computeSine, getSinusoidCoefficients} from "./sinusoid";

import type {SinusoidGraphState} from "../types";

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

        expect(Math.round(computeSine(pointToTest, ...coefficients))).toEqual(
            0,
        );
    });
});
