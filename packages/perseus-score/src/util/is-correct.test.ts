import {isCorrect} from "./is-correct";

describe("isCorrect", () => {
    it("is true given a score with all points earned", () => {
        // Arrange
        const score = {type: "points", earned: 3, total: 3} as const;

        // Act, Assert
        expect(isCorrect(score)).toBe(true);
    });

    it("is false given a score with some points unearned", () => {
        // Arrange
        const score = {type: "points", earned: 2, total: 3} as const;

        // Act, Assert
        expect(isCorrect(score)).toBe(false);
    });

    it("is false given an unanswered / invalid score", () => {
        // Arrange
        const score = {type: "invalid"} as const;

        // Act, Assert
        expect(isCorrect(score)).toBe(false);
    });
});
