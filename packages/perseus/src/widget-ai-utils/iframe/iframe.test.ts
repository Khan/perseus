import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {WidgetPromptJSON} from "../../prompt-types";

const question1: PerseusRenderer = {
    content: "Try matching the target image\n[[\u2603 iframe 1]]\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/8e518475587bc83767c72b49ff094e5870c3edc3.png":
            {
                width: 760,
                height: 688,
            },
    },
    widgets: {
        "iframe 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "iframe",
            options: {
                settings: [
                    {name: "hue", value: "210"},
                    {name: "subdivisions", value: "0"},
                    {name: "zoom", value: "2"},
                    {name: "seed", value: "6"},
                    {name: "", value: ""},
                ],
                url: "4960944252",
                height: "410",
                width: "410",
                allowFullScreen: true,
                static: false,
            },
            alignment: "default",
        },
    },
};

describe("iframe widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});
        const widget = renderer.getWidgetInstance("iframe 1");

        // Act
        const json = widget?.getPromptJSON?.();

        // Assert
        expect(json).toEqual({
            type: "iframe",
            isSupported: false,
        });
    });
});
