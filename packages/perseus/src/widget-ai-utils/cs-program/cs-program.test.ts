import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content: "[[\u2603 cs-program 1]]\n\n",
    images: {},
    widgets: {
        "cs-program 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "cs-program",
            options: {
                settings: [
                    {name: "", value: ""},
                    {name: "", value: ""},
                ],
                height: 540,
                width: 640,
                programID: "6293105639817216",
                static: false,
                showButtons: false,
                showEditor: false,
            },
            alignment: "block",
        },
    },
};

describe("cs-program widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[\u2603 cs-program 1]]\n\n",
            widgets: {
                "cs-program 1": {
                    type: "cs-program",
                    isSupported: false,
                },
            },
        });
    });
});
