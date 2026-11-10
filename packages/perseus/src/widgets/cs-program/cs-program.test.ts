import {act, screen} from "@testing-library/react";

import {renderQuestion} from "../../__testutils__/render-question";

import {question1} from "./cs-program.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

// The embedded scratchpad reports its result to the widget by posting a
// message to `window`. This dispatches such a message the way the iframe would.
function postResultFromIframe(data: unknown): void {
    act(() => {
        window.dispatchEvent(
            new MessageEvent("message", {data: JSON.stringify(data)}),
        );
    });
}

describe("cs-program widget", () => {
    it("should snapshot", () => {
        // Arrange
        const apiOptions = {
            isMobile: false,
        } as const;

        // Act
        const {container} = renderQuestion(question1, {apiOptions});

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions = {
            isMobile: true,
        } as const;

        // Act
        const {container} = renderQuestion(question1, {apiOptions});

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should show default user input before user interaction", () => {
        const apiOptions = {
            isMobile: false,
        } as const;

        const {renderer} = renderQuestion(question1, {apiOptions});
        const userInput = renderer.getUserInputMap()["cs-program 1"];

        expect(userInput.status).toBe("incomplete");
        expect(userInput.message).toBe(null);
    });

    describe("postMessage handling", () => {
        it("sets status to correct when the program reports tests passed", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            postResultFromIframe({testsPassed: true, message: "Nicely done!"});

            // Assert
            const userInput = renderer.getUserInputMap()["cs-program 1"];
            expect(userInput.status).toBe("correct");
            expect(userInput.message).toBe("Nicely done!");
        });

        it("sets status to incorrect when the program reports tests failed", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            postResultFromIframe({testsPassed: false, message: "Try again."});

            // Assert
            const userInput = renderer.getUserInputMap()["cs-program 1"];
            expect(userInput.status).toBe("incorrect");
            expect(userInput.message).toBe("Try again.");
        });

        it("ignores messages that omit testsPassed", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            postResultFromIframe({message: "just informational"});

            // Assert
            const userInput = renderer.getUserInputMap()["cs-program 1"];
            expect(userInput.status).toBe("incomplete");
            expect(userInput.message).toBe(null);
        });

        it("ignores messages whose data is not valid JSON", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            act(() => {
                window.dispatchEvent(
                    new MessageEvent("message", {data: "this is not json"}),
                );
            });

            // Assert
            const userInput = renderer.getUserInputMap()["cs-program 1"];
            expect(userInput.status).toBe("incomplete");
            expect(userInput.message).toBe(null);
        });

        it("keeps forwarding results to the latest handler across re-renders", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act: the first result re-renders the widget (updating its
            // `handleUserInput`); the second must still reach it. The listener
            // is registered only once, on mount, so it has to forward to the
            // latest handler rather than a stale one captured at mount time.
            postResultFromIframe({testsPassed: false, message: "Not yet."});
            postResultFromIframe({testsPassed: true, message: "Got it!"});

            // Assert
            const userInput = renderer.getUserInputMap()["cs-program 1"];
            expect(userInput.status).toBe("correct");
            expect(userInput.message).toBe("Got it!");
        });
    });

    describe("disabled state", () => {
        function withStatic(isStatic: boolean): PerseusRenderer {
            return {
                ...question1,
                widgets: {
                    "cs-program 1": {
                        ...question1.widgets["cs-program 1"],
                        static: isStatic,
                    },
                },
            };
        }

        it("lets the iframe receive mouse and keyboard input when interactive", () => {
            // Arrange, Act
            renderQuestion(withStatic(false), {apiOptions: {readOnly: false}});

            // Assert
            const iframe = screen.getByTitle("Computer science program");
            expect(iframe).not.toHaveStyle({pointerEvents: "none"});
            expect(iframe).not.toHaveAttribute("tabindex");
        });

        it.each([
            {name: "static", isStatic: true, readOnly: false},
            {name: "read-only", isStatic: false, readOnly: true},
        ])(
            "blocks mouse input and removes the iframe from the tab order " +
                "when $name",
            ({isStatic, readOnly}) => {
                // Arrange, Act
                renderQuestion(withStatic(isStatic), {apiOptions: {readOnly}});

                // Assert
                const iframe = screen.getByTitle("Computer science program");
                expect(iframe).toHaveStyle({pointerEvents: "none"});
                expect(iframe).toHaveAttribute("tabindex", "-1");
            },
        );
    });
});
