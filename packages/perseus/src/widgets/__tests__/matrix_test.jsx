// @flow

import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {testDependencies} from "../../../perseus-testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {question1} from "../__testdata__/matrix_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

import type {APIOptions} from "../../types.js";

describe("matrix widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can be answered correctly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const correctAnswers = [5, -2, 1, 1, 1, 1, 7, -3, 3, 0, 0, -2];
        screen.getAllByRole("textbox").forEach((textbox, index) => {
            userEvent.paste(textbox, correctAnswers[index].toString());
        });

        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        screen.getAllByRole("textbox").forEach((textbox, index) => {
            userEvent.paste(textbox, "1");
        });

        renderer.guessAndScore();

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
