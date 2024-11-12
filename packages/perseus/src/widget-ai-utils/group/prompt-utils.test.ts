import {getPromptJSON} from "./prompt-utils";

import type {RendererPromptJSON} from "../../prompt-types";

describe("Group getPromptJSON", () => {
    it("should return a GroupPromptJSON with default values when rendererJSON is undefined", () => {
        const result = getPromptJSON(undefined);

        expect(result).toEqual({
            type: "group",
            content: "",
            widgets: {},
        });
    });

    it("should return a GroupPromptJSON when rendererJSON has multiple widgets", () => {
        // Arrange
        const rendererJSON: RendererPromptJSON = {
            content:
                "**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**\n\n[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    hasNoneOfTheAbove: false,
                    options: [
                        {value: "$45$"},
                        {value: "$42$"},
                        {value: "$30$"},
                        {value: "$18$"},
                        {value: "$15$"},
                    ],
                    userInput: {
                        selectedOptions: [false, false, false, false, false],
                    },
                },
                "matrix 1": {
                    type: "matrix",
                    options: {
                        height: 3,
                        width: 3,
                    },
                    userInput: {
                        answerRows: [
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                        ],
                    },
                },
            },
        };

        // Act
        const result = getPromptJSON(rendererJSON);

        // Assert
        expect(result).toEqual({
            type: "group",
            content:
                "**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**\n\n[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    hasNoneOfTheAbove: false,
                    options: [
                        {value: "$45$"},
                        {value: "$42$"},
                        {value: "$30$"},
                        {value: "$18$"},
                        {value: "$15$"},
                    ],
                    userInput: {
                        selectedOptions: [false, false, false, false, false],
                    },
                },
                "matrix 1": {
                    type: "matrix",
                    options: {
                        height: 3,
                        width: 3,
                    },
                    userInput: {
                        answerRows: [
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                        ],
                    },
                },
            },
        });
    });
});
