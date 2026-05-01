import {scorePoint} from "./score-point";

import type {PerseusGraphTypePoint} from "@khanacademy/perseus-core";

describe("scorePoint", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypePoint = {type: "point"};
        const rubric: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };

        expect(scorePoint(userInput, rubric)).toHaveInvalidInput();
    });

    it("throws when rubric has null coords", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };
        const rubric: PerseusGraphTypePoint = {type: "point", coords: null};

        expect(() => scorePoint(userInput, rubric)).toThrow(
            "Point graph rubric has null coords",
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
        const rubric: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scorePoint(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct when coords match in different order", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [3, 4],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypePoint = {
            type: "point",
            coords: [
                [1, 2],
                [3, 4],
            ],
        };

        expect(scorePoint(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect when coords do not match", () => {
        const userInput: PerseusGraphTypePoint = {
            type: "point",
            coords: [[5, 6]],
        };
        const rubric: PerseusGraphTypePoint = {
            type: "point",
            coords: [[1, 2]],
        };

        expect(scorePoint(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });
});
