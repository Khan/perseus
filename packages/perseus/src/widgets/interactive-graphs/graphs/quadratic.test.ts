import {getQuadraticCoefficients} from "./quadratic";

import type {QuadraticGraphState} from "../types";

describe("QuadraticGraph", () => {
    it("should accurately calculate coefficients", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [0, -5],
            [4, 5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should accurately calculate coefficients regardless of the provided order", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [4, 5],
            [0, -5],
        ];
        const expected: [number, number, number] = [0.5, 0.5, -5];
        expect(getQuadraticCoefficients(coords)).toEqual(expected);
    });

    it("should return undefined when the coefficients are invalid", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        expect(getQuadraticCoefficients(coords)).toBe(undefined);
    });
});
