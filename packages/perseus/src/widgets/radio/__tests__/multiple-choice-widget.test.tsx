import {describe, expect, it, beforeEach, afterEach, jest} from "@jest/globals";
import {
    generateRadioChoice,
    generateRadioOptions,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {ApiOptions} from "../../../perseus-api";
import {testDependencies} from "../../../testing/test-dependencies";
import {containerSizeClass} from "../../../util/sizing-utils";
import Radio from "../multiple-choice-widget";

import type {WidgetProps} from "../../../types";
import type {
    RadioChoiceWithMetadata,
    RadioProps,
} from "../multiple-choice-widget";
import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

const baseOptions = generateRadioOptions({
    numCorrect: 1,
    choices: [
        generateRadioChoice("A", {id: "choice-1"}),
        generateRadioChoice("B", {id: "choice-2", correct: true}),
    ],
});

const baseChoices: RadioChoiceWithMetadata[] = baseOptions.choices.map(
    (choice, index) => ({
        ...choice,
        originalIndex: index,
    }),
);

const baseChoiceStates = [
    {
        selected: false,
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
        readOnly: false,
    },
    {
        selected: false,
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
        readOnly: false,
    },
];

const baseLinterContext: LinterContextProps = {
    contentType: "radio",
    highlightLint: false,
    paths: [],
    stack: [],
};

const getBaseProps = (
    overrides?: Partial<
        WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>
    >,
): WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric> => ({
    numCorrect: baseOptions.numCorrect ?? 0,
    hasNoneOfTheAbove: baseOptions.hasNoneOfTheAbove,
    multipleSelect: baseOptions.multipleSelect,
    countChoices: baseOptions.countChoices,
    deselectEnabled: baseOptions.deselectEnabled,
    choices: baseChoices,
    choiceStates: baseChoiceStates,
    editMode: false,
    labelWrap: false,
    randomize: false,
    trackInteraction: jest.fn(),
    widgetId: "radio-1",
    widgetIndex: 0,
    alignment: null,
    static: false,
    problemNum: 0,
    apiOptions: ApiOptions.defaults,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    findWidgets: () => [],
    reviewMode: false,
    showSolutions: "none",
    handleUserInput: jest.fn(),
    userInput: {selectedChoiceIds: []},
    linterContext: baseLinterContext,
    containerSizeClass: containerSizeClass.MEDIUM,
    ...overrides,
});

describe("multiple choice widget", () => {
    let userEvent: ReturnType<typeof userEventLib.setup>;

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("calls handleUserInput with the selected choice ID when a choice is clicked", async () => {
        // Arrange
        const handleUserInput = jest.fn();
        const props = getBaseProps({handleUserInput});

        // Act
        render(<Radio {...props} />);
        const buttons = screen.getAllByRole("button");
        await userEvent.click(buttons[1]);

        // Assert
        expect(handleUserInput).toHaveBeenCalledWith({
            selectedChoiceIds: ["choice-2"],
        });
    });

    // This tests a production bug where widget state can become misaligned during
    // content updates or partial state restoration, causing the choiceStates array
    // to have a different length than the choices array
    it("handles mismatched choiceStates and choices array lengths without crashing", async () => {
        // Arrange
        const handleUserInput = jest.fn();
        const props = getBaseProps({
            handleUserInput,
            choiceStates: baseChoiceStates.slice(0, 1), // Only 1 state for 2 choices
        });
        render(<Radio {...props} />);

        // Act & Assert - First click (choice with existing state)
        const buttons = screen.getAllByRole("button");
        await expect(userEvent.click(buttons[0])).resolves.not.toThrow();

        expect(handleUserInput).toHaveBeenCalledWith({
            selectedChoiceIds: ["choice-1"],
        });

        // Reset for next assertion
        handleUserInput.mockClear();

        // Act & Assert - Second click (choice without state)
        // This should work without throwing even though there's no choiceState for index 1
        await expect(userEvent.click(buttons[1])).resolves.not.toThrow();

        // In single-select mode, clicking button 2 deselects button 1 and selects button 2
        expect(handleUserInput).toHaveBeenCalledWith({
            selectedChoiceIds: ["choice-2"],
        });
    });
});
