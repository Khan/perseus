import {clockwise, polygonSidesIntersect, reverseVector} from "./geometry";

describe("reverseVector", () => {
    it("flips the sign of zero", () => {
        // This is a characterization test for legacy behavior. It might not
        // actually be desired behavior.
        expect(reverseVector([0, 0])).toEqual([-0, -0]);
    });

    it("flips the sign of each component", () => {
        expect(reverseVector([1, -5])).toEqual([-1, 5]);
    });
});

describe("clockwise", () => {
    it("returns false given no points", () => {
        expect(clockwise([])).toBe(false);
    });

    it("returns false given a single point at the origin", () => {
        expect(clockwise([[0, 0]])).toBe(false);
    });

    it("returns false given a single point not at the origin", () => {
        expect(clockwise([[7, 7]])).toBe(false);
    });

    it("returns false given two identical points", () => {
        expect(
            clockwise([
                [7, 7],
                [7, 7],
            ]),
        ).toBe(false);
    });

    it("returns false given two different points", () => {
        expect(
            clockwise([
                [8, 8],
                [7, 7],
            ]),
        ).toBe(false);
    });

    it("returns true given a clockwise triangle in the first quadrant", () => {
        expect(
            clockwise([
                [0, 1],
                [1, 0],
                [0, 0],
            ]),
        ).toBe(true);
    });

    it("returns false given a counter-clockwise triangle in the first quadrant", () => {
        expect(
            clockwise([
                [1, 0],
                [0, 1],
                [0, 0],
            ]),
        ).toBe(false);
    });

    it("returns true given a clockwise triangle in the second quadrant", () => {
        expect(
            clockwise([
                [0, 1],
                [0, 0],
                [-1, 0],
            ]),
        ).toBe(true);
    });
});

describe("polygonSidesIntersect", () => {
    it("is false given an ordinary triangle", () => {
        expect(polygonSidesIntersect([[0, 0], [1, 0], [0, 1]])).toBe(false)
    })

    it("is true given a 'triangle' with two vertices the same", () => {
        expect(polygonSidesIntersect([[0, 0], [1, 0], [1, 0]])).toBe(true)
    })

    it("is true given a quadrilateral with intersecting sides", () => {
        expect(polygonSidesIntersect([[0, 0], [2, 2], [0, 2], [2, 0]])).toBe(true)
    })

    it("is false given a quadrilateral with non-intersecting sides", () => {
        expect(polygonSidesIntersect([[0, 0], [2, 0], [2, 2], [0, 2]])).toBe(false)
    })
})
