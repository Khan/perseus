import {
    getExponentialCoefficients,
    getTangentCoefficients,
} from "./coefficients";

describe("getExponentialCoefficients", () => {
    it("returns correct a and c for a growth curve with a shifted asymptote", () => {
        // f(x) = 2·4ˣ + 3  →  f(0)=5, f(1)=11, asymptote y=3
        const result = getExponentialCoefficients(
            [
                [0, 5],
                [1, 11],
            ],
            3,
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
            0,
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
            0,
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
                0,
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
                0,
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
                0,
            ),
        ).toBeUndefined();
    });
});

describe("getTangentCoefficients", () => {
    it("returns correct coefficients for basic tangent", () => {
        // Simplest case: inflection at origin, p2 one quarter-period away.
        // This is the default starting state when no startCoords are provided.
        const coords: [[number, number], [number, number]] = [
            [0, 0],
            [Math.PI / 4, 1],
        ];
        const [a, b, c, d] = getTangentCoefficients(coords);

        expect(a).toBeCloseTo(1); // amplitude
        expect(b).toBeCloseTo(1); // angularFrequency
        expect(c).toBeCloseTo(0); // phase
        expect(d).toBeCloseTo(0); // verticalOffset
    });

    it("returns correct coefficients with vertical offset", () => {
        // Happens when the learner drags p1 above the x-axis, shifting the
        // entire curve vertically (e.g., y = 3*tan(x) + 2).
        const coords: [[number, number], [number, number]] = [
            [0, 2],
            [Math.PI / 4, 5],
        ];
        const [a, b, c, d] = getTangentCoefficients(coords);

        expect(a).toBeCloseTo(3);
        expect(b).toBeCloseTo(1);
        expect(c).toBeCloseTo(0);
        expect(d).toBeCloseTo(2);
    });

    it("returns correct coefficients with phase shift", () => {
        // Happens when the learner drags p1 away from x=0, shifting
        // the curve horizontally (e.g., y = tan(π/4 * x - π/4)).
        const coords: [[number, number], [number, number]] = [
            [1, 0],
            [2, 1],
        ];
        const [a, b, c, d] = getTangentCoefficients(coords);

        expect(a).toBeCloseTo(1);
        expect(b).toBeCloseTo(Math.PI / 4);
        expect(c).toBeCloseTo(Math.PI / 4);
        expect(d).toBeCloseTo(0);
    });

    it("returns negative amplitude when p2 is below p1", () => {
        // Happens when the learner drags p2 below p1, flipping
        // the curve vertically (e.g., y = -2*tan(x)).
        const coords: [[number, number], [number, number]] = [
            [0, 0],
            [Math.PI / 4, -2],
        ];
        const [a, b, c, d] = getTangentCoefficients(coords);

        expect(a).toBeCloseTo(-2);
        expect(b).toBeCloseTo(1);
        expect(c).toBeCloseTo(0);
        expect(d).toBeCloseTo(0);
    });

    it("returns negative angular frequency when p2 is left of p1", () => {
        // Happens when the learner drags p2 to the left of p1,
        // which mirrors the curve horizontally.
        const coords: [[number, number], [number, number]] = [
            [1, 0],
            [0, 1],
        ];
        const [a, b, c, d] = getTangentCoefficients(coords);

        expect(a).toBeCloseTo(1);
        expect(b).toBeCloseTo(-Math.PI / 4);
        expect(c).toBeCloseTo(-Math.PI / 4);
        expect(d).toBeCloseTo(0);
    });
});
