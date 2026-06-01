import {scoreRay} from "./score-ray";

import type {PerseusGraphTypeRay} from "@khanacademy/perseus-core";

describe("scoreRay", () => {
    it("returns invalid score when missing user input coords", () => {
        const userInput: PerseusGraphTypeRay = {type: "ray"};
        const rubric: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(scoreRay(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid score when missing rubric coords", () => {
        const userInput: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeRay = {type: "ray"};

        expect(scoreRay(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct score when start matches and direction point is collinear", () => {
        // Ray from (0,0) toward (1,1); guess uses a different direction point
        // on the same ray (2,2 is collinear with origin toward (1,1)).
        const userInput: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };
        const rubric: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(scoreRay(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect score when start point does not match", () => {
        const userInput: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [1, 0],
                [2, 1],
            ],
        };
        const rubric: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(scoreRay(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns incorrect score when direction is not collinear with correct ray", () => {
        const userInput: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypeRay = {
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(scoreRay(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });
});
