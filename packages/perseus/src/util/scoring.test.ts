import {isCorrect} from "./scoring";

describe("isCorrect", () => {
    it("is true given a score with all points earned", () => {
        const score = {type: "points", earned: 3, total: 3} as const;
        expect(isCorrect(score)).toBe(true);
    });

    it("is false given a score with some points unearned", () => {
        const score = {type: "points", earned: 2, total: 3} as const;
        expect(isCorrect(score)).toBe(false);
    });

    it("is false given an unanswered / invalid score", () => {
        const score = {type: "invalid"} as const;
        expect(isCorrect(score)).toBe(false);
    });
});
