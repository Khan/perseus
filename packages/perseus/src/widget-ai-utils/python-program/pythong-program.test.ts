import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {UnsupportedWidgetPromptJSON} from "../unsupported-widget";

export const question1: PerseusRenderer = {
    content: "[[\u2603 python-program 1]]\n\n",
    images: {},
    widgets: {
        "python-program 1": {
            version: {major: 0, minor: 0},
            static: false,
            type: "python-program",
            options: {
                height: 400,
                programID: "5207287069147136",
            },
            alignment: "block",
        },
    },
};

describe("python-program widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});
        const widget = renderer.getWidgetInstance("python-program 1");

        // Act
        const json = widget?.getPromptJSON?.() as UnsupportedWidgetPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "python-program",
            isSupported: false,
        });
    });
});
