import flattenScores from "./flatten-scores";

describe("flattenScores", () => {
    it("defaults to an empty score", () => {
        const result = flattenScores({});

        expect(result).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
        expect(result).toEqual({
            type: "points",
            total: 0,
            earned: 0,
            message: null,
        });
    });

    it("defaults to single score if there is only one", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
        });

        expect(result).toHaveBeenAnsweredCorrectly();
        expect(result).toEqual({
            type: "points",
            total: 1,
            earned: 1,
            message: null,
        });
    });

    it("returns an invalid score if any are invalid", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "invalid",
                message: null,
            },
        });

        expect(result).toHaveInvalidInput();
        expect(result).toEqual({
            type: "invalid",
            message: null,
        });
    });

    it("tallies scores if multiple widgets have points", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 3": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
        });

        expect(result).toHaveBeenAnsweredCorrectly();
        expect(result).toEqual({
            type: "points",
            total: 3,
            earned: 3,
            message: null,
        });
    });

    it("doesn't count incorrect widgets", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 3": {
                type: "points",
                total: 1,
                earned: 0,
                message: null,
            },
        });

        expect(result).toEqual({
            type: "points",
            total: 3,
            earned: 2,
            message: null,
        });
    });
});
