import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./cs-program.testdata";

import type {PerseusCSProgramUserInput} from "../../validation.types";

describe("cs-program widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions = {
            isMobile: false,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions = {
            isMobile: true,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should show default user input before user interaction", () => {
        const apiOptions = {
            isMobile: false,
        } as const;

        const {renderer} = renderQuestion(question1, apiOptions);
        const userInput =
            renderer.getUserInput()[0] as PerseusCSProgramUserInput;

        expect(userInput.status).toBe("incomplete");
        expect(userInput.message).toBe(null);
    });

    it("should snapshot default user input before user interaction", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toMatchInlineSnapshot(`
            [
              {
                "message": null,
                "status": "incomplete",
              },
            ]
        `);
    });
});
