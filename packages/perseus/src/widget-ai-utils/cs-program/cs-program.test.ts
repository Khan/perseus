import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {CSProgramPromptJSON} from "./prompt-utils";
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
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const apiOptions = {
            isMobile: false,
        } as const;

        const {renderer} = renderQuestion(question1, apiOptions);

        const widget = renderer.getWidgetInstance("cs-program 1");

        // Act
        const json = widget?.getPromptJSON?.() as CSProgramPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "cs-program",
            isSupported: false,
        });
    });
});
