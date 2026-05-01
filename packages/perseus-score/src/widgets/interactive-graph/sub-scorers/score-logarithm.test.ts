import {scoreLogarithm} from "./score-logarithm";

import type {PerseusGraphTypeLogarithm} from "@khanacademy/perseus-core";

describe("scoreLogarithm", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            asymptote: 3,
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing user asymptote", () => {
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric coords", () => {
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            asymptote: 3,
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric asymptote", () => {
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when logarithm coefficients match", () => {
        // Inverse of f(x) = 2·e^x + 3; asymptote at x=3, coords [5,0] and [11,1]
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when logarithm coefficients do not match", () => {
        // Different curve: asymptote at x=0, coords [4,0] and [1,1]
        const userInput: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [4, 0],
                [1, 1],
            ],
            asymptote: 0,
        };
        const rubric: PerseusGraphTypeLogarithm = {
            type: "logarithm",
            coords: [
                [5, 0],
                [11, 1],
            ],
            asymptote: 3,
        };

        const score = scoreLogarithm(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
