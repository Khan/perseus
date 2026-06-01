import {scoreAngle} from "./score-angle";

import type {PerseusGraphTypeAngle} from "@khanacademy/perseus-core";

describe("scoreAngle", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypeAngle = {type: "angle"};
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [-5, 0],
                [0, 0],
                [5, 5],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct for congruent match when angles have the same measure", () => {
        // Both are 90-degree angles at the origin; guess arms are 2 units, rubric arms are 1 unit.
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [2, 0],
                [0, 0],
                [0, 2],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            match: "congruent",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for congruent match when angles have different measures", () => {
        // guess is a 45-degree angle; rubric is a 90-degree angle.
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            match: "congruent",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct for exact match when vertex matches and arms are collinear with correct rays", () => {
        // guess arms are twice as long but collinear with the correct rays.
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [2, 0],
                [0, 0],
                [0, 2],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for exact match when vertex does not match", () => {
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [2, 0],
                [1, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns incorrect for exact match when arms are not collinear with correct rays", () => {
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [1, 2],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("reverses coords and returns correct when angle is clockwise and allowReflexAngles is false", () => {
        // guess coords are in clockwise order (reflex direction); with allowReflexAngles false,
        // they are reversed before scoring and then match the rubric's reversed ordering.
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [-5, 0],
                [0, 0],
                [5, 5],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            allowReflexAngles: false,
            coords: [
                [5, 5],
                [0, 0],
                [-5, 0],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("does not reverse coords when allowReflexAngles is true, even for clockwise angles", () => {
        // coords are in clockwise order but allowReflexAngles allows it, so no reversal.
        const userInput: PerseusGraphTypeAngle = {
            type: "angle",
            coords: [
                [5, 0],
                [0, 0],
                [-5, -5],
            ],
        };
        const rubric: PerseusGraphTypeAngle = {
            type: "angle",
            allowReflexAngles: true,
            coords: [
                [5, 0],
                [0, 0],
                [-5, -5],
            ],
        };

        expect(scoreAngle(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });
});
