// @flow

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import BaseRadio from "../../radio/base-radio.jsx";

import type {APIOptions} from "../../../types.js";

function generateChoice(options) {
    const base = {
        checked: false,
        crossedOut: false,
        content: "",
        rationale: "",
        hasRationale: false,
        showRationale: false,
        showCorrectness: false,
        correct: false,
        originalIndex: 0,
        isNoneOfTheAbove: false,
        highlighted: false,
        previouslyAnswered: false,
        revealNoneOfTheAbove: false,
        disabled: false,
    };

    return {...base, ...options};
}

function renderBaseRadio(props) {
    const apiOptions: APIOptions = {
        styling: {radioStyleVersion: "final"},
    };

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
    };

    const overwrittenProps = {...baseProps, ...props};

    try {
        return render(<BaseRadio {...overwrittenProps} />);
    } catch (err) {
        console.log(err);
    }
}

describe("base-radio", () => {
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

        it("should toggle choice when inner element clicked", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues) => {
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
                screen.getByRole("checkbox", {name: "Select Choice C"}),
            );

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, true, false],
            });
        });
    });

    describe("selecting and deselecting options", () => {
        it("deselects multi-select choices", () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues) => {
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
                name: "Select Choice C",
            });
            userEvent.click(radioButton);

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, false, false],
            });
        });

        // Equivalent to "should toggle choice when inner element clicked" but with editMode set to false
        it("select single select choices", () => {
            // Arrange
            const apiOptions: APIOptions = {
                styling: {radioStyleVersion: "final"},
            };
            let updatedValues = null;
            const onChangeHandler = (newValues) => {
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
                screen.getByRole("checkbox", {name: "Select Choice C"}),
            );

            // Assert
            expect(updatedValues).toMatchObject({
                checked: [false, false, true, false],
            });
        });
    });
});
