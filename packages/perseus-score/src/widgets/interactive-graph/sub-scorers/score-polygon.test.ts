import {scorePolygon} from "./score-polygon";

import type {PerseusGraphTypePolygon} from "@khanacademy/perseus-core";

describe("scorePolygon", () => {
    it("returns invalid when user input has no coords", () => {
        const userInput: PerseusGraphTypePolygon = {type: "polygon"};
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns invalid when rubric has no coords", () => {
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {type: "polygon"};

        expect(scorePolygon(userInput, rubric)).toHaveInvalidInput();
    });

    it("returns correct for similar match when polygon is scaled", () => {
        // Same right-isosceles triangle scaled 2x — same angles, proportional sides.
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [4, 0],
                [0, 4],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "similar",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for similar match when polygons have different angles", () => {
        // A right-isosceles triangle vs a 30-60-90-like triangle — different angles.
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 1],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "similar",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct for congruent match when polygons are the same size", () => {
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "congruent",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for congruent match when polygon is scaled", () => {
        // Similar shape but 2x scale — angles match but sides do not.
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [4, 0],
                [0, 4],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "congruent",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct for approx match when sides are within 0.1", () => {
        // Legs differ by 0.05 — within the 0.1 approx tolerance.
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2.05, 0],
                [0, 2.05],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "approx",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for approx match when sides differ by more than 0.1", () => {
        // Legs differ by 0.2 — exceeds the 0.1 approx tolerance.
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2.2, 0],
                [0, 2.2],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            match: "approx",
            coords: [
                [0, 0],
                [2, 0],
                [0, 2],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });

    it("returns correct for exact match when vertices are in the same order", () => {
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns correct for exact match when vertices are in a different order", () => {
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [1, 0],
                [0, 0],
                [0, 1],
                [1, 1],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredCorrectly();
    });

    it("returns incorrect for exact match when polygon does not match", () => {
        const userInput: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [2, 0],
                [2, 2],
                [0, 2],
            ],
        };
        const rubric: PerseusGraphTypePolygon = {
            type: "polygon",
            coords: [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        };

        expect(scorePolygon(userInput, rubric)).toHaveBeenAnsweredIncorrectly();
    });
});
