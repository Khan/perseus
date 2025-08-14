import {screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./radio-ai-utils";

import type {
    PerseusRenderer,
    RadioWidget,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
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
                        id: "0-0-0-0-0",
                        content: "Incorrect Choice 1",
                        correct: false,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "Incorrect Choice 2",
                        correct: false,
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "Correct Choice",
                        correct: true,
                    },
                    {
                        id: "3-3-3-3-3",
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

describe("Radio AI utils", () => {
    let userEvent: UserEvent;
    let mathRandomSpy: jest.SpyInstance;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mock Math.random to return a deterministic sequence for consistent test results
        mathRandomSpy = jest.spyOn(Math, "random");
        let callCount = 0;
        mathRandomSpy.mockImplementation(() => {
            // This ensures consistent shuffling behavior in radio widgets
            const values = [0.2, 0.3, 0.8, 0.9, 0.1, 0.4, 0.6, 0.7, 0.5];
            return values[callCount++ % values.length];
        });
    });

    afterEach(() => {
        // Restore Math.random to its original implementation
        mathRandomSpy.mockRestore();
    });

    // why are these tests named the same?
    it("should get prompt json which matches the state of the UI", () => {
        const renderProps: any = {
            numCorrect: 1,
            countChoices: false,
            deselectEnabled: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            choices: [
                {
                    content: "Content 4",
                    originalIndex: 3,
                },
                {
                    content: "Content 2",
                    originalIndex: 1,
                },
                {
                    content: "Content 1",
                    originalIndex: 0,
                },

                {
                    content: "Content 3",
                    originalIndex: 2,
                },
            ],
        };

        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "radio",
            hasNoneOfTheAbove: false,
            options: [
                {value: "Content 4"},
                {value: "Content 2"},
                {value: "Content 1"},
                {value: "Content 3"},
            ],
            userInput: {
                selectedOptions: [true, false, false, false],
            },
        });
    });

    // why are these tests named the same?
    // TODO / STOPSHOP : make this test iterate over each choice
    // so we don't benefit from tests passing from random chance
    // (indexToSelect should be the choice index)
    it("should get prompt json which matches the state of the UI", async () => {
        const indexToSelect = 1;
        const {renderer} = renderQuestion(shuffledQuestion);
        const widget = renderer.getWidgetInstance("radio 1");

        const radioInputs = screen.getAllByRole("radio");
        await userEvent.click(radioInputs[indexToSelect]);

        if (!widget) {
            throw new Error("Failed to render");
        }

        const json = renderer.getPromptJSON();

        const listItems = screen.getAllByRole("listitem");

        const widgetJSON = json.widgets["radio 1"];

        if (widgetJSON.type !== "radio") {
            throw new Error("Expected a radio widget");
        }

        // Ensure the options are shown in the correct order
        listItems.forEach((listItem, i) => {
            const promptJSONItemText = widgetJSON.options[i].value;

            const textNode = within(listItem).getAllByText(promptJSONItemText);
            expect(textNode).not.toBeNull();
        });

        // Ensure the correct choice is selected
        widgetJSON.userInput.selectedOptions.forEach((isSelected, i) => {
            expect(isSelected).toBe(i === indexToSelect);
        });
    });

    // regression (TUT-2738) TODO: we shouldn't have to handle this
    // (user input should be initialized already)
    // but there's a bug somewhere and an urgency to get this patched
    it("should handle undefined/null user input", () => {
        const renderProps: any = {
            numCorrect: 1,
            countChoices: false,
            deselectEnabled: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            choices: [
                {
                    content: "Content 4",
                    originalIndex: 3,
                },
                {
                    content: "Content 2",
                    originalIndex: 1,
                },
                {
                    content: "Content 1",
                    originalIndex: 0,
                },

                {
                    content: "Content 3",
                    originalIndex: 2,
                },
            ],
        };

        const resultJSON = getPromptJSON(renderProps, undefined as any);

        expect(resultJSON).toEqual({
            type: "radio",
            hasNoneOfTheAbove: false,
            options: [
                {value: "Content 4"},
                {value: "Content 2"},
                {value: "Content 1"},
                {value: "Content 3"},
            ],
            userInput: {
                selectedOptions: [],
            },
        });
    });
});
