import {generateTickLocations, showTickLabel} from "../axis-ticks";

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

    it("should hide the first negative axis tick label if the gridStep > tickStep", () => {
        const gridStep = 2;
        const tickStep = 1;
        const label = -1;
        expect(showTickLabel(gridStep, tickStep, label)).toEqual(false);
    });

    it("should show the first negative axis tick label if the tickStep > gridStep", () => {
        const gridStep = 1;
        const tickStep = 2;
        const label = -2;
        expect(showTickLabel(gridStep, tickStep, label)).toEqual(true);
    });
});
