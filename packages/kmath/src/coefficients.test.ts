import {getExponentialCoefficients} from "./coefficients";

describe("getExponentialCoefficients", () => {
    it("returns correct a and c for a growth curve with a shifted asymptote", () => {
        // f(x) = 2·4ˣ + 3  →  f(0)=5, f(1)=11, asymptote y=3
        const result = getExponentialCoefficients(
            [
                [0, 5],
                [1, 11],
            ],
            [
                [-10, 3],
                [10, 3],
            ],
        );

        // ratio = (5-3)/(11-3) = 0.25, denom = -1 → b = ln(0.25)/-1 = ln(4)
        expect(result?.a).toBe(2);
        expect(result?.b).toBeCloseTo(Math.log(4), 10);
        expect(result?.c).toBe(3);
    });

    it("returns correct a and c for a decay curve", () => {
        // f(x) = 4·(1/4)ˣ  →  f(0)=4, f(1)=1, asymptote y=0
        const result = getExponentialCoefficients(
            [
                [0, 4],
                [1, 1],
            ],
            [
                [-10, 0],
                [10, 0],
            ],
        );

        // ratio = (4-0)/(1-0) = 4, denom = -1 → b = ln(4)/-1 = -ln(4)
        expect(result?.a).toBe(4);
        expect(result?.b).toBeCloseTo(-Math.log(4), 10);
        expect(result?.c).toBe(0);
    });

    it("returns correct a and c for a reflected (downward) curve", () => {
        // f(x) = -3·2ˣ  →  f(0)=-3, f(1)=-6, asymptote y=0
        const result = getExponentialCoefficients(
            [
                [0, -3],
                [1, -6],
            ],
            [
                [-10, 0],
                [10, 0],
            ],
        );

        // ratio = (-3-0)/(-6-0) = 0.5, denom = -1 → b = ln(0.5)/-1 = ln(2)
        expect(result?.a).toBe(-3);
        expect(result?.b).toBeCloseTo(Math.log(2), 10);
        expect(result?.c).toBe(0);
    });

    it("returns undefined when both points share the same x-coordinate", () => {
        expect(
            getExponentialCoefficients(
                [
                    [2, 3],
                    [2, 7],
                ],
                [
                    [-10, 0],
                    [10, 0],
                ],
            ),
        ).toBeUndefined();
    });

    it("returns undefined when a point lies on the asymptote", () => {
        expect(
            getExponentialCoefficients(
                [
                    [0, 0], // y === asymptote y
                    [1, 4],
                ],
                [
                    [-10, 0],
                    [10, 0],
                ],
            ),
        ).toBeUndefined();
    });

    it("returns undefined when points are on opposite sides of the asymptote", () => {
        expect(
            getExponentialCoefficients(
                [
                    [0, 2],
                    [1, -1],
                ],
                [
                    [-10, 0],
                    [10, 0],
                ],
            ),
        ).toBeUndefined();
    });
});
