import {generateTickLocations, shouldShowLabel} from "./axis-ticks";

import type {Interval} from "mafs";

describe("generateTickLocations", () => {
    it("should generate ticks from the origin", () => {
        expect(generateTickLocations(10, 0, 100)).toEqual([
            10, 20, 30, 40, 50, 60, 70, 80, 90,
        ]);
    });

    it("should generate ticks from the origin including negative", () => {
        expect(generateTickLocations(10, -100, 100)).toEqual([
            10, 20, 30, 40, 50, 60, 70, 80, 90, -10, -20, -30, -40, -50, -60,
            -70, -80, -90,
        ]);
    });

    it("should generate ticks from the origin for odd steps", () => {
        expect(generateTickLocations(3, -10, 10)).toEqual([
            3, 6, 9, -3, -6, -9,
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
