import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {question1} from "../../widgets/group/group.testdata";

import type {GroupPromptJSON} from "./prompt-utils";

describe("group widget", () => {
    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const group1 = renderer.getWidgetInstance("group 1");
        const group2 = renderer.getWidgetInstance("group 2");

        // Act
        const json1 = group1?.getPromptJSON?.() as GroupPromptJSON;
        const json2 = group2?.getPromptJSON?.() as GroupPromptJSON;

        // Assert
        expect(json1).toEqual({
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
                        isNoneOfTheAboveSelected: false,
                    },
                },
            },
            type: "group",
        });

        expect(json2).toEqual({
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
                "image 1": {},
            },
            type: "group",
        });
    });
});
