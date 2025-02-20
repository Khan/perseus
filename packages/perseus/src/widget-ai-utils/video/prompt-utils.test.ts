import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./video-ai-utils";

import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

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

describe("Video AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "video",
            isSupported: false,
            message: "",
        });
    });

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
