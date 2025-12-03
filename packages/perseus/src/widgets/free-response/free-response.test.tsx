import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

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
            generateTestPerseusRenderer({
                content: "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget(),
                },
            }),
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
            generateTestPerseusRenderer({
                content: "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget(),
                },
            }),
            apiOptions,
        );

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should render the character limit when not allowing unlimited characters", () => {
        // Arrange
        const data = generateTestPerseusRenderer({
            content: "[[☃ free-response 1]]",
            widgets: {
                "free-response 1": generateFreeResponseWidget({
                    options: generateFreeResponseOptions({
                        allowUnlimitedCharacters: false,
                    }),
                }),
            },
        });

        // Act
        renderQuestion(data, {});

        // Assert
        expect(screen.queryByText(/Character/)).toBeVisible();
    });

    it("should not render the character limit when allowing unlimited characters", () => {
        // Arrange
        const data = generateTestPerseusRenderer({
            content: "[[☃ free-response 1]]",
            widgets: {
                "free-response 1": generateFreeResponseWidget({
                    options: generateFreeResponseOptions({
                        allowUnlimitedCharacters: true,
                    }),
                }),
            },
        });

        // Act
        renderQuestion(data, {});

        // Assert
        expect(screen.queryByText(/Character/)).not.toBeInTheDocument();
    });

    it("should ignore newline characters when rendering the character limit", async () => {
        // Arrange
        const data = generateTestPerseusRenderer({
            content: "[[☃ free-response 1]]",
            widgets: {
                "free-response 1": generateFreeResponseWidget({
                    options: generateFreeResponseOptions({
                        characterLimit: 10,
                        question: "test-question",
                    }),
                }),
            },
        });

        // Act
        renderQuestion(data, {});

        await userEvent.type(
            screen.getByRole("textbox", {name: "test-question"}),
            "a\nb",
        );

        // Assert
        expect(screen.queryByText(/2 \/ 10 Character/)).toBeVisible();
    });

    it("should render the question text", () => {
        // Arrange
        // Act
        renderQuestion(
            generateTestPerseusRenderer({
                content: "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget({
                        options: generateFreeResponseOptions({
                            question: "test-question",
                        }),
                    }),
                },
            }),
            {},
        );

        // Assert
        expect(
            screen.getByRole("textbox", {name: "test-question"}),
        ).toBeVisible();
    });

    it("should render the placeholder text", () => {
        // Arrange
        // Act
        renderQuestion(
            generateTestPerseusRenderer({
                content: "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget({
                        options: generateFreeResponseOptions({
                            placeholder: "test-placeholder",
                            question: "test-question",
                        }),
                    }),
                },
            }),
            {},
        );

        // Assert
        expect(
            screen.getByRole("textbox", {name: "test-question"}),
        ).toHaveAttribute("placeholder", "test-placeholder");
    });

    it("should return the correct user input", async () => {
        // Arrange
        const {renderer} = renderQuestion(
            generateTestPerseusRenderer({
                content: "[[☃ free-response 1]]",
                widgets: {
                    "free-response 1": generateFreeResponseWidget({
                        options: generateFreeResponseOptions({
                            question: "test-question",
                        }),
                    }),
                },
            }),
            {},
        );
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
