import {inset, isInBound} from "./box";

import type {Box} from "./box";
import type {Interval} from "@khanacademy/perseus-core";

describe("inset", () => {
    it("does nothing given amount [0, 0]", () => {
        const box: Box = [
            [1, 2],
            [3, 4],
        ];
        expect(inset([0, 0], box)).toEqual([
            [1, 2],
            [3, 4],
        ]);
    });

    it("does not mutate the given box", () => {
        const box: Box = [
            [0, 9],
            [1, 10],
        ];
        inset([1, 1], box);
        expect(box).toEqual([
            [0, 9],
            [1, 10],
        ]);
    });

    it("shrinks the box horizontally", () => {
        const box: Box = [
            [0, 9],
            [1, 10],
        ];
        expect(inset([1, 0], box)).toEqual([
            [1, 8],
            [1, 10],
        ]);
    });

    it("shrinks the box vertically", () => {
        const box: Box = [
            [0, 9],
            [1, 10],
        ];
        expect(inset([0, 1], box)).toEqual([
            [0, 9],
            [2, 9],
        ]);
    });

    it("shrinks in both dimensions", () => {
        const box: Box = [
            [0, 9],
            [1, 10],
        ];
        expect(inset([1, 1], box)).toEqual([
            [1, 8],
            [2, 9],
        ]);
    });

    it("expands the box given a negative amount", () => {
        const box: Box = [
            [0, 9],
            [1, 10],
        ];
        expect(inset([-1, -1], box)).toEqual([
            [-1, 10],
            [0, 11],
        ]);
    });

    it("does not create an invalid box if the amount is too big", () => {
        const box: Box = [
            [0, 1],
            [0, 1],
        ];
        expect(inset([9, 9], box)).toEqual([
            [0.5, 0.5],
            [0.5, 0.5],
        ]);
    });
});

describe("isInBound", () => {
    it("returns true when the point is within the bounds of the graph", () => {
        const interval: [Interval, Interval] = [
            [-10, 10],
            [-10, 10],
        ];
        expect(isInBound({range: interval, point: [0, 0]})).toBeTruthy();
    });

    it.each([
        [20, 20],
        [-20, 20],
        [-20, -20],
        [20, -20],
    ])(
        "returns false when the point [%d, %d] is outside the bounds of the graph",
        (pointX, pointY) => {
            const interval: [Interval, Interval] = [
                [-10, 10],
                [-10, 10],
            ];
            expect(
                isInBound({range: interval, point: [pointX, pointY]}),
            ).toBeFalsy();
        },
    );
});
