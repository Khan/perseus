import {scorePoint} from "./score-point";

import type {PerseusGraphTypePoint} from "@khanacademy/perseus-core";

describe("scorePoint", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypePoint = {type: "point"};
        const correct: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };

        expect(scorePoint(userInput, correct)).toHaveInvalidInput();
    });

    it("throws when correct has null coords", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };
        const correct: PerseusGraphTypePoint = {type: "point", coords: null};

        expect(() => scorePoint(userInput, correct)).toThrow(
            "Point graph correct has null coords",
        );
    });

    it("returns correct when coords match in the same order", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };
        const correct: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scorePoint(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct when coords match in different order", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [3, 4],
                [1, 2],
            ],
        };
        const correct: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scorePoint(userInput, correct)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect when coords do not match", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [[5, 6]],
        };
        const correct: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };

        expect(scorePoint(userInput, correct)).toHaveBeenAnsweredIncorrectly();
    });
});
