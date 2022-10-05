// @flow

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import BaseRadio from "../../radio/base-radio.jsx";

import type {APIOptions} from "../../../types.js";

describe("base-radio", () => {
    describe("edit mode", () => {
        it("should render <li>'s for each choice", () => {
            // Arrange
            const apiOptions: APIOptions = {
                styling: {radioStyleVersion: "final"},
            };
            const onChangeHandler = () => {};

            // Act
            render(
                <BaseRadio
                    multipleSelect={false}
                    countChoices={false}
                    numCorrect={1}
                    editMode={true}
                    labelWrap={false}
                    apiOptions={apiOptions}
                    choices={[
                        {content: "Option 1", correct: false},
                        {content: "Option B", correct: false},
                        {content: "Option Gamma", correct: true},
                        {content: "Option Delta", correct: false},
                    ]}
                    onChange={onChangeHandler}
                />,
            );

            // Assert
            expect(screen.getAllByRole("listitem")).toHaveLength(4);
        });

        it("should toggle choice when inner element clicked", () => {
            // Arrange
            const apiOptions: APIOptions = {
                styling: {radioStyleVersion: "final"},
            };
            let updatedValues = null;
            const onChangeHandler = (newValues) => {
                updatedValues = newValues;
            };

            render(
                <BaseRadio
                    multipleSelect={false}
                    countChoices={false}
                    numCorrect={1}
                    editMode={true}
                    labelWrap={false}
                    apiOptions={apiOptions}
                    choices={[
                        {content: "Option 1", correct: false},
                        {content: "Option B", correct: false},
                        {content: "Option Gamma", correct: true},
                        {content: "Option Delta", correct: false},
                    ]}
                    onChange={onChangeHandler}
                />,
            );

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
            const apiOptions: APIOptions = {
                styling: {radioStyleVersion: "final"},
            };
            let updatedValues = null;
            const onChangeHandler = (newValues) => {
                updatedValues = newValues;
            };

            render(
                <BaseRadio
                    multipleSelect={true}
                    countChoices={false}
                    numCorrect={1}
                    editMode={false}
                    labelWrap={false}
                    apiOptions={apiOptions}
                    choices={[
                        {content: "Option 1", correct: false, checked: false},
                        {content: "Option B", correct: false, checked: false},
                        {content: "Option Gamma", correct: true, checked: true},
                        {
                            content: "Option Delta",
                            correct: false,
                            checked: false,
                        },
                    ]}
                    onChange={onChangeHandler}
                />,
            );

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

            render(
                <BaseRadio
                    multipleSelect={false}
                    countChoices={false}
                    numCorrect={1}
                    editMode={false}
                    labelWrap={false}
                    apiOptions={apiOptions}
                    choices={[
                        {content: "Option 1", correct: false},
                        {content: "Option B", correct: false},
                        {content: "Option Gamma", correct: true},
                        {content: "Option Delta", correct: false},
                    ]}
                    onChange={onChangeHandler}
                />,
            );

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
