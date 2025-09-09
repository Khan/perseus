import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./explanation-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const question1: PerseusRenderer = {
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    images: {},
    widgets: {
        "explanation 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            // NOTE: The explanation widget doesn't consume this directly,
            // instead, Perseus renders an overlay <div /> over top of the
            // widget that intercepts interactions to it.
            static: false,
            type: "explanation",
            options: {
                hidePrompt: "Hide explanation!",
                widgets: {},
                explanation: "This is an explanation",
                static: false,
                showPrompt: "Explanation",
            },
            alignment: "default",
        },
    },
};

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
