import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicDropdown} from "./dropdown.testdata";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("Dropdown widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", async () => {
        // Arrange and Act
        const {container} = renderQuestion(basicDropdown);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot when opened", async () => {
        // Arrange
        const {container} = renderQuestion(basicDropdown);

        // Act
        const dropdown = screen.getByRole("combobox");
        await userEvent.click(dropdown);

        // Assert
        expect(screen.getByText("less than or equal to")).toBeInTheDocument();
        expect(container).toMatchSnapshot("dropdown open");
    });

    it("should show placeholder text", async () => {
        // Arrange
        renderQuestion(basicDropdown);

        // Act
        const dropdown = screen.getByRole("combobox");

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(dropdown).toHaveTextContent("greater/less than or equal to");
    });

    it("should be answerable correctly", async () => {
        // Arrange
        const {renderer} = renderQuestion(basicDropdown);

        // Act
        const dropdown = screen.getByRole("combobox");
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("less than or equal to"));
        const score = scorePerseusItemTesting(
            basicDropdown,
            renderer.getUserInput(),
        );

        // Assert
        expect(dropdown).toHaveTextContent("less than or equal to");
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should be answerable incorrectly", async () => {
        // Arrange
        const {renderer} = renderQuestion(basicDropdown);

        // Act
        const dropdown = screen.getByRole("combobox");
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("greater than or equal to"));
        const score = scorePerseusItemTesting(
            basicDropdown,
            renderer.getUserInput(),
        );

        // Assert
        expect(dropdown).toHaveTextContent("greater than or equal to");
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should be invalid on first render", async () => {
        // Arrange
        const {renderer} = renderQuestion(basicDropdown);

        // Act
        const score = scorePerseusItemTesting(
            basicDropdown,
            renderer.getUserInput(),
        );

        // Assert
        expect(score).toHaveInvalidInput();
    });

    it("should be return true when focus() called", async () => {
        // Arrange
        const {renderer} = renderQuestion(basicDropdown);

        // Act
        const focused = renderer.focus();

        // Assert
        expect(focused).toBe(true);
        // TODO(LP-10797): we don't check that the document.activeElement is
        // actually set because the dropdown widget focuses a <div> (it's root
        // element), which is not actually focusable because it doesn't have a
        // tabindex.
    });

    it("has an ARIA label", async () => {
        // Arrange and Act
        renderQuestion(basicDropdown);

        // Assert
        expect(screen.getByLabelText("Select an answer")).toBeInTheDocument();
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
        });

        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });

            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        function getAnswerfulItem(): PerseusItem {
            const question: PerseusRenderer = {
                content: "[[☃ dropdown 1]]",
                images: {},
                widgets: {
                    "dropdown 1": {
                        type: "dropdown",
                        options: {
                            static: false,
                            placeholder: "Choose an answer",
                            choices: [
                                {
                                    content: "Correct",
                                    correct: true,
                                },
                                {
                                    content: "Incorrect",
                                    correct: false,
                                },
                            ],
                        },
                    },
                },
            };

            return generateTestPerseusItem({question});
        }

        function getAnswerlessItem(): PerseusItem {
            return splitPerseusItem(getAnswerfulItem());
        }

        test.each(["answerless", "answerful"])(
            "is interactive with widget options: %p",
            async (e) => {
                // Arrange
                const useAnswerless = e === "answerless";
                const renderItem = useAnswerless
                    ? getAnswerlessItem()
                    : getAnswerfulItem();

                // assert that splitting worked as expected
                if (useAnswerless) {
                    expect(
                        renderItem.question.widgets["dropdown 1"].options
                            .choices[0].correct,
                    ).toBeUndefined();
                    expect(
                        renderItem.question.widgets["dropdown 1"].options
                            .choices[1].correct,
                    ).toBeUndefined();
                }

                // Act
                const {renderer} = renderQuestion(renderItem.question);

                await userEvent.click(
                    screen.getByRole("combobox", {name: "Select an answer"}),
                );
                await userEvent.click(
                    screen.getByRole("option", {name: "Correct"}),
                );

                const userInput = renderer.getUserInput();
                const score = scorePerseusItem(
                    getAnswerfulItem().question,
                    userInput,
                    "en",
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            },
        );
    });
});
