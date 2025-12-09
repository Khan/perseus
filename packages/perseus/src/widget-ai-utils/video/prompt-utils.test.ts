import {
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

import {generateVideoWidget} from "../../../../perseus-core/src/utils/generators/video-widget-generator";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./video-ai-utils";

import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";

export const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Watch the Biogeography: Where Life Lives video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    widgets: {
        "video 1": generateVideoWidget({
            options: {
                location: "biogeography-where-life-lives",
            },
        }),
    },
});

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
