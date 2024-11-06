import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";

export const question: PerseusRenderer = {
    content:
        "Watch the Biogeography: Where Life Lives video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    images: {},
    widgets: {
        "video 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "video",
            options: {
                static: false,
                location: "biogeography-where-life-lives",
            },
            alignment: "block",
        },
    },
};

describe("cs-program widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question, {isMobile: false});
        const widget = renderer.getWidgetInstance("video 1");

        // Act
        const json = widget?.getPromptJSON?.() as UnsupportedWidgetPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "video",
            isSupported: false,
            message: "",
        });
    });
});
