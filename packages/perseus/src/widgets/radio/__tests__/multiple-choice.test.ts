import {describe, beforeEach, it} from "@jest/globals";
import {scoreRadio} from "@khanacademy/perseus-score";
import {screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {clone} from "../../../../../../testing/object-utils";
import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {scorePerseusItemTesting} from "../../../util/test-utils";
import {renderQuestion} from "../../__testutils__/renderQuestion";
import PassageWidget from "../../passage";

import {
    questionAndAnswer,
    multiChoiceQuestionAndAnswer,
    shuffledQuestion,
    shuffledNoneQuestion,
    questionWithUndefinedCorrect,
} from "./radio.testdata";

import type {APIOptions} from "../../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// Create API options with the new-radio-widget flag enabled
const createApiOptions = (options: Partial<APIOptions> = {}): APIOptions => ({
    ...options,
    flags: {
        "new-radio-widget": false,
        ...(options.flags || {}),
    },
});

const selectOption = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    index: number,
) => {
    const options = screen.getAllByRole("radio");

    // element that is null/undefined (ie. if the index is invalid) so we
    // manually check and throw here to protect future me, and others :)
    if (index > options.length) {
        throw new Error("Invalid array index for radio");
    }

    await userEvent.click(options[index]);
};

describe("Multiple Choice Widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    describe("single-choice question", () => {
        const [question, correct, incorrect] = questionAndAnswer;
        const apiOptions = createApiOptions();

        describe.each([[true], [false]])(
            "reviewMode: %s",
            (reviewMode: boolean) => {
                it("should snapshot the same", async () => {
                    // Arrange & Act
                    const {container} = renderQuestion(question, apiOptions, {
                        reviewMode,
                    });

                    // Assert
                    expect(container).toMatchSnapshot("first render");
                });

                it("should snapshot the same with correct answer", async () => {
                    // Arrange
                    const {container} = renderQuestion(question, apiOptions);

                    // Act
                    await selectOption(userEvent, correct);

                    // Assert
                    expect(container).toMatchSnapshot("correct answer");
                });

                it("should snapshot the same with incorrect answer", async () => {
                    // Arrange
                    const {container} = renderQuestion(question, apiOptions);

                    // Act
                    await selectOption(userEvent, incorrect[0]);

                    // Assert
                    expect(container).toMatchSnapshot("incorrect answer");
                });

                it("should accept the right answer (mouse)", async () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions, {
                        reviewMode,
                    });

                    // Act
                    await selectOption(userEvent, correct);
                    const score = scorePerseusItemTesting(
                        question,
                        renderer.getUserInputMap(),
                    );

                    // Assert
                    expect(score).toHaveBeenAnsweredCorrectly();
                });

                it("should accept the right answer (touch)", async () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions);
                    const correctRadio = screen.getAllByRole("radio")[correct];

                    // Act
                    fireEvent.touchStart(correctRadio);
                    fireEvent.touchEnd(correctRadio);
                    // We're using fireEvent.click() because mobile browsers synthesize
                    // click events from matching touchStart/touchEnd events.  user-event
                    // does not support touch events so we have to do this ourselves.
                    // eslint-disable-next-line testing-library/prefer-user-event
                    fireEvent.click(correctRadio);
                    const score = scorePerseusItemTesting(
                        question,
                        renderer.getUserInputMap(),
                    );

                    // Assert
                    expect(score).toHaveBeenAnsweredCorrectly();
                });

                it.each(incorrect)(
                    "should reject incorrect answer - choice %d",
                    async (incorrect: number) => {
                        // Arrange
                        const {renderer} = renderQuestion(question, apiOptions);

                        // Act
                        await selectOption(userEvent, incorrect);
                        const score = scorePerseusItemTesting(
                            question,
                            renderer.getUserInputMap(),
                        );

                        // Assert
                        expect(score).toHaveBeenAnsweredIncorrectly();
                    },
                );

                it("should disable all radio inputs when static is true", async () => {
                    // Arrange
                    const staticQuestion = {
                        ...question,
                        widgets: {
                            ...question.widgets,
                            "radio 1": {
                                ...question.widgets["radio 1"],
                                static: true,
                            },
                        },
                    } as const;
                    renderQuestion(staticQuestion, apiOptions, {reviewMode});

                    // Act
                    await selectOption(userEvent, correct);

                    // Assert
                    // Everything's read-only so no selections made
                    // Note(TB): The visual buttons are hidden from screen
                    // readers, so they need to be identified as hidden;
                    // the visual button has the aria attributes
                    screen
                        .getAllByRole("button", {hidden: true})
                        .forEach((r) => {
                            expect(r).toHaveAttribute("aria-disabled", "true");
                        });
                    // Note(TB): Confirms the screen reader only
                    // radio options are also disabled
                    screen.getAllByRole("radio").forEach((r) => {
                        expect(r).toHaveAttribute("disabled");
                    });
                });
            },
        );

        it("should be able to navigate down by keyboard", async () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            await userEvent.tab();
            await userEvent.tab();

            // Assert
            // Note(TB): The visual buttons are hidden from screen readers
            // so they need to be identified as hidden;
            // cannot access screen reader buttons via tabbing
            expect(
                screen.getAllByRole("button", {hidden: true})[1],
            ).toHaveFocus();
        });

        it("should be able to navigate up by keyboard", async () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            await userEvent.tab();
            // Note(TB): The visual buttons are hidden from screen readers
            // so they need to be identified as hidden
            expect(
                screen.getAllByRole("button", {hidden: true})[0],
            ).toHaveFocus();

            await userEvent.tab();
            expect(
                screen.getAllByRole("button", {hidden: true})[1],
            ).toHaveFocus();

            await userEvent.tab({shift: true});

            // Assert
            expect(
                screen.getAllByRole("button", {hidden: true})[0],
            ).toHaveFocus();
        });

        it("should be able to select an option by keyboard (space)", async () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            await userEvent.tab();
            await userEvent.keyboard(" ");

            // Assert
            expect(screen.getAllByRole("radio")[0]).toBeChecked();
        });

        it("should be able to select an option by keyboard (enter)", async () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            await userEvent.tab();
            await userEvent.keyboard("{Enter}");

            // Assert
            expect(screen.getAllByRole("radio")[0]).toBeChecked();
        });

        it("should be able to navigate to 'None of the above' choice by keyboard", async () => {
            // Arrange
            const q = clone(question);
            q.widgets["radio 1"].options.choices[3].isNoneOfTheAbove = true;
            renderQuestion(q, apiOptions);

            // Act
            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();

            // Assert
            // Note(TB): The visual buttons are hidden from screen readers
            // so they need to be identified as hidden
            expect(
                screen.getAllByRole("button", {hidden: true})[2],
            ).toHaveFocus();
        });

        it.each([
            ["No", "Yes"],
            ["False", "True"],
        ])(
            "should enforce ordering for common answers: %j",
            async (...answers) => {
                // Arrange
                const q = clone(question);
                q.widgets["radio 1"].options.choices = answers.map(
                    (answer, idx) => ({
                        content: answer,
                        correct: idx === 1, // Correct answer is the "truthy" item
                    }),
                );

                // Act
                const {renderer} = renderQuestion(q, apiOptions);
                // We click on the first item, which was the second (index == 1)
                // item in the original choices. But because of enforced ordering,
                // it is now at the top of the list (and thus our correct answer).
                await userEvent.click(screen.getAllByRole("radio")[0]);
                const score = scorePerseusItemTesting(
                    q,
                    renderer.getUserInputMap(),
                );

                // Assert
                const items = screen.getAllByRole("listitem");
                expect(items[0]).toHaveTextContent(answers[1]);
                expect(items[1]).toHaveTextContent(answers[0]);
                expect(score).toHaveBeenAnsweredCorrectly();
            },
        );

        it("should not change ordering of non-common answers", async () => {
            // Arrange
            const answers = ["Last", "First"];
            const q = clone(question);
            q.widgets["radio 1"].options.choices = answers.map(
                (answer, idx) => ({
                    content: answer,
                    correct: idx === 1,
                }),
            );

            // Act
            renderQuestion(q, apiOptions);

            // Assert
            const items = screen.getAllByRole("listitem");
            expect(items[0]).toHaveTextContent(answers[0]);
            expect(items[1]).toHaveTextContent(answers[1]);
        });

        it("should transform inline passage-refs to references to passage widgets", async () => {
            const question: PerseusRenderer = {
                content: "[[\u2603 passage 1]]\n\n[[☃ radio 1]]",
                images: {},
                widgets: {
                    "passage 1": {
                        type: "passage",
                        options: {
                            footnotes: "",
                            passageText: "{{First ref}} and {{Second ref}}",
                            passageTitle: "",
                            showLineNumbers: true,
                            static: false,
                        },
                    },
                    "radio 1": {
                        type: "radio",
                        options: {
                            choices: [
                                {
                                    correct: true,
                                    // Passage refs reference a passage widget in
                                    // the main content. The first value is the
                                    // passage widget (eg. "passage 1", "passage
                                    // 2") and the second value is the ref within
                                    // that passage widget. Note that both are
                                    // 1-based!
                                    content: `{{passage-ref 1 1 "the 1st ref in the 1st passage"}}`,
                                },
                                {content: `Answer 2`},
                                {content: `Answer 3`},
                            ],
                        },
                    },
                },
            };

            // Arrange
            // We mock this one function on Passage as its where all the magic DOM
            // measurement happens. This ensures our assertions in this test don't
            // have to assert NaN and make sense.
            jest.spyOn(
                PassageWidget.widget.prototype,
                "getReference",
            ).mockReturnValue({content: "", startLine: 1, endLine: 2});

            // Act
            renderQuestion(question, apiOptions);

            // Assert
            // By using a `passage-ref` in a choice, we should now have the
            // reference on the radio we used it on.
            // NOTE: We get by listitem role here because the 'radio' role
            // element does not contain the HTML that provides the label
            // for it.
            await waitFor(() => {
                const passageRefRadio = screen.getAllByRole("listitem")[0];
                expect(passageRefRadio).toHaveTextContent("lines 1–2");
            });
        });

        it("should render all rationales when showSolutions is 'all'", async () => {
            // Arrange
            renderQuestion(question, apiOptions, {
                showSolutions: "all",
            });

            // Assert
            expect(
                screen.queryAllByTestId(/perseus-radio-rationale-content/),
            ).toHaveLength(4);
        });

        it("should render no rationales when showSolutions is 'none'", async () => {
            // Arrange
            renderQuestion(question, apiOptions, {
                showSolutions: "none",
            });

            // Assert
            expect(
                screen.queryAllByTestId(/perseus-radio-rationale-content/),
            ).toHaveLength(0);
        });

        it("should be invalid when first rendered", async () => {
            // Arrange
            const apiOptions = createApiOptions();

            // Act
            const {renderer} = renderQuestion(question, apiOptions);
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });

        it("Should render correct option select statuses (rationales) when review mode enabled", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            renderQuestion(question, apiOptions, {reviewMode: true});

            // Act
            await selectOption(userEvent, correct);

            // Assert
            expect(screen.getAllByText("Correct (selected)")).toHaveLength(1);
        });

        it("Should render incorrect option select statuses (rationales) when review mode enabled", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            renderQuestion(question, apiOptions, {reviewMode: true});

            // Act
            await selectOption(userEvent, incorrect[0]);

            // Assert
            expect(screen.getAllByText("Incorrect (selected)")).toHaveLength(1);
        });

        it("should display all rationales when static is true", async () => {
            // Arrange
            const staticQuestion = {
                ...question,
                widgets: {
                    ...question.widgets,
                    "radio 1": {
                        ...question.widgets["radio 1"],
                        static: true,
                    },
                },
            } as const;

            // Act
            renderQuestion(staticQuestion, apiOptions);

            // Assert
            // Part of Choice A rationale
            expect(
                screen.getByText(
                    /the positive square root when performed on a number, so/,
                ),
            ).toBeVisible();
            // Part of Choice B rationale
            expect(
                screen.getByText(/, the square root operation/),
            ).toBeVisible();
            // Part of Choice C rationale
            expect(
                screen.getByText(/is the positive square root of/),
            ).toBeVisible();
            // Part of Choice D rationale
            expect(
                screen.getAllByText(/satisfies the equation./)[3],
            ).toBeVisible();
        });

        it("should register as correct when none of the above option selected", async () => {
            // Arrange
            const q = clone(question);
            const choices = q.widgets["radio 1"].options.choices;
            choices[2].correct = false;
            choices[3].isNoneOfTheAbove = true;
            choices[3].correct = true;

            const {renderer} = renderQuestion(q, apiOptions);

            // Act
            const noneOption = screen.getByRole("radio", {
                name: "(Choice D) None of the above",
            });
            await userEvent.click(noneOption);
            const score = scorePerseusItemTesting(
                q,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });

    describe("multi-choice question", () => {
        const [question, correct, incorrect, invalid] =
            multiChoiceQuestionAndAnswer;

        const apiOptions = createApiOptions();

        it("should accept the right answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const options = screen.getAllByRole("checkbox");
            for (const i of correct) {
                await userEvent.click(options[i]);
            }
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("should select multiple options when clicked", async () => {
            // Arrange
            const radio1Widget = question.widgets["radio 1"];
            const radioOptions = radio1Widget.options;

            const multipleCorrectChoicesQuestion: PerseusRenderer = {
                ...question,
                widgets: {
                    ...question.widgets,
                    "radio 1": {
                        ...radio1Widget,
                        options: {
                            ...radioOptions,
                            choices: [
                                {content: "$x=-6$", correct: true},
                                {content: "$x=4$", correct: true},
                                {content: "$x=7$", correct: false},
                                {
                                    content: "There is no such input value.",
                                    isNoneOfTheAbove: true,
                                    correct: false,
                                },
                            ],
                        },
                    },
                },
            };

            renderQuestion(multipleCorrectChoicesQuestion, apiOptions);

            // Act
            const options = screen.getAllByRole("checkbox");
            await userEvent.click(options[2]);
            await userEvent.click(options[3]);

            // Assert
            expect(options[2]).toBeChecked();
            expect(options[3]).toBeChecked();
        });

        it("should deselect selected options when clicked", async () => {
            // Arrange
            const radio1Widget = question.widgets["radio 1"];
            const radioOptions = radio1Widget.options;

            const multipleCorrectChoicesQuestion: PerseusRenderer = {
                ...question,
                widgets: {
                    ...question.widgets,
                    "radio 1": {
                        ...radio1Widget,
                        options: {
                            ...radioOptions,
                            choices: [
                                {content: "$x=-6$", correct: true},
                                {content: "$x=4$", correct: true},
                                {content: "$x=7$", correct: false},
                                {
                                    content: "There is no such input value.",
                                    isNoneOfTheAbove: true,
                                    correct: false,
                                },
                            ],
                        },
                    },
                },
            };

            renderQuestion(multipleCorrectChoicesQuestion, apiOptions);

            // Act
            const options = screen.getAllByRole("checkbox");
            await userEvent.click(options[2]);
            await userEvent.click(options[3]);
            await userEvent.click(options[2]);
            await userEvent.click(options[3]);

            // Assert
            expect(options[2]).not.toBeChecked();
            expect(options[3]).not.toBeChecked();
        });

        it("should snapshot the same when invalid", async () => {
            // Arrange
            const {container} = renderQuestion(question, apiOptions);

            // Act
            const options = screen.getAllByRole("checkbox");
            for (const i of incorrect[0]) {
                await userEvent.click(options[i]);
            }

            // Assert
            expect(container).toMatchSnapshot("invalid state");
        });

        it("should be invalid when first rendered", async () => {
            // Act
            const {renderer} = renderQuestion(question, apiOptions);
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });

        it("should be invalid when incorrect number of choices selected", async () => {
            // Arrange
            const radio1Widget = question.widgets["radio 1"];
            const radioOptions = radio1Widget.options;

            const multipleCorrectChoicesQuestion: PerseusRenderer = {
                ...question,
                widgets: {
                    ...question.widgets,
                    "radio 1": {
                        ...radio1Widget,
                        options: {
                            ...radioOptions,
                            choices: [
                                {content: "$x=-6$", correct: true},
                                {content: "$x=4$", correct: true},
                                {content: "$x=7$", correct: false},
                                {
                                    content: "There is no such input value.",
                                    isNoneOfTheAbove: true,
                                    correct: false,
                                },
                            ],
                            countChoices: true,
                        },
                    },
                },
            };

            const {renderer} = renderQuestion(
                multipleCorrectChoicesQuestion,
                apiOptions,
            );

            // Act
            const option = screen.getAllByRole("checkbox");
            await userEvent.click(option[0]); // correct
            await userEvent.click(option[1]); // correct
            await userEvent.click(option[2]); // incorrect
            const score = scorePerseusItemTesting(
                multipleCorrectChoicesQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveInvalidInput("CHOOSE_CORRECT_NUM_ERROR");
        });

        it.each(incorrect)(
            "should reject an incorrect answer - test #%#",
            async (...choices) => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                // Act
                const option = screen.getAllByRole("checkbox");
                for (let i = 0; i < choices.length; i++) {
                    await userEvent.click(option[i]);
                }
                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredIncorrectly();
            },
        );

        it.each(invalid)(
            "should reject an invalid answer - test #%#",
            async (...choices) => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                // Act
                const option = screen.getAllByRole("checkbox");
                for (const i of choices) {
                    await userEvent.click(option[i]);
                }
                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveInvalidInput();
            },
        );
    });

    describe("scoring", () => {
        /**
         * (LEMS-2435) We want to be sure that we're able to score shuffled
         * Radio widgets outside of the component which means `getUserInputMap`
         * should return the same order that the scoring data provides
         */
        it("can be scored correctly when shuffled", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            const {renderer} = renderQuestion(shuffledQuestion, apiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("radio", {name: /Correct Choice$/}),
            );

            const userInput = renderer.getUserInputMap()["radio 1"];
            const rubric = shuffledQuestion.widgets["radio 1"].options;
            const widgetScore = scoreRadio(userInput, rubric);
            const rendererScore = scorePerseusItemTesting(
                shuffledQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(widgetScore).toHaveBeenAnsweredCorrectly();
            expect(rendererScore).toHaveBeenAnsweredCorrectly();
        });

        /**
         * (LEMS-2435) We want to be sure that we're able to score shuffled
         * Radio widgets outside of the component which means `getUserInputMap`
         * should return the same order that the scoring data provides
         */
        it("can be scored incorrectly when shuffled", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            const {renderer} = renderQuestion(shuffledQuestion, apiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("radio", {name: /Incorrect Choice 1$/}),
            );

            const userInput = renderer.getUserInputMap()["radio 1"];
            const rubric = shuffledQuestion.widgets["radio 1"].options;
            const widgetScore = scoreRadio(userInput, rubric);
            const rendererScore = scorePerseusItemTesting(
                shuffledQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(widgetScore).toHaveBeenAnsweredIncorrectly();
            expect(rendererScore).toHaveBeenAnsweredIncorrectly();
        });

        /**
         * (LEMS-2435) We want to be sure that we're able to score shuffled
         * Radio widgets outside of the component which means `getUserInputMap`
         * should return the same order that the scoring data provides
         */
        it("can be scored correctly when shuffled with none of the above", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            const {renderer} = renderQuestion(shuffledNoneQuestion, apiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("radio", {name: /None of the above$/}),
            );

            const userInput = renderer.getUserInputMap()["radio 1"];
            const rubric = shuffledNoneQuestion.widgets["radio 1"].options;
            const widgetScore = scoreRadio(userInput, rubric);
            const rendererScore = scorePerseusItemTesting(
                shuffledNoneQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(widgetScore).toHaveBeenAnsweredCorrectly();
            expect(rendererScore).toHaveBeenAnsweredCorrectly();
        });

        /**
         * (LEMS-2435) We want to be sure that we're able to score shuffled
         * Radio widgets outside of the component which means `getUserInputMap`
         * should return the same order that the scoring data provides
         */
        it("can be scored incorrectly when shuffled with none of the above", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            const {renderer} = renderQuestion(shuffledNoneQuestion, apiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("radio", {name: /Incorrect Choice 1$/}),
            );

            const userInput = renderer.getUserInputMap()["radio 1"];
            const rubric = shuffledNoneQuestion.widgets["radio 1"].options;
            const widgetScore = scoreRadio(userInput, rubric);
            const rendererScore = scorePerseusItemTesting(
                shuffledQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(widgetScore).toHaveBeenAnsweredIncorrectly();
            expect(rendererScore).toHaveBeenAnsweredIncorrectly();
        });

        /**
         * (LEMS-2909) This test verifies the fix for a bug where choices with undefined
         * 'correct' property would incorrectly show as correct when both multipleSelect
         * and randomize were enabled. The issue was that the radio-component.tsx would
         * use the reviewChoice to determine correctness, but the choices were already shuffled
         * while the reviewChoice order remained the same.
         *
         * The fix was to explicitly set choice.correct to a boolean value in radio.ts:
         * correct: Boolean(choice.correct)
         */
        it("handles undefined choice.correct properly when multipleSelect and randomize are enabled", async () => {
            // Arrange
            const apiOptions = createApiOptions();
            renderQuestion(questionWithUndefinedCorrect, apiOptions, {
                reviewMode: true,
            });

            // Act
            // Find all list items that represent choices, and count how many are marked as correct
            const listItems = screen.getAllByRole("listitem");
            let correctCount = 0;
            let correctChoiceContent = "";
            for (const item of listItems) {
                const content = item.textContent || "";
                if (content.includes("Correct")) {
                    correctCount++;
                    correctChoiceContent = content;
                }
            }

            // Assert
            // With the fix in place, only one choice should be marked as correct,
            // and that correct choice should be Choice B
            expect(correctCount).toBe(1);
            expect(correctChoiceContent).toContain("Choice B");
        });
    });
});
