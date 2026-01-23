import {screen} from "@testing-library/react";
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

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI", () => {
        const widgetData: any = {
            numCorrect: 1,
            countChoices: false,
            deselectEnabled: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            choices: [
                {
                    id: "3-3-3-3-3",
                    content: "Content 4",
                    originalIndex: 3,
                },
                {
                    id: "1-1-1-1-1",
                    content: "Content 2",
                    originalIndex: 1,
                },
                {
                    id: "0-0-0-0-0",
                    content: "Content 1",
                    originalIndex: 0,
                },

                {
                    id: "2-2-2-2-2",
                    content: "Content 3",
                    originalIndex: 2,
                },
            ],
            selectedChoiceIds: ["3-3-3-3-3"],
        };

        const userInput: PerseusRadioUserInput = {
            selectedChoiceIds: ["0-0-0-0-0"],
        };

        const resultJSON = getPromptJSON(widgetData, userInput);

        expect(resultJSON).toEqual({
            type: "radio",
            hasNoneOfTheAbove: false,
            options: [
                {value: "Content 4", id: "3-3-3-3-3"},
                {value: "Content 2", id: "1-1-1-1-1"},
                {value: "Content 1", id: "0-0-0-0-0"},
                {value: "Content 3", id: "2-2-2-2-2"},
            ],
            userInput: {
                selectedOptions: ["0-0-0-0-0"],
            },
        });
    });

    it.each(
        Object.entries(shuffledQuestion.widgets["radio 1"].options.choices),
    )(
        "prompt answer order should map to UI answer order: index %s",
        async (_, choice) => {
            // render the question which triggers shuffling
            const {renderer} = renderQuestion(shuffledQuestion);

            // click the shuffled answer at a specific index
            const radioInput = screen.queryByText(choice.content);
            if (!radioInput) {
                throw new Error(
                    `Could not find radio input for choice content: ${choice.content}`,
                );
            }
            await userEvent.click(radioInput);

            // get prompt JSON
            const json = renderer.getPromptJSON();
            const widgetJSON = json.widgets["radio 1"];
            if (widgetJSON.type !== "radio") {
                throw new Error("Expected a radio widget");
            }

            // Ensure the options are shown in the correct order
            const listItems = screen.getAllByRole("listitem");
            // make sure the text from the prompt is in
            // the text for the UI at a given index
            listItems.forEach((li, i) => {
                const uiText = li.textContent as string;
                const promptText = widgetJSON.options[i].value;
                expect(uiText.includes(promptText)).toBe(true);
            });

            // Ensure the user input contains the correct ID
            expect(widgetJSON.userInput.selectedOptions).toEqual([choice.id]);
        },
    );

    // regression (TUT-2738) TODO: we shouldn't have to handle this
    // (user input should be initialized already)
    // but there's a bug somewhere and an urgency to get this patched
    it("should handle undefined/null user input", () => {
        const widgetData: any = {
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

        const resultJSON = getPromptJSON(widgetData, undefined as any);

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
