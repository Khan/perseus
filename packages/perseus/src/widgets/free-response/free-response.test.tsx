import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {getFreeResponseItemData} from "./free-response.testdata";

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
        const {container} = renderQuestion(
            getFreeResponseItemData(),
            apiOptions,
        );

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(
            getFreeResponseItemData(),
            apiOptions,
        );

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should render the question text", () => {
        // Arrange
        // Act
        renderQuestion(getFreeResponseItemData(), {});

        // Assert
        expect(
            screen.getByRole("textbox", {name: "test-question"}),
        ).toBeVisible();
    });

    it("should return the correct user input", async () => {
        // Arrange
        const {renderer} = renderQuestion(getFreeResponseItemData());
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
});
