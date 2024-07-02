import {Box, ensureValid, inset} from "./box";

describe("inset", () => {
    it("does nothing given amount [0, 0]", () => {
        const box: Box = [[1, 2], [3, 4]];
        expect(inset([0, 0], box)).toEqual([[1, 2], [3, 4]]);
    });

    it("does not mutate the given box", () => {
        const box: Box = [[0, 9], [1, 10]];
        inset([1, 1], box);
        expect(box).toEqual([[0, 9], [1, 10]])
    })

    it("shrinks the box horizontally", () => {
        const box: Box = [[0, 9], [1, 10]];
        expect(inset([1, 0], box)).toEqual([[1, 8], [1, 10]])
    });

    it("shrinks the box vertically", () => {
        const box: Box = [[0, 9], [1, 10]];
        expect(inset([0, 1], box)).toEqual([[0, 9], [2, 9]])
    });

    it("shrinks in both dimensions", () => {
        const box: Box = [[0, 9], [1, 10]];
        expect(inset([1, 1], box)).toEqual([[1, 8], [2, 9]])
    });

    it("expands the box given a negative amount", () => {
        const box: Box = [[0, 9], [1, 10]];
        expect(inset([-1, -1], box)).toEqual([[-1, 10], [0, 11]])
    });

    it("does not create an invalid box", () => {
        const box: Box = [[0, 1], [0, 1]];
        expect(inset([9, 9], box)).toEqual([[0.5, 0.5], [0.5, 0.5]])
    });
});

describe("ensureValid", () => {
    it("does nothing given a valid box", () => {
        const box: Box = [[0, 1], [2, 3]];
        expect(ensureValid(box)).toEqual([[0, 1], [2, 3]]);
    })

    it("fixes a box where the min values are greater than the max", () => {
        const box: Box = [[4, 0], [10, 1]];
        expect(ensureValid(box)).toEqual([[2, 2], [5.5, 5.5]]);
    })

    it("does not mutate the given box", () => {
        const box: Box = [[4, 0], [10, 1]];
        ensureValid(box)
        expect(box).toEqual([[4, 0], [10, 1]])
    })
})
