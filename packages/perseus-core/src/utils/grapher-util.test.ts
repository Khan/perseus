import {functionForType, allTypes, MOVABLES} from "./grapher-util";

import type {Coords} from "./grapher-types";

describe("grapher-util", () => {
    describe("MOVABLES", () => {
        it("should have the expected movable types", () => {
            expect(MOVABLES).toEqual({
                PLOT: "PLOT",
                PARABOLA: "PARABOLA",
                SINUSOID: "SINUSOID",
            });
        });
    });

    describe("allTypes", () => {
        it("should contain all graph types", () => {
            expect(allTypes).toEqual(
                expect.arrayContaining([
                    "linear",
                    "quadratic",
                    "sinusoid",
                    "tangent",
                    "exponential",
                    "logarithm",
                    "absolute_value",
                ]),
            );
            expect(allTypes).toHaveLength(7);
        });
    });

    describe("functionForType", () => {
        it("should return a handler for each type", () => {
            const types = [
                "linear",
                "quadratic",
                "sinusoid",
                "tangent",
                "exponential",
                "logarithm",
                "absolute_value",
            ] as const;

            for (const type of types) {
                const handler = functionForType(type);
                expect(handler).toBeDefined();
                expect(handler.getCoefficients).toBeDefined();
                expect(handler.getFunctionForCoeffs).toBeDefined();
                expect(handler.getEquationString).toBeDefined();
            }
        });
    });

    describe("linear", () => {
        const linear = functionForType("linear");
        const coords: Coords = [
            [0, 1],
            [2, 5],
        ];

        it("should compute coefficients (slope and intercept)", () => {
            const coeffs = linear.getCoefficients(coords)!;
            expect(coeffs[0]).toBeCloseTo(2); // slope
            expect(coeffs[1]).toBeCloseTo(1); // intercept
        });

        it("should return undefined when points have same x", () => {
            const coeffs = linear.getCoefficients([
                [1, 2],
                [1, 5],
            ]);
            expect(coeffs).toBeUndefined();
        });

        it("should evaluate the function correctly", () => {
            const result = linear.getFunctionForCoeffs([2, 1], 3);
            expect(result).toBeCloseTo(7); // 2*3 + 1
        });

        it("should produce correct equation string", () => {
            const equation = linear.getEquationString(coords);
            expect(equation).toMatch(/^y = /);
            expect(equation).toContain("x + ");
        });
    });

    describe("quadratic", () => {
        const quadratic = functionForType("quadratic");
        const coords: Coords = [
            [0, 0], // vertex
            [1, 1],
        ];

        it("should compute coefficients", () => {
            const coeffs = quadratic.getCoefficients(coords)!;
            expect(coeffs[0]).toBeCloseTo(1); // a
            expect(coeffs[1]).toBeCloseTo(0); // b
            expect(coeffs[2]).toBeCloseTo(0); // c
        });

        it("should evaluate the function correctly", () => {
            // f(x) = 1*x^2 + 0*x + 0
            const result = quadratic.getFunctionForCoeffs([1, 0, 0], 3);
            expect(result).toBeCloseTo(9);
        });

        it("should produce correct equation string", () => {
            const equation = quadratic.getEquationString(coords);
            expect(equation).toMatch(/^y = /);
            expect(equation).toContain("x^2 + ");
        });
    });

    describe("sinusoid", () => {
        const sinusoid = functionForType("sinusoid");
        const coords: Coords = [
            [0, 0],
            [1, 1],
        ];

        it("should compute coefficients", () => {
            const coeffs = sinusoid.getCoefficients(coords)!;
            expect(coeffs[0]).toBeCloseTo(1); // amplitude
            expect(coeffs[1]).toBeCloseTo(Math.PI / 2); // angular frequency
            expect(coeffs[2]).toBeCloseTo(0); // phase
            expect(coeffs[3]).toBeCloseTo(0); // vertical offset
        });

        it("should evaluate the function correctly", () => {
            // f(x) = 1 * sin(π/2 * x - 0) + 0
            const result = sinusoid.getFunctionForCoeffs(
                [1, Math.PI / 2, 0, 0],
                1,
            );
            expect(result).toBeCloseTo(1); // sin(π/2) = 1
        });

        it("should display 'sin' in the equation string", () => {
            const equation = sinusoid.getEquationString(coords);
            expect(equation).toContain(" sin(");
        });

        it("should consider equivalent sinusoids as equal", () => {
            const coeffs1 = [1, 2, 0, 0];
            const coeffs2 = [1, 2, 0, 0];
            expect(sinusoid.areEqual(coeffs1, coeffs2)).toBe(true);
        });

        it("should consider different sinusoids as not equal", () => {
            const coeffs1 = [1, 2, 0, 0];
            const coeffs2 = [2, 2, 0, 0];
            expect(sinusoid.areEqual(coeffs1, coeffs2)).toBe(false);
        });
    });

    describe("tangent", () => {
        const tangent = functionForType("tangent");
        const coords: Coords = [
            [0, 0],
            [1, 1],
        ];

        it("should compute coefficients", () => {
            const coeffs = tangent.getCoefficients(coords)!;
            expect(coeffs[0]).toBeCloseTo(1); // amplitude
            expect(coeffs[1]).toBeCloseTo(Math.PI / 4); // angular frequency
            expect(coeffs[2]).toBeCloseTo(0); // phase
            expect(coeffs[3]).toBeCloseTo(0); // vertical offset
        });

        it("should evaluate the function correctly", () => {
            // f(x) = 1 * tan(π/4 * x - 0) + 0
            const result = tangent.getFunctionForCoeffs(
                [1, Math.PI / 4, 0, 0],
                1,
            );
            expect(result).toBeCloseTo(1); // tan(π/4) = 1
        });

        it("should display 'tan' in the equation string", () => {
            const equation = tangent.getEquationString(coords);
            expect(equation).toContain(" tan(");
        });

        it("should consider equivalent tangents as equal", () => {
            const coeffs1 = [1, 2, 0, 0];
            const coeffs2 = [1, 2, 0, 0];
            expect(tangent.areEqual(coeffs1, coeffs2)).toBe(true);
        });

        it("should consider different tangents as not equal", () => {
            const coeffs1 = [1, 2, 0, 0];
            const coeffs2 = [2, 2, 0, 0];
            expect(tangent.areEqual(coeffs1, coeffs2)).toBe(false);
        });
    });

    describe("exponential", () => {
        const exponential = functionForType("exponential");
        const asymptote: Coords = [
            [0, 0],
            [1, 0],
        ];
        const coords: Coords = [
            [0, 1],
            [1, Math.E],
        ];

        it("should compute coefficients", () => {
            const coeffs = exponential.getCoefficients(coords, asymptote)!;
            expect(coeffs[0]).toBeCloseTo(1); // a
            expect(coeffs[1]).toBeCloseTo(1); // b
            expect(coeffs[2]).toBeCloseTo(0); // c (asymptote)
        });

        it("should evaluate the function correctly", () => {
            // f(x) = 1 * e^(1*x) + 0
            const result = exponential.getFunctionForCoeffs([1, 1, 0], 1);
            expect(result).toBeCloseTo(Math.E);
        });

        it("should produce correct equation string", () => {
            const equation = exponential.getEquationString(coords, asymptote);
            expect(equation).toContain("e^(");
        });

        it("should return null when asymptote is missing", () => {
            const equation = exponential.getEquationString(
                coords,
                // eslint-disable-next-line no-restricted-syntax
                undefined as any,
            );
            expect(equation).toBeNull();
        });
    });

    describe("logarithm", () => {
        const logarithm = functionForType("logarithm");

        it("should produce correct equation string", () => {
            const asymptote: Coords = [
                [0, 0],
                [0, 1],
            ];
            const coords: Coords = [
                [1, 0],
                [Math.E, 1],
            ];
            const equation = logarithm.getEquationString(coords, asymptote);
            expect(equation).toContain("ln(");
        });

        it("should return null when asymptote is missing", () => {
            const coords: Coords = [
                [1, 0],
                [2, 1],
            ];
            const equation = logarithm.getEquationString(
                coords,
                // eslint-disable-next-line no-restricted-syntax
                undefined as any,
            );
            expect(equation).toBeNull();
        });
    });

    describe("absolute_value", () => {
        const absValue = functionForType("absolute_value");
        const coords: Coords = [
            [1, 2], // vertex
            [3, 6],
        ];

        it("should compute coefficients", () => {
            const coeffs = absValue.getCoefficients(coords)!;
            expect(coeffs[0]).toBeCloseTo(2); // slope
            expect(coeffs[1]).toBeCloseTo(1); // horizontal offset
            expect(coeffs[2]).toBeCloseTo(2); // vertical offset
        });

        it("should return undefined when points have same x", () => {
            const coeffs = absValue.getCoefficients([
                [1, 2],
                [1, 5],
            ]);
            expect(coeffs).toBeUndefined();
        });

        it("should evaluate the function correctly", () => {
            // f(x) = 2 * |x - 1| + 2
            const result = absValue.getFunctionForCoeffs([2, 1, 2], 3);
            expect(result).toBeCloseTo(6); // 2 * |3 - 1| + 2
        });

        it("should produce correct equation string", () => {
            const equation = absValue.getEquationString(coords);
            expect(equation).toContain("| x - ");
        });
    });
});
