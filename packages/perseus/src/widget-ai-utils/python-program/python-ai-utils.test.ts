import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./python-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

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

describe("Python Program AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "python-program",
            isSupported: false,
            message: "",
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1, {isMobile: false});

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[\u2603 python-program 1]]\n\n",
            widgets: {
                "python-program 1": {
                    type: "python-program",
                    isSupported: false,
                    message: "",
                },
            },
        });
    });
});
