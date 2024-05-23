import {isValidDestination, getQuadraticCoefficients} from "./quadratic";

import type {QuadraticGraphState} from "../types";
import type {vec} from "mafs";

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

    it("should return undefined when the coefficients are invalid", () => {
        const coords: QuadraticGraphState["coords"] = [
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        expect(getQuadraticCoefficients(coords)).toBe(undefined);
    });

    it("should indicate when new coordinates would invalidate the graph", () => {
        const coords: QuadraticGraphState["coords"] = [
            [-5, 5],
            [0, -5],
            [5, 5],
        ];
        const destination: vec.Vector2 = [0, 0];
        const elementId = 0;
        const isValid = isValidDestination(destination, elementId, coords);
        expect(isValid).toBe(false);
    });
});
