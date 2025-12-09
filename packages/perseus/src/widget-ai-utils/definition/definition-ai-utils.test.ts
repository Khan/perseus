import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./definition-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    widgets: {
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition: "Definition text",
                togglePrompt: "the Pequots",
            }),
        }),
    },
});

describe("Definition AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const widgetData: any = {
            definition: "to confuse or fluster",
            togglePrompt: "bumfuzzle",
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "definition",
            definition: "to confuse or fluster",
            togglePrompt: "bumfuzzle",
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
            widgets: {
                "definition 1": {
                    type: "definition",
                    definition: "Definition text",
                    togglePrompt: "the Pequots",
                },
            },
        });
    });
});
