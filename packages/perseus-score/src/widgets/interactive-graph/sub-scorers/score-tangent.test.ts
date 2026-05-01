import {scoreTangent} from "./score-tangent";

import type {PerseusGraphTypeTangent} from "@khanacademy/perseus-core";

describe("scoreTangent", () => {
    it("returns invalid score when missing user coords", () => {
        const userInput: PerseusGraphTypeTangent = {
            type: "tangent",
        };
        const rubric: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreTangent(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric coords", () => {
        const userInput: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeTangent = {
            type: "tangent",
        };

        const score = scoreTangent(userInput, rubric);

        expect(score).toHaveInvalidInput();
    });

    it("returns correct score when tangent coefficients match", () => {
        const userInput: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreTangent(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when tangent coefficients do not match", () => {
        const userInput: PerseusGraphTypeTangent = {
            type: "tangent",
            // Different period (x of second point changed)
            coords: [
                [0, 0],
                [2, 1],
            ],
        };
        const rubric: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreTangent(userInput, rubric);

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct score for canonically equivalent tangent curves", () => {
        // Both coords produce f(x) = tan(π/4 * x) — shifted by one full period
        const userInput: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [4, 0],
                [5, 1],
            ],
        };
        const rubric: PerseusGraphTypeTangent = {
            type: "tangent",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const score = scoreTangent(userInput, rubric);

        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
