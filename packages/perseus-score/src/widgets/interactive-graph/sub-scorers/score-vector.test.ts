import {scoreVector} from "./score-vector";

import type {PerseusGraphTypeVector} from "@khanacademy/perseus-core";

describe("scoreVector", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypeVector = {type: "vector"};
        const correct: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(scoreVector(userInput, correct)).toHaveInvalidInput();
    });

    it("returns invalid when correct has no coords", () => {
        const userInput: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const correct: PerseusGraphTypeVector = {type: "vector"};

        expect(scoreVector(userInput, correct)).toHaveInvalidInput();
    });

    it("returns correct for exact match with same tail and tip", () => {
        const userInput: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };
        const correct: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scoreVector(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for exact match when positions differ", () => {
        const userInput: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };
        const correct: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scoreVector(userInput, correct)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct for congruent match when delta is the same", () => {
        // guess: tail (2,3), tip (4,5) → delta [2,2]
        // correct: tail (0,0), tip (2,2) → delta [2,2]
        const userInput: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [2, 3],
                [4, 5],
            ],
        };
        const correct: PerseusGraphTypeVector = {
            type: "vector",
            match: "congruent",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };

        expect(scoreVector(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for congruent match when delta differs", () => {
        // guess: tail (0,0), tip (1,2) → delta [1,2]
        // correct: tail (0,0), tip (2,2) → delta [2,2]
        const userInput: PerseusGraphTypeVector = {
            type: "vector",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const correct: PerseusGraphTypeVector = {
            type: "vector",
            match: "congruent",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };

        expect(scoreVector(userInput, correct)).toHaveBeenAnsweredIncorrectly();
    });
});
