import {screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {RadioPromptJSON} from "./prompt-utils";
import type {PerseusRenderer, RadioWidget} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const shuffledQuestion: PerseusRenderer = {
    content: "[[\u2603 radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                displayCount: null,
                onePerLine: false,
                choices: [
                    {
                        content: "Incorrect Choice 1",
                        correct: false,
                    },
                    {
                        content: "Incorrect Choice 2",
                        correct: false,
                    },
                    {
                        content: "Correct Choice",
                        correct: true,
                    },
                    {
                        content: "Incorrect Choice 3",
                        correct: false,
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

describe("radio widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI", async () => {
        const indexToSelect = 1;
        const {renderer} = renderQuestion(shuffledQuestion);
        const widget = renderer.getWidgetInstance("radio 1");

        const radioInputs = screen.getAllByRole("radio");
        await userEvent.click(radioInputs[indexToSelect]);

        if (!widget) {
            throw new Error("Failed to render");
        }

        const json = widget.getPromptJSON?.() as RadioPromptJSON;
        const listItems = screen.getAllByRole("listitem");

        // Ensure the options are shown in the correct order
        json.options.forEach((option, i) => {
            const textNode = within(listItems[i]).getAllByText(option.value);
            expect(textNode).not.toBeNull();
        });

        // Ensure the correct choice is selected
        json.userInput.selectedOptions.forEach((isSelected, i) => {
            expect(isSelected).toBe(i === indexToSelect);
        });
    });
});
