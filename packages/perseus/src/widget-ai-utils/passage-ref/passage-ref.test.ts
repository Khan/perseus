import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PassageRefPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";

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

describe("passage-ref widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const widget = renderer.getWidgetInstance("passage-ref 1");

        // Act
        act(() => jest.runOnlyPendingTimers());
        const json = widget?.getPromptJSON?.() as PassageRefPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "passage-ref",
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
        });
    });
});
