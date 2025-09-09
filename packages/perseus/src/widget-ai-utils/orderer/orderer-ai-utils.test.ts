import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./orderer-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

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

describe("Orderer AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const userInput = {
            current: ["First item", "Second item", "Third item"],
        };

        const widgetData: any = {
            options: [
                {
                    content: "Third item",
                    images: {},
                    widgets: {},
                },
                {
                    content: "First item",
                    images: {},
                    widgets: {},
                },
                {
                    content: "Second item",
                    images: {},
                    widgets: {},
                },
            ],
            userInput,
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "orderer",
            options: {
                options: ["Third item", "First item", "Second item"],
            },
            userInput: {
                values: ["First item", "Second item", "Third item"],
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
            widgets: {
                "orderer 1": {
                    type: "orderer",
                    options: {
                        options: ["$10.9$", "$11$", "$\\sqrt{120}$"],
                    },
                    userInput: {
                        values: [],
                    },
                },
            },
        });
    });
});
