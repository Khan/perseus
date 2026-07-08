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
import Radio from "../radio-widget";

import type {WidgetPropsV2} from "../../../types";
import type {RadioChoiceWithMetadata, RadioProps} from "../radio-widget";
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
    },
    {
        selected: false,
    },
];

const baseLinterContext: LinterContextProps = {
    contentType: "radio",
    highlightLint: false,
    stack: [],
};

const getBaseProps = (
    overrides?: Partial<
        WidgetPropsV2<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>
    >,
): WidgetPropsV2<RadioProps, PerseusRadioUserInput, PerseusRadioRubric> => ({
    options: {
        numCorrect: baseOptions.numCorrect ?? 0,
        hasNoneOfTheAbove: baseOptions.hasNoneOfTheAbove,
        multipleSelect: baseOptions.multipleSelect,
        countChoices: baseOptions.countChoices,
        deselectEnabled: baseOptions.deselectEnabled,
        choices: baseChoices,
        choiceStates: baseChoiceStates,
        randomize: false,
    },
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

describe("Radio widget", () => {
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

    it("reports only the clicked choice's ID in single-select mode", async () => {
        // Arrange
        const handleUserInput = jest.fn();
        const props = getBaseProps({handleUserInput});
        render(<Radio {...props} />);
        const buttons = screen.getAllByRole("button");

        // Act - click the first choice
        await userEvent.click(buttons[0]);

        // Assert - only the first choice is reported
        expect(handleUserInput).toHaveBeenCalledWith({
            selectedChoiceIds: ["choice-1"],
        });

        handleUserInput.mockClear();

        // Act - click the second choice
        await userEvent.click(buttons[1]);

        // Assert - only the second choice is reported
        expect(handleUserInput).toHaveBeenCalledWith({
            selectedChoiceIds: ["choice-2"],
        });
    });
});
