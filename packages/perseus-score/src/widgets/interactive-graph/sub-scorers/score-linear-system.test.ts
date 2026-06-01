import {scoreLinearSystem} from "./score-linear-system";

import type {PerseusGraphTypeLinearSystem} from "@khanacademy/perseus-core";

describe("scoreLinearSystem", () => {
    it("returns invalid score when user input coords are missing", () => {
        const userInput: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
        };
        const rubric: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };

        expect(scoreLinearSystem(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid score when rubric coords are missing", () => {
        const userInput: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
        };

        expect(scoreLinearSystem(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct score when lines match in the same order", () => {
        const userInput: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };

        expect(
            scoreLinearSystem(userInput, rubric),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct score when lines match in swapped order", () => {
        const userInput: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, 1],
                    [1, -1],
                ],
                [
                    [-1, -1],
                    [1, 1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };

        expect(
            scoreLinearSystem(userInput, rubric),
        ).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when lines do not match", () => {
        const userInput: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [0, 0],
                    [1, 2],
                ],
                [
                    [0, 0],
                    [2, 1],
                ],
            ],
        };
        const rubric: PerseusGraphTypeLinearSystem = {
            type: "linear-system",
            coords: [
                [
                    [-1, -1],
                    [1, 1],
                ],
                [
                    [-1, 1],
                    [1, -1],
                ],
            ],
        };

        expect(
            scoreLinearSystem(userInput, rubric),
        ).toHaveBeenAnsweredIncorrectly();
    });
});
