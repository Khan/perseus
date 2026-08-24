import {scoreSegment} from "./score-segment";

import type {PerseusGraphTypeSegment} from "@khanacademy/perseus-core";

describe("scoreSegment", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypeSegment = {type: "segment"};
        const correct: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };

        expect(scoreSegment(userInput, correct)).toHaveInvalidInput();
    });

    it("returns invalid when correct has no coords", () => {
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };
        const correct: PerseusGraphTypeSegment = {type: "segment"};

        expect(scoreSegment(userInput, correct)).toHaveInvalidInput();
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
        const correct: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
        };

        expect(scoreSegment(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct when multiple segments are in a different order", () => {
        // Two segments given in opposite order from the correct.
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
        const correct: PerseusGraphTypeSegment = {
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

        expect(scoreSegment(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect when segment does not match correct", () => {
        const userInput: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
        };
        const correct: PerseusGraphTypeSegment = {
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [2, 2],
                ],
            ],
        };

        expect(
            scoreSegment(userInput, correct),
        ).toHaveBeenAnsweredIncorrectly();
    });
});
