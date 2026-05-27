import {scoreAbsoluteValue} from "./score-absolute-value";

import type {PerseusGraphTypeAbsoluteValue} from "@khanacademy/perseus-core";

describe("scoreAbsoluteValue", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
        };
        const rubric: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreAbsoluteValue(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric coords", () => {
        const userInput: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
        };

        const score = scoreAbsoluteValue(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when absolute value coefficients match", () => {
        const userInput: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreAbsoluteValue(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when absolute value coefficients do not match", () => {
        const userInput: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            // Different slope (vertex same, second point y changed)
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypeAbsoluteValue = {
            type: "absolute-value",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreAbsoluteValue(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
