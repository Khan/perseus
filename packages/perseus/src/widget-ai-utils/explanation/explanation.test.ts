import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {ExplanationPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
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

describe("explanation widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const widget = renderer.getWidgetInstance("explanation 1");
        const questionOptions = question1.widgets["explanation 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as ExplanationPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "explanation",
            showPrompt: questionOptions.showPrompt,
            explanation: questionOptions.explanation,
        });
    });
});
