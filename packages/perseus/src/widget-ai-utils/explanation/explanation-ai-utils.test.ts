import {
    generateTestPerseusRenderer,
    type PerseusRenderer,
    generateExplanationOptions,
    generateExplanationWidget,
} from "@khanacademy/perseus-core";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./explanation-ai-utils";

const question1: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Hide explanation!",
                explanation: "This is an explanation",
                showPrompt: "Explanation",
            }),
        }),
    },
});

describe("Explanation getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const widgetData: any = {
            showPrompt: "Show explanation",
            explanation: "This is the explanation",
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "explanation",
            showPrompt: "Show explanation",
            explanation: "This is the explanation",
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
                "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
            widgets: {
                "explanation 1": {
                    type: "explanation",
                    explanation: "This is an explanation",
                    showPrompt: "Explanation",
                },
            },
        });
    });
});
