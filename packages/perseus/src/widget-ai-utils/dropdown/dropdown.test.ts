import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {DropdownPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

export const question1: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "greater/less than or equal to",
                choices: [
                    {
                        content: "greater than or equal to",
                        correct: false,
                    },
                    {
                        content: "less than or equal to",
                        correct: true,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("dropdown widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI for a randomized question", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const widget = renderer.getWidgetInstance("dropdown 1");

        // Act
        const dropdown = screen.getByRole("button");
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("greater than or equal to"));

        const json = widget?.getPromptJSON?.() as DropdownPromptJSON;

        // Assert
        expect(json.userInput.selectedIndex).toEqual(0);
    });
});