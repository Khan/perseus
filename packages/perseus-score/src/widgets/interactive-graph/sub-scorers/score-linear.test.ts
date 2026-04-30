import {scoreLinear} from "./score-linear";

import type {PerseusGraphTypeLinear} from "@khanacademy/perseus-core";

describe("scoreLinear", () => {
    it("returns invalid score when missing user input data", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const rubric: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric data", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const score = scoreLinear(userInput, rubric);

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
        const rubric: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when answer is incorrect", () => {
        const userInput: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-2, -2],
                [2, 2],
            ],
        };
        const rubric: PerseusGraphTypeLinear = {
            type: "linear",
            coords: [
                [-1, -1],
                [1, 1],
            ],
        };
        const score = scoreLinear(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
