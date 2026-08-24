import {scoreExponential} from "./score-exponential";

import type {PerseusGraphTypeExponential} from "@khanacademy/perseus-core";

describe("scoreExponential", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            asymptote: 3,
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing user asymptote", () => {
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing correct coords", () => {
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            asymptote: 3,
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing correct asymptote", () => {
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when exponential coefficients match", () => {
        // f(x) = 2·e^x + 3, coords [0,5] and [1,11] lie on this curve
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when exponential coefficients do not match", () => {
        // Different curve: f(x) = 4·(1/4)^x, asymptote y=0
        const userInput: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 4],
                [1, 1],
            ],
            asymptote: 0,
        };
        const correct: PerseusGraphTypeExponential = {
            type: "exponential",
            coords: [
                [0, 5],
                [1, 11],
            ],
            asymptote: 3,
        };

        const score = scoreExponential(userInput, correct);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
