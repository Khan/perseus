import scoreFreeResponse from "./score-free-response";

describe("scoreFreeResponse", () => {
    it("should return 1 point for a correct answer", () => {
        const userInput = {
            currentValue: "The answer is 42.",
        };
        const rubric = {
            question:
                "What is the answer to life, the universe, and everything?",
            scoringCriteria: [
                {
                    text: "Must contain 42",
                },
            ],
        };

        const score = scoreFreeResponse(userInput, rubric, "en");
        expect(score).toEqual({
            type: "points",
            earned: 1,
            total: 1,
        });
    });
});
