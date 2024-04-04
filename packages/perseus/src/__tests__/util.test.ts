import Util, {isCorrect} from "../util";

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

describe("#constrainedTickStepsFromTickSteps", () => {
    it("should not changes the tick steps if there are fewer than (or exactly) 10 steps", () => {
        const result = Util.constrainedTickStepsFromTickSteps(
            [1, 1],
            [
                [0, 10],
                [0, 10],
            ],
        );

        expect(result).toEqual([1, 1]);
    });

    it("should should double the tick step size if there are more than 10 but fewer than (or exactly) 20 steps", () => {
        const result = Util.constrainedTickStepsFromTickSteps(
            [1, 1],
            [
                [0, 20],
                [0, 20],
            ],
        );

        expect(result).toEqual([2, 2]);
    });

    it("should use the value returned by tickStepFromNumTicks", () => {
        jest.spyOn(Util, "tickStepFromNumTicks").mockReturnValue(5);
        const result = Util.constrainedTickStepsFromTickSteps(
            [1, 1],
            [
                [0, 50],
                [0, 50],
            ],
        );

        expect(result).toEqual([5, 5]);
    });
});

describe("deepClone", () => {
    it("does nothing to a primitive", () => {
        expect(Util.deepClone(3)).toBe(3);
    });

    it("copies an array", () => {
        const input = [1, 2, 3];

        const result = Util.deepClone(input);

        expect(result).toEqual(input);
        expect(result).not.toBe(input);
    });

    it("recursively clones array elements", () => {
        const input = [[1]];

        const result = Util.deepClone(input);

        expect(result).toEqual(input);
        expect(result[0]).not.toBe(input[0]);
    });
});
