import {generateTickLocations} from "../axis-ticks";

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
