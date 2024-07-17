import {describe, beforeEach, it} from "@jest/globals";
import {screen, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {clone} from "../../../../../testing/object-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {
    passageWidget,
    questionAndAnswer,
    multiChoiceQuestionAndAnswer,
} from "../__testdata__/radio.testdata";

import {renderQuestion} from "./renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {APIOptions} from "../../types";

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

describe("single-choice question", () => {
    let userEvent: ReturnType<typeof userEventLib.setup>;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    const [question, correct, incorrect] = questionAndAnswer;
    const apiOptions = Object.freeze({});

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

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
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

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
            });

            it.each(incorrect)(
                "should reject incorrect answer - choice %d",
                async (incorrect: number) => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions);

                    // Act
                    await selectOption(userEvent, incorrect);

                    // Assert
                    expect(renderer).toHaveBeenAnsweredIncorrectly();
                },
            );

            it("calling .focus() on the renderer should succeed", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions, {
                    reviewMode,
                });

                // Act
                const gotFocus = renderer.focus();

                // Assert
                expect(gotFocus).toBe(true);
            });

            it("should deselect incorrect selected choices", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions, {
                    reviewMode,
                });

                // Act
                // Since this is a single-select setup, just select the first
                // incorrect choice.
                await selectOption(userEvent, incorrect[0]);
                renderer.deselectIncorrectSelectedChoices();

                // Assert
                screen.getAllByRole("radio").forEach((r) => {
                    expect(r).not.toBeChecked();
                });
            });

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
                screen.getAllByRole("button", {hidden: true}).forEach((r) => {
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
        expect(screen.getAllByRole("button", {hidden: true})[1]).toHaveFocus();
    });

    it("should be able to navigate up by keyboard", async () => {
        // Arrange
        renderQuestion(question, apiOptions);

        // Act
        await userEvent.tab();
        // Note(TB): The visual buttons are hidden from screen readers
        // so they need to be identified as hidden
        expect(screen.getAllByRole("button", {hidden: true})[0]).toHaveFocus();

        await userEvent.tab();
        expect(screen.getAllByRole("button", {hidden: true})[1]).toHaveFocus();

        await userEvent.tab({shift: true});

        // Assert
        expect(screen.getAllByRole("button", {hidden: true})[0]).toHaveFocus();
    });

    it("should be able to select an option by keyboard", async () => {
        // Arrange
        renderQuestion(question, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.keyboard(" ");

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
        expect(screen.getAllByRole("button", {hidden: true})[2]).toHaveFocus();
    });

    it.each([
        ["No", "Yes"],
        ["False", "True"],
    ])("should enforce ordering for common answers: %j", async (...answers) => {
        // Arrange
        const q = clone(question);
        q.widgets["radio 1"].options.choices = answers.map((answer, idx) => ({
            content: answer,
            correct: idx === 1, // Correct answer is the "truthy" item
        }));

        // Act
        const {renderer} = renderQuestion(q, apiOptions);
        // We click on the first item, which was the second (index == 1)
        // item in the original choices. But because of enforced ordering,
        // it is now at the top of the list (and thus our correct answer).
        await userEvent.click(screen.getAllByRole("radio")[0]);

        // Assert
        const items = screen.getAllByRole("listitem");
        expect(items[0]).toHaveTextContent(answers[1]);
        expect(items[1]).toHaveTextContent(answers[0]);
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should not change ordering of non-common answers", async () => {
        // Arrange
        const answers = ["Last", "First"];
        const q = clone(question);
        q.widgets["radio 1"].options.choices = answers.map((answer, idx) => ({
            content: answer,
            correct: idx === 1,
        }));

        // Act
        renderQuestion(q, apiOptions);

        // Assert
        const items = screen.getAllByRole("listitem");
        expect(items[0]).toHaveTextContent(answers[0]);
        expect(items[1]).toHaveTextContent(answers[1]);
    });

    it("should transform inline passage-refs to references to passage widgets", async () => {
        // Arrange

        // Add a passage widget to the question content and then reference it
        // in an answer.
        const questionWithPassage = clone(question);
        questionWithPassage.content = `[[\u2603 passage 1]]\n\nNow what's the answer?\n\n[[\u2603 radio 1]]`;
        questionWithPassage.widgets["passage 1"] = passageWidget;
        const radioOptions = questionWithPassage.widgets["radio 1"];
        // HACK(jeremy): TypeScript doesn't know what type these options are because
        // we've extracted them out of a generic `PerseusJson` blob and all the
        // `widget` items are just type `Widget`.
        radioOptions.options.choices[0].content =
            '{{passage-ref 1 1 "Reference 1 here"}}';

        // Act
        renderQuestion(questionWithPassage, apiOptions);
        // Passage refs use `_.defer()` to update their reference ranges.
        jest.runOnlyPendingTimers();

        // Assert
        // By using a `passage-ref` in a choice, we should now have the
        // reference on the radio we used it on.
        // NOTE: We get by listitem role here because the 'radio' role
        // element does not contain the HTML that provides the label
        // for it.
        const passageRefRadio = screen.getAllByRole("listitem")[0];
        expect(passageRefRadio).toHaveTextContent("lines NaN–NaN");
    });

    it("should render rationales for selected choices using method", async () => {
        // Arrange
        const {renderer} = renderQuestion(question, apiOptions);

        // Act
        await selectOption(userEvent, incorrect[0]);
        renderer.showRationalesForCurrentlySelectedChoices();

        // Assert
        expect(
            screen.queryAllByTestId(/perseus-radio-rationale-content/),
        ).toHaveLength(1);
    });

    it("should render rationales for selected choices using prop", async () => {
        // Arrange
        const {rerender} = renderQuestion(question, apiOptions);

        // Act
        await selectOption(userEvent, incorrect[0]);

        rerender(question, {showSolutions: "selected"});

        // Assert
        expect(
            screen.queryAllByTestId(/perseus-radio-rationale-content/),
        ).toHaveLength(1);
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

    describe("cross-out is enabled", () => {
        const crossOutApiOptions = {
            ...apiOptions,
            crossOutEnabled: true,
        } as const;

        it("should render cross-out menu button", async () => {
            // Arrange & Act
            renderQuestion(question, crossOutApiOptions);

            // Assert
            expect(
                screen.getByRole("button", {
                    name: /Open menu for Choice B/,
                }),
            ).toBeVisible();
        });

        it("should open the cross-out menu when button clicked", async () => {
            // Arrange
            renderQuestion(question, crossOutApiOptions);

            // Act
            await userEvent.click(
                screen.getByRole("button", {
                    name: /Open menu for Choice B/,
                }),
            );

            // Assert
            expect(
                screen.getByRole("button", {
                    name: /Cross out Choice B/,
                }),
            ).toBeVisible();
        });

        it("should open the cross-out menu when focused and spacebar pressed", async () => {
            // Arrange
            renderQuestion(question, crossOutApiOptions);
            await userEvent.tab(); // Choice icon
            await userEvent.tab(); // Cross-out menu ellipsis

            // Act
            await userEvent.keyboard(" ");

            // Assert
            expect(
                screen.getByRole("button", {
                    name: /Cross out Choice A/,
                }),
            ).toBeVisible();
        });

        it("should cross-out selection and dismiss button when clicked", async () => {
            // Arrange
            renderQuestion(question, crossOutApiOptions);
            await userEvent.click(
                screen.getByRole("button", {
                    name: /Open menu for Choice B/,
                }),
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {
                    name: /Cross out Choice B/,
                }),
            );

            // Assert
            expect(
                screen.queryAllByRole("button", {
                    name: /Cross out Choice B/,
                }),
            ).toHaveLength(0);

            expect(
                screen.getByTestId("choice-icon__cross-out-line"),
            ).toBeVisible();
        });

        it("should remove cross-out line on selection", async () => {
            // Arrange
            renderQuestion(question, crossOutApiOptions);
            await userEvent.click(
                screen.getByRole("button", {
                    name: /Open menu for Choice B/,
                }),
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {
                    name: /Cross out Choice B/,
                }),
            );
            jest.runAllTimers();

            await userEvent.click(
                screen.getByRole("radio", {
                    name: "(Choice B, Crossed out) -8",
                }),
            );

            // Assert
            expect(
                screen.queryByTestId("choice-icon__cross-out-line"),
            ).not.toBeInTheDocument();
        });

        it("should dismiss cross-out button with {tab} key", async () => {
            // Arrange
            renderQuestion(question, crossOutApiOptions);
            await userEvent.tab(); // Choice icon
            await userEvent.tab(); // Cross-out menu ellipsis

            // Act
            await userEvent.keyboard(" ");
            jest.runAllTimers();

            expect(
                screen.getByRole("button", {
                    name: /Cross out Choice A/,
                }),
            ).toBeVisible();

            await userEvent.keyboard(" ");
            jest.runAllTimers();

            // Assert
            expect(
                screen.queryAllByRole("button", {
                    name: /Cross out Choice A/,
                }),
            ).toHaveLength(0);
        });
    });

    it("should be invalid when first rendered", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };

        // Act
        const {renderer} = renderQuestion(question, apiOptions);

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("Should render correct option select statuses (rationales) when review mode enabled", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
        renderQuestion(question, apiOptions, {reviewMode: true});

        // Act
        await selectOption(userEvent, correct);

        // Assert
        expect(screen.getAllByText("Correct (selected)")).toHaveLength(1);
    });

    it("Should render incorrect option select statuses (rationales) when review mode enabled", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
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
        renderQuestion(staticQuestion);

        // Assert
        // Part of Choice A rationale
        expect(
            screen.getByText(
                /the positive square root when performed on a number, so/,
            ),
        ).toBeVisible();
        // Part of Choice B rationale
        expect(screen.getByText(/, the square root operation/)).toBeVisible();
        // Part of Choice C rationale
        expect(
            screen.getByText(/is the positive square root of/),
        ).toBeVisible();
        // Part of Choice D rationale
        expect(screen.getAllByText(/satisfies the equation./)[3]).toBeVisible();
    });

    it("should register as correct when none of the above option selected", async () => {
        // Arrange
        const q = clone(question);
        const choices = q.widgets["radio 1"].options.choices;
        choices[2].correct = false;
        choices[3].isNoneOfTheAbove = true;
        choices[3].correct = true;

        const {renderer} = renderQuestion(q);

        // Act
        const noneOption = screen.getByRole("radio", {
            name: "(Choice D) None of the above",
        });
        await userEvent.click(noneOption);

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });
});

describe("multi-choice question", () => {
    const [question, correct, incorrect, invalid] =
        multiChoiceQuestionAndAnswer;

    const apiOptions: APIOptions = Object.freeze({});

    let userEvent: ReturnType<typeof userEventLib.setup>;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should accept the right answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question, apiOptions);

        // Act
        const options = screen.getAllByRole("checkbox");
        for (const i of correct) {
            await userEvent.click(options[i]);
        }

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should select multiple options when clicked", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
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
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
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
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };

        // Act
        const {renderer} = renderQuestion(question, apiOptions);

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("should be invalid when incorrect number of choices selected", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
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

        const {renderer} = renderQuestion(
            multipleCorrectChoicesQuestion,
            apiOptions,
        );

        // Act
        const option = screen.getAllByRole("checkbox");
        await userEvent.click(option[0]); // correct
        await userEvent.click(option[1]); // correct
        await userEvent.click(option[2]); // incorrect

        // Assert
        expect(renderer).toHaveInvalidInput(
            "Please choose the correct number of answers",
        );
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

            // Assert
            expect(renderer).toHaveBeenAnsweredIncorrectly();
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

            // Assert
            expect(renderer).toHaveInvalidInput();
        },
    );
});
