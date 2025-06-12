import {act} from "react-dom/test-utils";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./iframe.testdata";

import type {APIOptions} from "../../types";

describe("iframe widget", () => {
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

    //There isn't testable behavior for this widget
    describe("iframe widget postMessage handling", () => {
        it("should score as correct when postMessage has testsPassed: true", () => {
            const {renderer} = renderQuestion(question1);

            const messageData = {testsPassed: true, message: "Nicely done!"};

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: JSON.stringify(messageData),
                });
                window.dispatchEvent(fakeEvent);
            });

            const score = scorePerseusItemTesting(
                question1,
                renderer.getUserInput(),
            );
            expect(score).toHaveBeenAnsweredCorrectly();
            expect(score.message).toBe("Nicely done!");
        });

        it("should score as incorrect when postMessage has testsPassed: false", () => {
            const {renderer} = renderQuestion(question1);

            const messageData = {testsPassed: false, message: "Try again."};

            act(() => {
                const fakeEvent = new MessageEvent("message", {
                    data: JSON.stringify(messageData),
                });
                window.dispatchEvent(fakeEvent);
            });

            const score = scorePerseusItemTesting(
                question1,
                renderer.getUserInput(),
            );
            expect(score).toHaveBeenAnsweredIncorrectly();
            expect(score.message).toBe("Try again.");
        });

        it("should retain initial invalid score if postMessage is missing testsPassed", () => {
            const {renderer} = renderQuestion(question1);
            const initialScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInput(),
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
                renderer.getUserInput(),
            );
            expect(currentScore).toHaveInvalidInput(expectedInitialMessage);
        });

        it("should retain initial invalid score if postMessage data is not valid JSON", () => {
            const {renderer} = renderQuestion(question1);
            const initialScore = scorePerseusItemTesting(
                question1,
                renderer.getUserInput(),
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
                renderer.getUserInput(),
            );
            expect(currentScore).toHaveInvalidInput(expectedInitialMessage);
        });
    });
});
