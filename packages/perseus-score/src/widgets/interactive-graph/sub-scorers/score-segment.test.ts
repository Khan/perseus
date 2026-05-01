import {scoreSegment} from "./score-segment";

import type {PerseusGraphTypeSegment} from "@khanacademy/perseus-core";

describe("scoreSegment", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypeSegment = {type: "segment"};
        const rubric: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };

        expect(scoreSegment(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid when rubric has no coords", () => {
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeSegment = {type: "segment"};

        expect(scoreSegment(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct when segment endpoints are in reversed order", () => {
        // Same segment, but the user placed the endpoints in the opposite order.
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [3, 4],
                    [1, 2],
                ],
            ],
        };
        const rubric: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        expect(scoreSegment(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct when multiple segments are in a different order", () => {
        // Two segments given in opposite order from the rubric.
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [5, 6],
                    [7, 8],
                ],
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };
        const rubric: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
                [
                    [5, 6],
                    [7, 8],
                ],
            ],
        };

        expect(scoreSegment(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect when segment does not match rubric", () => {
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [2, 2],
                ],
            ],
        };

        expect(scoreSegment(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });
});
