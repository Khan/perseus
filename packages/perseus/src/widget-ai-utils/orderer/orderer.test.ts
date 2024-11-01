import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {OrdererPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";

const question1: PerseusRenderer = {
    content:
        "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};

describe("orderer widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const widget = renderer.findWidgets("orderer 1")[0];
        const questionOptions = question1.widgets["orderer 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as OrdererPromptJSON;
        const expectedOptions = questionOptions.options.map(
            (option) => option.content,
        );

        // Assert
        expect(json).toEqual({
            type: "orderer",
            options: {
                options: expectedOptions,
            },
            userInput: {
                values: [],
            },
        });
    });
});
