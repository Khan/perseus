import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question} from "./free-response.testdata";

import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe("free-response widget", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

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
        const {container} = renderQuestion(question, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should render the question text", () => {
        // Arrange
        // Act
        renderQuestion(question, {});

        // Assert
        expect(screen.getByLabelText("test-question")).toBeVisible();
    });

    it("should return the correct user input", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        await userEvent.type(
            screen.getByLabelText("test-question"),
            "test-answer",
        );

        // Act
        const userInput = renderer.getUserInputMap();

        // Assert
        expect(userInput).toMatchObject({
            "free-response 1": {
                currentValue: "test-answer",
            },
        });
    });

    // TODO(agoforth): Create a custom validator for the free-response widget
    //   that will cause this test to pass.
    // it("should be included in the empty widgets list if no text has been input yet", async () => {
    //     // Arrange
    //     const {renderer} = renderQuestion(question1);

    //     // Act
    //     const userInput = renderer.emptyWidgets();

    //     // Assert
    //     expect(userInput).toHaveLength(1);
    //     expect(userInput[0]).toBe("free-response 1");
    // });
});
