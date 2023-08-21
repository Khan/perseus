import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

// eslint-disable-next-line import/no-relative-packages
import {testDependencies} from "../../../../../../testing/test-dependencies";
import {setDependencies} from "../../../dependencies";
import {generateChoice} from "../../__testdata__/base-radio.testdata";
import BaseRadio from "../../radio/base-radio";

import type {APIOptions} from "../../../types";

function renderBaseRadio(props) {
    const apiOptions: APIOptions = Object.freeze({});

    const baseProps = {
        apiOptions,
        choices: [],
        deselectEnabled: false,
        editMode: false,
        labelWrap: false,
        countChoices: false,
        numCorrect: 1,
        multipleSelect: false,

        // A callback indicating that this choice has changed. Its argument is
        // an object with two keys: `checked` and `crossedOut`. Each contains
        // an array of boolean values, specifying the new checked and
        // crossed-out value of each choice.
        onChange: ({checked, crossedOut}) => {},

        // Whether this widget was the most recently used widget in this
        // Renderer. Determines whether we'll auto-scroll the page upon
        // entering review mode.
        isLastUsedWidget: false,
    } as const;

    const overwrittenProps = {...baseProps, ...props} as const;

    return render(<BaseRadio {...overwrittenProps} />);
}

describe("base-radio", () => {
    beforeEach(() => {
        // because choice-none-above uses a Renderer
        // we need to set dependencies when it's rendered
        // (this probably needs to be fixed)
        setDependencies(testDependencies);
    });

    it("renders a none of the above choice", () => {
        // Arrange / Act
        renderBaseRadio({
            choices: [
                generateChoice({content: "Option 1", correct: false}),
                generateChoice({content: "Option B", correct: false}),
                generateChoice({content: "Option Gamma", correct: false}),
                generateChoice({content: "Option Delta", correct: false}),
                generateChoice({
                    isNoneOfTheAbove: true,
                    correct: true,
                }),
            ],
        });

        // Assert
        expect(
            screen.getByRole("radio", {
                name: "(Choice E) None of the above",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText("(Choice E) None of the above"),
        ).toBeInTheDocument();
        // Note(Tamara): There should be two of these options: one for the
        // screen reader only radio input and a button for learners
        // using the visual choices
        expect(screen.getAllByText("None of the above")).toHaveLength(2);
    });

    it("registers as checked when none of the above choice is clicked", () => {
        // Arrange
        let updatedValues = null;
        const onChangeHandler = (newValues: {
            checked: ReadonlyArray<boolean>;
            crossedOut: ReadonlyArray<boolean>;
        }) => {
            // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
            updatedValues = newValues;
        };

        renderBaseRadio({
            choices: [
                generateChoice({content: "Option 1", correct: false}),
                generateChoice({content: "Option B", correct: false}),
                generateChoice({content: "Option Gamma", correct: false}),
                generateChoice({content: "Option Delta", correct: false}),
                generateChoice({
                    isNoneOfTheAbove: true,
                    correct: true,
                }),
            ],
            onChange: onChangeHandler,
        });

        const noneOption = screen.getByRole("radio", {
            name: "(Choice E) None of the above",
        });

        // Act
        userEvent.click(noneOption);

        // Assert
        expect(updatedValues).toMatchObject({
            checked: [false, false, false, false, true],
        });
    });

    describe("edit mode", () => {
        it("should render <li>'s for each choice", () => {
            // Arrange / Act
            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: false}),
                ],
            });

            // Assert
            expect(screen.getAllByRole("listitem")).toHaveLength(4);
        });

        it("should not toggle choice when inner element clicked", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: false}),
                ],
                onChange: onChangeHandler,
            });

            // Act
            userEvent.click(
                screen.getByRole("radio", {name: "(Choice C) Option Gamma"}),
            );

            // Assert
            expect(updatedValues).toBeNull();
        });

        it("should toggle choice when choice icon clicked", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: false}),
                ],
                onChange: onChangeHandler,
            });

            // Act
            userEvent.click(
                screen.getAllByTestId("choice-icon__library-choice-icon")[2],
            );

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, true, false],
            });
        });
    });

    describe("selecting and deselecting options", () => {
        it("deselects multi-select choice", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: true,
                choices: [
                    generateChoice({
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option Gamma",
                        correct: true,
                        checked: true,
                    }),
                    generateChoice({
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            const radioButton = screen.getByRole("checkbox", {
                name: "(Choice C, Checked) Option Gamma",
            });
            userEvent.click(radioButton);

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, false, false],
            });
        });

        // Equivalent to "should toggle choice when inner element clicked" but with editMode set to false
        it("selects single select choice", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option Gamma",
                        correct: true,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            userEvent.click(
                screen.getByRole("radio", {name: "(Choice C) Option Gamma"}),
            );

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, true, false],
            });
        });

        it("deselects single select choice", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        content: "Option Gamma",
                        correct: true,
                        checked: true,
                    }),
                    generateChoice({
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            const radioButton = screen.getByRole("radio", {
                name: "(Choice C, Checked) Option Gamma",
            });
            userEvent.click(radioButton);

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, false, false],
            });
        });

        it("selects multi-select choice", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: true,
                choices: [
                    generateChoice({
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            userEvent.click(
                screen.getByRole("checkbox", {name: "(Choice C) Option Gamma"}),
            );

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, true, false],
            });
        });
    });

    describe("instruction text", () => {
        it("displays correct text for single select", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: false}),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose 1 answer:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });

        it("displays correct text for multi select (count choices off)", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: true,
                countChoices: false,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: true}),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose all answers that apply:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });

        it("displays correct text for multi select (count choices on)", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: true,
                countChoices: true,
                numCorrect: 2,
                choices: [
                    generateChoice({content: "Option 1", correct: false}),
                    generateChoice({content: "Option B", correct: false}),
                    generateChoice({content: "Option Gamma", correct: true}),
                    generateChoice({content: "Option Delta", correct: true}),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose 2 answers:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });
    });
});
