import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./dropdown-ai-utils";

import type {
    PerseusRenderer,
    PerseusDropdownUserInput,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const question1: PerseusRenderer = {
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
                ariaLabel: "Test ARIA label",
                visibleLabel: "Test visible label",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("Dropdown AI utils", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusDropdownUserInput = {
            value: 3,
        };

        const renderProps: any = {
            choices: [
                {content: "Pickles"},
                {content: "Tomato"},
                {content: "Onion"},
                {content: "Lettuce"},
            ],
            userInput,
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "dropdown",
            options: {
                items: ["Pickles", "Tomato", "Onion", "Lettuce"],
            },
            userInput: {
                // Offset to account for placeholder
                selectedIndex: 2,
            },
        });
    });

    it("should get prompt json which matches the state of the UI for a randomized question", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("combobox");
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("greater than or equal to"));

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        items: [
                            "greater than or equal to",
                            "less than or equal to",
                        ],
                    },
                    userInput: {
                        selectedIndex: 0,
                    },
                },
            },
        });
    });
});
