import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./passage-ref-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const question1: PerseusRenderer = {
    content:
        "We can see the word “promotes” is used in [[☃ passage-ref 1]]\n\n",
    images: {},
    widgets: {
        "passage-ref 1": {
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
    },
};

describe("PassageRef AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const widgetData: any = {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "This is text summarizing the passage.",
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "passage-ref",
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "This is text summarizing the passage.",
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        act(() => jest.runOnlyPendingTimers());
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "We can see the word “promotes” is used in [[☃ passage-ref 1]]\n\n",
            widgets: {
                "passage-ref 1": {
                    type: "passage-ref",
                    options: {
                        passageNumber: 1,
                        referenceNumber: 1,
                        summaryText: "",
                    },
                },
            },
        });
    });
});
