import {generateTickLocations, shouldShowLabel} from "./axis-ticks";

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
    it("should show label when y-axis is not at -1", () => {
        expect(
            shouldShowLabel(0, [
                [-10, 10],
                [-10, 10],
            ]),
        ).toBe(true);
    });

    it("should hide label when y-axis is at -1 and within the graph bounds", () => {
        expect(
            shouldShowLabel(-1, [
                [-10, 10],
                [-10, 10],
            ]),
        ).toBe(false);
    });

    it("should show label when y-axis is not at -1 and exists outside of the graph bounds", () => {
        expect(
            shouldShowLabel(-1, [
                [1, 10],
                [-10, 10],
            ]),
        ).toBe(true);
    });
});
