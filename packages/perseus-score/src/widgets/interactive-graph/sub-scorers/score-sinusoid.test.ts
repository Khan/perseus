import {scoreSinusoid} from "./score-sinusoid";

import type {PerseusGraphTypeSinusoid} from "@khanacademy/perseus-core";

describe("scoreSinusoid", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
        };
        const rubric: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreSinusoid(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric coords", () => {
        const userInput: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
        };

        const score = scoreSinusoid(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when sinusoid coefficients match", () => {
        const userInput: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreSinusoid(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when sinusoid coefficients do not match", () => {
        const userInput: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            // amplitude 2, different from rubric
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreSinusoid(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct score for canonically equivalent phase-shifted sinusoids", () => {
        // [[0,0],[1,1]] → phase=0; [[4,0],[5,1]] → phase=2π → canonical phase=0
        // Both represent the same underlying sine curve.
        const userInput: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [4, 0],
                [5, 1],
            ],
        };
        const rubric: PerseusGraphTypeSinusoid = {
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreSinusoid(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
