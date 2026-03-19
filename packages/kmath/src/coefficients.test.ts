import {getTangentCoefficients} from "./coefficients";

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
