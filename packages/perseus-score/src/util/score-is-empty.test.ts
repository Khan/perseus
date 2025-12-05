import scoreIsEmpty from "./score-is-empty";

describe("scoreIsEmpty", () => {
    it("returns true for invalid score with no message", () => {
        const score = {type: "invalid" as const, message: null};
        expect(scoreIsEmpty(score)).toBe(true);
    });

    it("returns true for invalid score with empty string message", () => {
        const score = {type: "invalid" as const, message: ""};
        expect(scoreIsEmpty(score)).toBe(true);
    });

    it("returns false for invalid score with a message", () => {
        const score = {type: "invalid" as const, message: "Please try again"};
        expect(scoreIsEmpty(score)).toBe(false);
    });

    it("returns false for points score", () => {
        const score = {
            type: "points" as const,
            earned: 1,
            total: 1,
            message: null,
        };
        expect(scoreIsEmpty(score)).toBe(false);
    });

    it("returns false for points score with zero points", () => {
        const score = {
            type: "points" as const,
            earned: 0,
            total: 1,
            message: null,
        };
        expect(scoreIsEmpty(score)).toBe(false);
    });
});
