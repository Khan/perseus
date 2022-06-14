// @flow

import {screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import _ from "underscore";
import "@testing-library/jest-dom"; // Imports custom mathers

import {getMockUniqueId} from "../../../../../testing/mock-unique-id.js";
import {clone} from "../../../../../testing/object-utils.js";
import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {
    passageWidget,
    questionAndAnswer,
    multiChoiceQuestionAndAnswer,
} from "../__testdata__/radio_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

import type {
    PerseusRenderer,
    RadioWidget,
    PerseusRadioWidgetOptions,
} from "../../perseus-types.js";
import type {APIOptions} from "../../types.js";

const waitForTooltip = () => {
    // We need to wait !!three!! render passes for the NewTooltip to be
    // fully rendered.
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
};

const selectOption = (index: number) => {
    const options = screen.getAllByRole("button");
    const selectButton = options[index];
    userEvent.click(selectButton);
};

describe("single-choice question", () => {
    beforeEach(() => {
        jest.spyOn(_, "uniqueId").mockImplementation(getMockUniqueId());
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    const [question, correct, incorrect] = questionAndAnswer;

    describe.each([[true], [false]])("satStyling: %s", (satStyling) => {
        const apiOptions: APIOptions = {
            satStyling,
        };

        describe.each([[true], [false]])(
            "reviewMode: %s",
            (reviewMode: boolean) => {
                it("should snapshot the same", () => {
                    // Arrange & Act
                    const {container} = renderQuestion(question, apiOptions, {
                        reviewMode,
                    });

                    // Assert
                    expect(container).toMatchSnapshot("first render");
                });

                it("should snapshot the same with correct answer", () => {
                    // Arrange
                    const {container} = renderQuestion(question, apiOptions);

                    // Act
                    selectOption(correct);

                    // Assert
                    expect(container).toMatchSnapshot("correct answer");
                });

                it("should snapshot the same with incorrect answer", () => {
                    // Arrange
                    const {container} = renderQuestion(question, apiOptions);

                    // Act
                    selectOption(incorrect[0]);

                    // Assert
                    expect(container).toMatchSnapshot("incorrect answer");
                });

                it("should accept the right answer (mouse)", () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions);

                    // Act
                    selectOption(correct);
                    // Assert
                    expect(renderer).toHaveBeenAnsweredCorrectly();
                });

                it("should accept the right answer (touch)", () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions);
                    const correctRadio = screen.getAllByRole("button")[correct];

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
                    (incorrect: number) => {
                        // Arrange
                        const {renderer} = renderQuestion(question, apiOptions);

                        // Act
                        selectOption(incorrect);

                        // Assert
                        expect(renderer).toHaveBeenAnsweredIncorrectly();
                    },
                );

                it("calling .focus() on the renderer should succeed", () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions);

                    // Act
                    const gotFocus = renderer.focus();

                    // Assert
                    expect(gotFocus).toBeTrue();
                });

                it("should deselect incorrect selected choices", () => {
                    // Arrange
                    const {renderer} = renderQuestion(question, apiOptions, {
                        reviewMode,
                    });

                    // Act
                    // Since this is a single-select setup, just select the first
                    // incorrect choice.
                    selectOption(incorrect[0]);
                    renderer.deselectIncorrectSelectedChoices();

                    // Assert
                    screen.getAllByRole("button").forEach((r) => {
                        expect(r).not.toHaveAttribute("aria-selected", "true");
                    });
                });

                // TODO(Nicole): the widget seems like it's not getting the static prop
                xit("should disable all radio inputs when static is true", () => {
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
                    };
                    renderQuestion(staticQuestion, apiOptions, {reviewMode});

                    // Act
                    selectOption(correct);

                    // Assert
                    // Everything's read-only so no selections made
                    screen.getAllByRole("button").forEach((r) => {
                        expect(r).toHaveAttribute("aria-disabled", "true");
                    });
                });
            },
        );

        it("should be able to navigate down by keyboard", () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            userEvent.tab();
            expect(screen.getAllByRole("button")[0]).toHaveFocus();
            userEvent.tab();

            // Assert
            expect(screen.getAllByRole("button")[1]).toHaveFocus();
        });

        it("should be able to navigate up by keyboard", () => {
            // Arrange
            renderQuestion(question, apiOptions);

            // Act
            userEvent.tab();
            expect(screen.getAllByRole("button")[0]).toHaveFocus();
            userEvent.tab();
            expect(screen.getAllByRole("button")[1]).toHaveFocus();
            userEvent.tab({shift: true});

            // Assert
            expect(screen.getAllByRole("button")[0]).toHaveFocus();
        });

        it("should be able to navigate through 'None of the above' choice by keyboard", () => {
            // Arrange
            const q = clone(question);
            ((q.widgets["radio 1"]
                .options: any): PerseusRadioWidgetOptions).choices[3].isNoneOfTheAbove = true;
            renderQuestion(q, apiOptions);

            // Act
            userEvent.tab();
            userEvent.tab();
            userEvent.tab();

            // Assert
            expect(screen.getAllByRole("button")[2]).toHaveFocus();
        });

        it.each([
            ["No", "Yes"],
            ["False", "True"],
        ])("should enforce ordering for common answers: %j", (...answers) => {
            // Arrange
            const q = clone(question);
            ((q.widgets["radio 1"]
                .options: any): PerseusRadioWidgetOptions).choices = answers.map(
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
            userEvent.click(screen.getAllByRole("button")[0]);

            // Assert
            const items = screen.getAllByRole("listitem");
            expect(items[0]).toHaveTextContent(answers[1]);
            expect(items[1]).toHaveTextContent(answers[0]);
            expect(renderer).toHaveBeenAnsweredCorrectly();
        });

        it("should not change ordering of non-common answers", () => {
            // Arrange
            const answers = ["Last", "First"];
            const q = clone(question);
            ((q.widgets["radio 1"]
                .options: any): PerseusRadioWidgetOptions).choices = answers.map(
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

        it("should transform inline passage-refs to references to passage widgets", () => {
            // Arrange

            // Add a passage widget to the question content and then reference it
            // in an answer.
            const questionWithPassage = clone(question);
            questionWithPassage.content = `[[\u2603 passage 1]]\n\nNow what's the answer?\n\n[[\u2603 radio 1]]`;
            questionWithPassage.widgets["passage 1"] = passageWidget;
            const radioOptions = questionWithPassage.widgets["radio 1"];
            // HACK(jeremy): Flow doesn't know what type these options are because
            // we've extracted them out of a generic `PerseusJson` blob and all the
            // `widget` items are just type `Widget`.
            (radioOptions.options: any).choices[0].content =
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

        it("Should render option statuses (rationales) for selected choices", () => {
            // Arrange
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            selectOption(incorrect[0]);
            renderer.showRationalesForCurrentlySelectedChoices();

            // Assert
            expect(
                screen.queryAllByTestId(
                    `perseus-radio-rationale-content-${incorrect[0]}`,
                ),
            ).toHaveLength(1);
        });

        describe("cross-out is enabled", () => {
            const crossOutApiOptions = {
                ...apiOptions,
                crossOutEnabled: true,
            };

            it("should render cross-out menu button", () => {
                // Arrange

                // Act
                renderQuestion(question, crossOutApiOptions);

                // Assert
                expect(
                    screen.getByRole("button", {
                        name: /Open menu for Choice B/,
                    }),
                ).toBeVisible();
            });

            xit("should open the cross-out menu when button clicked", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);

                // Act
                userEvent.click(
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

            xit("should open the cross-out menu when focused and spacebar pressed", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);
                userEvent.tab(); // Choice icon
                userEvent.tab(); // Cross-out menu ellipsis

                // Act
                userEvent.keyboard("{space}");
                waitForTooltip();

                // Assert
                expect(
                    screen.getByRole("button", {
                        name: /Cross out Choice A/,
                    }),
                ).toHaveFocus();
            });

            xit("should cross-out selection and dismiss button when clicked", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);
                userEvent.click(
                    screen.getByRole("button", {
                        name: /Open menu for Choice B/,
                    }),
                );
                waitForTooltip();

                // Act
                userEvent.click(
                    screen.getByRole("button", {
                        name: /Cross out Choice B/,
                    }),
                );
                jest.runOnlyPendingTimers();

                // Assert
                expect(
                    screen.queryAllByRole("button", {
                        name: /Cross out Choice B/,
                    }),
                ).toHaveLength(0);

                // The choice widget maintains a "preview" of what the opposite
                // state is for use in the "Cross-out button", but it's lazy in
                // updating the preview (only changing it when the button is
                // revealed). So once we cross-out a choice, we have two elements
                // in the DOM with the `Cross out` text. :shrug:
                expect(
                    screen.queryAllByText("(Choice B, Crossed out)"),
                ).toHaveLength(2);
            });

            xit("should dismiss cross-out button with {tab} key", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);
                userEvent.tab(); // Choice icon
                userEvent.tab(); // Cross-out menu ellipsis

                // Open
                userEvent.keyboard("{space}");
                waitForTooltip();

                expect(
                    screen.queryAllByRole("button", {
                        name: /Cross out Choice A/,
                    }),
                ).toHaveLength(1);

                // Act
                userEvent.tab();

                // Assert
                expect(
                    screen.queryAllByRole("button", {
                        name: /Cross out Choice B/,
                    }),
                ).toHaveLength(0);
            });

            xit("should dismiss cross-out button with {Escape} key", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);

                userEvent.tab(); // Choice icon
                userEvent.tab(); // Cross-out menu ellipsis
                userEvent.keyboard("{space}"); // Open tooltip

                // Global escape handler only set up after a clock tick
                jest.runOnlyPendingTimers();

                // Act
                userEvent.keyboard("{esc}");

                // Assert
                expect(
                    screen.queryAllByRole("button", {
                        name: /Cross out Choice B/,
                    }),
                ).toHaveLength(0);
            });

            xit("should dismiss cross-out button with click outside tooltip", () => {
                // Arrange
                renderQuestion(question, crossOutApiOptions);

                userEvent.tab(); // Choice icon
                userEvent.tab(); // Cross-out menu ellipsis
                userEvent.keyboard("{space}"); // Open tooltip

                // Global escape handler only set up after a clock tick
                jest.runOnlyPendingTimers();

                // Act
                userEvent.click((document.body: any));

                // Assert
                expect(
                    screen.queryAllByRole("button", {
                        name: /Cross out Choice B/,
                    }),
                ).toHaveLength(0);
            });
        });
    });

    it("should be invalid when first rendered", () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };

        // Act
        const {renderer} = renderQuestion(question, apiOptions);

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("Should render correct option select statuses (rationales) when review mode enabled", () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
        renderQuestion(question, apiOptions, {reviewMode: true});

        // Act
        selectOption(correct);

        // Assert
        expect(screen.getAllByText("Correct (selected)")).toHaveLength(1);
    });

    it("Should render incorrect option select statuses (rationales) when review mode enabled", () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
        renderQuestion(question, apiOptions, {reviewMode: true});

        // Act
        selectOption(incorrect[0]);

        // Assert
        expect(screen.getAllByText("Incorrect (selected)")).toHaveLength(1);
    });
});

describe("multi-choice question", () => {
    const [question, correct, incorrect, invalid] =
        multiChoiceQuestionAndAnswer;

    const apiOptions: APIOptions = {
        satStyling: false,
    };

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should accept the right answer", () => {
        // Arrange
        const {renderer} = renderQuestion(question, apiOptions);

        // Act
        const options = screen.getAllByRole("button");
        correct.forEach((i) => userEvent.click(options[i]));

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should snapshot the same when invalid", () => {
        // Arrange
        const {container} = renderQuestion(question, apiOptions);

        // Act
        const options = screen.getAllByRole("button");
        incorrect[0].forEach((i) => userEvent.click(options[i]));

        // Assert
        expect(container).toMatchSnapshot("invalid state");
    });

    it("should be invalid when incorrect number of choices selected", () => {
        // Arrange
        const apiOptions: APIOptions = {
            crossOutEnabled: false,
        };
        const radio1Widget = ((question.widgets["radio 1"]: any): RadioWidget);
        const radioOptions = radio1Widget.options;

        const multipleCorrectChoicesQuestion: PerseusRenderer = {
            ...question,
            widgets: {
                ...question.widgets,
                "radio 1": ({
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
                }: RadioWidget),
            },
        };

        const {renderer} = renderQuestion(
            multipleCorrectChoicesQuestion,
            apiOptions,
        );

        // Act
        const option = screen.getAllByRole("button");
        userEvent.click(option[3]); // incorrect

        // Assert
        expect(renderer).toHaveInvalidInput(
            "Please choose the correct number of answers",
        );
    });

    xit.each(incorrect)(
        "should reject an incorrect answer - test #%#",
        (...choices) => {
            // Arrange
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const boxes = screen.getAllByRole("checkbox");
            choices.forEach((i) => userEvent.click(boxes[i]));

            // Assert
            expect(renderer).toHaveBeenAnsweredIncorrectly();
        },
    );

    xit.each(invalid)(
        "should reject an invalid answer - test #%#",
        (...choices) => {
            // Arrange
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const boxes = screen.getAllByRole("checkbox");
            choices.forEach((i) => userEvent.click(boxes[i]));

            // Assert
            expect(renderer).toHaveInvalidInput();
        },
    );
});
