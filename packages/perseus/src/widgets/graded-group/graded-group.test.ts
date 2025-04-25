import {describe, beforeEach, it} from "@jest/globals";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {renderArticle} from "../../__tests__/article-renderer.test";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    question1,
    groupedRadioRationaleQuestion,
} from "./graded-group.testdata";

import type {APIOptions} from "../../types";
import type {PerseusArticle} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const checkAnswer = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
) => {
    // NOTE(jeremy): The only route to check the answer
    // is to use the "Check" button that is embedded _inside_ the widget.
    await userEvent.click(await screen.findByRole("button", {name: "Check"}));
};

describe("graded-group", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // Suppress message from Link component: "Warning: A future version of
        // React will block javascript: URLs as a security precaution. Use
        // event handlers instead if you can. If you need to generate unsafe
        // HTML try using dangerouslySetInnerHTML instead. React was passed
        // "javascript:void(0)""
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it.each([true, false])("should snapshot", (isMobile: boolean) => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile,
        });

        // Assert
        expect(container).toMatchSnapshot(
            `initial render (mobile: ${isMobile.toString()})`,
        );
    });

    describe("on desktop", () => {
        it("should be able to be answered correctly", async () => {
            // Arrange
            renderQuestion(question1);

            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[2],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[3],
            );

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(screen.getByRole("alert", {name: "Correct"})).toBeVisible();
            expect(
                screen.queryByRole("alert", {name: "Incorrect"}),
            ).not.toBeInTheDocument();
        });

        it("should be able to be answered incorrectly", async () => {
            // Arrange
            renderQuestion(question1);

            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[2],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[3],
            );

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(
                screen.queryByRole("alert", {name: "Correct"}),
            ).not.toBeInTheDocument();
            expect(
                screen.getByRole("alert", {name: "Incorrect"}),
            ).toBeVisible();
        });

        it("should display an error if not fully answered", async () => {
            // Arrange
            renderQuestion(question1);

            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(
                screen.getByText(
                    "We couldn't grade your answer. Make sure you select something for every row.",
                ),
            ).toBeVisible();
        });

        it("should be able to reveal the hint", async () => {
            // Arrange
            renderQuestion(question1);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Explain"}),
            );
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(
                screen.getByText(/Some bacteria synthesize their own fuel/),
            ).toBeVisible();
        });

        it("should be able to hide the hint", async () => {
            // Arrange
            renderQuestion(question1);
            await userEvent.click(
                screen.getByRole("button", {name: "Explain"}),
            );
            act(() => jest.runOnlyPendingTimers());

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Hide explanation"}),
            );

            // Assert
            expect(
                screen.queryByText(/Some bacteria synthesize their own fuel/),
            ).not.toBeInTheDocument();
        });

        it("should show rationales when answer is correct", async () => {
            // Arrange
            renderQuestion(groupedRadioRationaleQuestion);

            // Select the correct answer: "$8$" (index 2)
            await userEvent.click(screen.getAllByRole("radio")[2]);

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(screen.getByRole("alert", {name: "Correct"})).toBeVisible();
            // Verify the rationale for the correct answer is shown
            expect(
                screen.getByText("This is the correct answer."),
            ).toBeVisible();
        });

        it("should not show rationales when answer is incorrect", async () => {
            // Arrange
            renderQuestion(groupedRadioRationaleQuestion);

            // Select an incorrect answer: "$-8$" (index 1)
            await userEvent.click(screen.getAllByRole("radio")[1]);

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(
                screen.getByRole("alert", {name: "Incorrect"}),
            ).toBeVisible();
            // Verify that rationales are not shown
            expect(
                screen.queryByText("This is not the correct answer."),
            ).not.toBeInTheDocument();
        });
    });

    // The Graded Group on mobile has some different functionality from
    // desktop, so we have a completely different set of tests.
    // Hint titling is also not exactly the same ("Hint" vs "[Hint]")
    describe("on mobile", () => {
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        it("should be able to be answered correctly", async () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[2],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "True"})[3],
            );
            act(() => jest.runOnlyPendingTimers());

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(screen.getByRole("alert", {name: "Correct!"})).toBeVisible();
            // On mobile, you can't interact with the widget at all once you
            // answer correctly.
            expect(
                screen.queryByRole("button", {name: "Check"}),
            ).not.toBeInTheDocument();
        });

        it("should be able to be answered incorrectly", async () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[2],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[3],
            );
            act(() => jest.runOnlyPendingTimers());

            // Act
            await checkAnswer(userEvent);

            // Assert
            expect(
                screen.getByRole("button", {name: "Try again"}),
            ).toBeVisible();
            expect(screen.getByText("Keep trying")).toBeVisible();
        });

        it("should let the user try again when checked if not fully answered", async () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[1],
            );
            act(() => jest.runOnlyPendingTimers());

            // Act
            await checkAnswer(userEvent);

            expect(
                await screen.findByRole("button", {name: "Try again"}),
            ).toBeVisible();

            await userEvent.click(
                screen.getAllByRole("button", {name: "False"})[2],
            );
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(
                await screen.findByRole("button", {name: "Check"}),
            ).toBeVisible();
        });

        it("should be able to reveal the hint", async () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Explain"}),
            );

            // Assert
            expect(
                screen.getByText(/Some bacteria synthesize their own fuel/),
            ).toBeVisible();
        });

        it("should be able to hide the hint", async () => {
            // Arrange
            renderQuestion(question1, apiOptions);
            await userEvent.click(
                screen.getByRole("button", {name: "Explain"}),
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Hide explanation"}),
            );

            // Assert
            expect(
                screen.queryByText(/Some bacteria synthesize their own fuel./),
            ).not.toBeInTheDocument();
        });
    });

    /**
     * GradedGroup and GradedGroupSet are only for articles,
     * so we'll test them in that environment
     */
    describe("in ArticleRenderer", () => {
        function generateArticle(): PerseusArticle {
            return [
                {
                    content: "[[☃ graded-group 1]]",
                    widgets: {
                        "graded-group 1": {
                            type: "graded-group",
                            options: {
                                title: "Test title",
                                content: "[[☃ dropdown 1]]",
                                widgets: {
                                    "dropdown 1": {
                                        type: "dropdown",
                                        options: {
                                            choices: [
                                                {
                                                    content: "Wrong answer",
                                                    correct: false,
                                                },
                                                {
                                                    content: "Right answer",
                                                    correct: true,
                                                },
                                            ],
                                            placeholder: "Choose an answer",
                                            static: false,
                                        },
                                    },
                                },
                                images: {},
                            },
                        },
                    },
                    images: {},
                },
            ];
        }

        it("can be answered correctly", async () => {
            renderArticle(generateArticle());

            // select an option
            const dropdown = screen.getByRole("combobox");
            await userEvent.click(dropdown);
            await userEvent.click(screen.getByText("Right answer"));

            // make sure the option was selected properly
            expect(dropdown).toHaveTextContent("Right answer");

            await checkAnswer(userEvent);

            // this shows that the question was scored as expected
            expect(screen.getByText("Correct")).toBeInTheDocument();
        });

        it("can be answered incorrectly", async () => {
            renderArticle(generateArticle());

            // select an option
            const dropdown = screen.getByRole("combobox");
            await userEvent.click(dropdown);
            await userEvent.click(screen.getByText("Wrong answer"));

            // make sure the option was selected properly
            expect(dropdown).toHaveTextContent("Wrong answer");

            await checkAnswer(userEvent);

            // this shows that the question was scored as expected
            expect(screen.getByText("Incorrect")).toBeInTheDocument();
        });
    });
});
