import {scoreLinear} from "./score-linear";

import type {PerseusGraphTypeLinear} from "@khanacademy/perseus-core";

describe("scoreLinear", () => {
    it("returns invalid score when missing user input data", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const correct: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing correct data", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const correct: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const score = scoreLinear(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when answer is correct", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const correct: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, correct);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when answer is incorrect", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [1, -1],
                [1, 1],
            ],
        };
        const correct: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, correct);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
