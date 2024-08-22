import {snap} from "./snap";

describe("snap", () => {
    it("snaps to next position when over halfway to it", () => {
        const result = snap([2, 2], [1.1, 1.1]);

        expect(result).toEqual([2, 2]);
    });

    it("does not snap to next position when less than halfway to it", () => {
        const result = snap([2, 2], [0.9, 0.9]);

        expect(result).toEqual([0, 0]);
    });
});
