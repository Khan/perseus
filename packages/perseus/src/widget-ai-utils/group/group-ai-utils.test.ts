import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./group-ai-utils";
import {question1} from "./group-ai-utils.testdata";

import type {RendererPromptJSON} from "../prompt-types";

describe("Group AI utils", () => {
    beforeEach(() => {
        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

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
                            ["1", "2", "3"],
                            ["4", "5", "6"],
                            ["7", "8", "9"],
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
                            ["1", "2", "3"],
                            ["4", "5", "6"],
                            ["7", "8", "9"],
                        ],
                    },
                },
            },
        });
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "![](https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png)\n\n=====\n\n[[☃ group 1]]\n\n[[☃ group 2]]",
            widgets: {
                "group 1": {
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
                                {
                                    value: "$30$",
                                    rationale:
                                        "Here's some rationale, this isn't the correct answer!",
                                },
                                {value: "$18$"},
                                {value: "$15$"},
                            ],
                            userInput: {
                                selectedOptions: [
                                    false,
                                    false,
                                    false,
                                    false,
                                    false,
                                ],
                            },
                        },
                    },
                },
                "group 2": {
                    type: "group",
                    content:
                        "**What is $\\redD{\\text{A}}$ rounded to the nearest ten?**   \n\n[[☃ numeric-input 1]]\n\n**What is $\\redD{\\text{A}}$ rounded to the nearest hundred?**   \n\n[[☃ numeric-input 2]]\n\n[[☃ image 1]]\n\n",
                    widgets: {
                        "numeric-input 1": {
                            type: "numeric-input",
                            label: "value rounded to the nearest ten",
                            userInput: {value: ""},
                        },
                        "numeric-input 2": {
                            type: "numeric-input",
                            label: "value rounded to the nearest hundred",
                            userInput: {value: ""},
                        },
                        "image 1": {
                            type: "image",
                            options: {
                                altText:
                                    "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
                                caption: "",
                                imageUrl:
                                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
                                title: "",
                            },
                        },
                    },
                },
            },
        });
    });
});
