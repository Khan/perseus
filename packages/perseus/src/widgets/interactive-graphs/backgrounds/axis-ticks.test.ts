import {
    generateTickLocations,
    shouldShowLabel,
    countSignificantDecimals,
    divideByAndShowPi,
} from "./utils";

import type {Interval} from "mafs";

describe("generateTickLocations", () => {
    it("should generate ticks from the origin", () => {
        // Start from second tick (10) when the other axis min is negative
        expect(generateTickLocations(10, 0, 100, -10)).toEqual([
            10, 20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });

    it("should generate ticks from the origin including negative", () => {
        expect(generateTickLocations(10, -100, 100, -10)).toEqual([
            10, 20, 30, 40, 50, 60, 70, 80, 90, -10, -20, -30, -40, -50, -60,
            -70, -80, -90,
        ]);
    });

    it("should generate ticks from the origin for odd steps", () => {
        expect(generateTickLocations(3, -10, 10, -10)).toEqual([
            3, 6, 9, -3, -6, -9,
        ]);
    });

    it("should generate the 0 minimum tick when the other axis min is 0", () => {
        // Generate ticks from 0 to 100 with a step of 10
        expect(generateTickLocations(10, 0, 100, 0)).toEqual([
            0, 10, 20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });

    it("should generate the 0 minimum tick when the other axis min is positive", () => {
        // Generate ticks from 0 to 100 with a step of 10
        expect(generateTickLocations(10, 0, 100, 10)).toEqual([
            0, 10, 20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });

    it("should generate the positive minimum tick when the other axis min is 0", () => {
        // Generate ticks from 20 to 100 with a step of 10
        expect(generateTickLocations(10, 20, 100, 0)).toEqual([
            20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });

    it("should generate the positive minimum tick when the other axis min is positive", () => {
        // Generate ticks from 20 to 100 with a step of 10
        expect(generateTickLocations(10, 20, 100, 10)).toEqual([
            20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });
});

describe("shouldShowLabel", () => {
    it("should show label when y-axis is not at -tickStep", () => {
        const currentTick = 1;
        const range: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];
        const tickStep = 1;
        expect(shouldShowLabel(currentTick, range, tickStep)).toBe(true);
    });

    it("should hide label when currentTick equals -tickStep and the y-axis is within the graph bounds", () => {
        const currentTick = -0.5;
        const range: [Interval, Interval] = [
            [-3, 3],
            [-3, 3],
        ];
        const tickStep = 0.5;
        expect(shouldShowLabel(currentTick, range, tickStep)).toBe(false);
    });

    it("should show label when currentTick equals -tickStep but y-axis is outside of the graph bounds", () => {
        const currentTick = 1;
        const range: [Interval, Interval] = [
            [1, 10],
            [-10, 10],
        ];
        const tickStep = 1;
        expect(shouldShowLabel(currentTick, range, tickStep)).toBe(true);
    });
});
describe("countSignificantDecimals", () => {
    test.each`
        tickStep   | expected
        ${0.3}     | ${1}
        ${0.03}    | ${2}
        ${0.003}   | ${3}
        ${0.0003}  | ${4}
        ${0.00003} | ${5}
    `(
        "should correctly calculate the number of decimal places for $tickStep",
        ({tickStep, expected}) => {
            // Act
            const decimalPlaces = countSignificantDecimals(tickStep);

            expect(decimalPlaces).toBe(expected);
        },
    );
});

describe("divideByAndShowPi", () => {
    it.each`
        value           | expected
        ${Math.PI}      | ${"π"}
        ${-1 * Math.PI} | ${"-π"}
        ${0}            | ${"0"}
        ${Math.PI * 2}  | ${"2π"}
        ${Math.PI * -2} | ${"-2π"}
        ${Math.PI / 2}  | ${"0.5π"}
        ${Math.PI / -2} | ${"-0.5π"}
    `("should display $expected as a multiple of pi", ({value, expected}) => {
        // Arrange

        // Act
        const result = divideByAndShowPi(value);

        // Assert
        expect(result).toBe(expected);
    });
});
