import {screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./cs-program.testdata";

import type {PerseusCSProgramUserInput} from "@khanacademy/perseus-core";

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

    describe("CS Program widget postMessage handling", () => {
        it("should score as correct when postMessage has testsPassed: true", () => {
            const {renderer} = renderQuestion(question1);
            const iframeElement = screen.getByTitle(
                "CS Program",
            ) as HTMLIFrameElement;

            if (!iframeElement.contentWindow) {
                throw new Error(
                    "Iframe or its contentWindow not found for test event source",
                );
            }

            const messageData = {testsPassed: true, message: "Nicely done!"};

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: JSON.stringify(messageData),
                    source: iframeElement.contentWindow,
                });
                window.dispatchEvent(fakeEvent);
            });

            const score = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            expect(score).toHaveBeenAnsweredCorrectly();
            expect(score.message).toBe("Nicely done!");
        });

        it("should score as incorrect when postMessage has testsPassed: false", () => {
            const {renderer} = renderQuestion(question1);
            const iframeElement = screen.getByTitle(
                "CS Program",
            ) as HTMLIFrameElement;

            if (!iframeElement.contentWindow) {
                throw new Error(
                    "Iframe or its contentWindow not found for test event source",
                );
            }

            const messageData = {testsPassed: false, message: "Try again."};

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: JSON.stringify(messageData),
                    source: iframeElement.contentWindow,
                });
                window.dispatchEvent(fakeEvent);
            });

            const score = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            expect(score).toHaveBeenAnsweredIncorrectly();
            expect(score.message).toBe("Try again.");
        });

        it("should retain initial invalid score if postMessage is missing testsPassed", () => {
            const {renderer} = renderQuestion(question1);
            const initialScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            const expectedInitialMessage = "Keep going, you're not there yet!";
            expect(initialScore).toHaveInvalidInput(expectedInitialMessage);

            const messageData = {
                info: "This is just an informational message.",
            };

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: JSON.stringify(messageData),
                });
                window.dispatchEvent(fakeEvent);
            });

            const currentScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            expect(currentScore).toHaveInvalidInput(expectedInitialMessage);
        });

        it("should retain initial invalid score if postMessage data is not valid JSON", () => {
            const {renderer} = renderQuestion(question1);
            const initialScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            const expectedInitialMessage = "Keep going, you're not there yet!";
            expect(initialScore).toHaveInvalidInput(expectedInitialMessage);

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: "this is not json",
                });
                window.dispatchEvent(fakeEvent);
            });

            const currentScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInputMap(),
            );
            expect(currentScore).toHaveInvalidInput(expectedInitialMessage);
        });
    });
});
