import {scoreCircle} from "./score-circle";

import type {PerseusGraphTypeCircle} from "@khanacademy/perseus-core";

describe("scoreCircle", () => {
    it("returns invalid when user input has no center", () => {
        const userInput: PerseusGraphTypeCircle = {type: "circle", radius: 5};
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
            radius: 5,
        };

        expect(scoreCircle(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid when user input has no radius", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
        };
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
            radius: 5,
        };

        expect(scoreCircle(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid when rubric has no center", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
            radius: 5,
        };
        const rubric: PerseusGraphTypeCircle = {type: "circle", radius: 5};

        expect(scoreCircle(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid when rubric has no radius", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
            radius: 5,
        };
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [0, 0],
        };

        expect(scoreCircle(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct when center and radius match", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [2, 3],
            radius: 4,
        };
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [2, 3],
            radius: 4,
        };

        expect(scoreCircle(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect when center does not match", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [1, 1],
            radius: 4,
        };
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [2, 3],
            radius: 4,
        };

        expect(scoreCircle(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns incorrect when radius does not match", () => {
        const userInput: PerseusGraphTypeCircle = {
            type: "circle",
            center: [2, 3],
            radius: 7,
        };
        const rubric: PerseusGraphTypeCircle = {
            type: "circle",
            center: [2, 3],
            radius: 4,
        };

        expect(scoreCircle(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });
});
