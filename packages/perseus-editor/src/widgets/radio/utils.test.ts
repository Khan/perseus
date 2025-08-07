import {getMovedChoices} from "./utils";

const choices = [
    {id: "0-0-0-0-0", content: "Choice 1"},
    {id: "3-3-3-3-3", content: "Choice 2"},
    {id: "4-4-4-4-4", content: "Choice 3"},
    {id: "5-5-5-5-5", content: "Choice 4"},
];

const choicesWithNoneOfTheAbove = [
    {id: "0-0-0-0-0", content: "Choice 1"},
    {
        id: "3-3-3-3-3",
        content: "Choice 2",
    },
    {id: "4-4-4-4-4", content: "Choice 3"},
    {
        id: "5-5-5-5-5",
        content: "None of the above",
        isNoneOfTheAbove: true,
    },
];

describe("getMovedChoices", () => {
    it("should move the choice to the top", () => {
        // Move choice 4 to the top
        const result = getMovedChoices(choices, false, 3, "top");
        expect(result).toEqual([
            choices[3],
            choices[0],
            choices[1],
            choices[2],
        ]);
    });

    it("should return original choices if the choice is already at the top", () => {
        // Move choice 1 to the top
        const result = getMovedChoices(choices, false, 0, "top");
        expect(result).toEqual(choices);
    });

    it("should move the choice up", () => {
        // Move choice 3 up
        const result = getMovedChoices(choices, false, 2, "up");
        expect(result).toEqual([
            choices[0],
            choices[2],
            choices[1],
            choices[3],
        ]);
    });

    it("should return original choices if the choice is already at the top", () => {
        // Move choice 1 up
        const result = getMovedChoices(choices, false, 0, "up");
        expect(result).toEqual(choices);
    });

    it("should move the choice down", () => {
        // Move choice 2 down
        const result = getMovedChoices(choices, false, 1, "down");
        expect(result).toEqual([
            choices[0],
            choices[2],
            choices[1],
            choices[3],
        ]);
    });

    it("should return original choices if the choice is already at the bottom", () => {
        // Move choice 4 down
        const result = getMovedChoices(choices, false, 3, "down");
        expect(result).toEqual(choices);
    });

    it("should return original choices if the choice is last before 'None of the above' choice", () => {
        // Move choice 3 down
        const result = getMovedChoices(
            choicesWithNoneOfTheAbove,
            true,
            2,
            "down",
        );
        expect(result).toEqual(choicesWithNoneOfTheAbove);
    });

    it("should move the choice to the bottom", () => {
        // Move choice 1 to the bottom
        const result = getMovedChoices(choices, false, 0, "bottom");
        expect(result).toEqual([
            choices[1],
            choices[2],
            choices[3],
            choices[0],
        ]);
    });

    it("should return original choices if the choice is already at the bottom", () => {
        // Move choice 4 to the bottom
        const result = getMovedChoices(choices, false, 3, "bottom");
        expect(result).toEqual(choices);
    });

    it("should move choice to last choice before 'None of the above'", () => {
        // Move choice 1 to bottom (last choice before 'None of the above')
        const result = getMovedChoices(
            choicesWithNoneOfTheAbove,
            true,
            0,
            "bottom",
        );
        expect(result).toEqual([
            choicesWithNoneOfTheAbove[1],
            choicesWithNoneOfTheAbove[2],
            choicesWithNoneOfTheAbove[0],
            choicesWithNoneOfTheAbove[3],
        ]);
    });
});
