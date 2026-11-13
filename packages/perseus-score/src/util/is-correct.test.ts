import {isCorrect} from "./is-correct";

import type {PerseusScore} from "@khanacademy/perseus-core";

describe("isCorrect", () => {
    it("is true given a score with all points earned", () => {
        // Arrange
        const score: PerseusScore = {type: "points", earned: 3, total: 3};

        // Act, Assert
        expect(isCorrect(score)).toBe(true);
    });

    it("is true given 0 of 0 points earned", () => {
        // Arrange
        const score: PerseusScore = {type: "points", earned: 0, total: 0};

        // Act, Assert
        expect(isCorrect(score)).toBe(true);
    });

    it("is true given extra points earned", () => {
        // Arrange
        const score: PerseusScore = {type: "points", earned: 2, total: 1};

        // Act, Assert
        expect(isCorrect(score)).toBe(true);
    });

    it("is false given a score with some points unearned", () => {
        // Arrange
        const score: PerseusScore = {type: "points", earned: 2, total: 3};

        // Act, Assert
        expect(isCorrect(score)).toBe(false);
    });

    it("is false given an unanswered / invalid score", () => {
        // Arrange
        const score: PerseusScore = {type: "invalid"};

        // Act, Assert
        expect(isCorrect(score)).toBe(false);
    });
});
