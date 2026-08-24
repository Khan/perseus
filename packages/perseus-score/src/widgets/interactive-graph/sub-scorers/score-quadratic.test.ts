import {scoreQuadratic} from "./score-quadratic";

import type {PerseusGraphTypeQuadratic} from "@khanacademy/perseus-core";

describe("scoreQuadratic", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeQuadratic = {
            type: "quadratic",
        };
        const correct: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 0],
            ],
        };

        const score = scoreQuadratic(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing correct coords", () => {
        const userInput: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 0],
            ],
        };
        const correct: PerseusGraphTypeQuadratic = {
            type: "quadratic",
        };

        const score = scoreQuadratic(userInput, correct);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when parabola coefficients match", () => {
        const userInput: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 0],
            ],
        };
        const correct: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 0],
            ],
        };

        const score = scoreQuadratic(userInput, correct);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when parabola coefficients do not match", () => {
        const userInput: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 2],
                [2, 0],
            ],
        };
        const correct: PerseusGraphTypeQuadratic = {
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 0],
            ],
        };

        const score = scoreQuadratic(userInput, correct);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
