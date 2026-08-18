import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {wait} from "../../testing/wait";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicQuestion} from "./sorter.testdata";

import type {APIOptions} from "../../types";

/*
 * Sortable settles its cards from a requestAnimationFrame callback, which can
 * land after a test has finished awaiting and React then reports as an
 * un-act()-ed update. Fixing it means reworking Sortable's drag animation, so we
 * let this one message through — but only this one. Blanket-mocking console.error
 * would also swallow genuine React errors and let a regression pass silently.
 */
const EXPECTED_CONSOLE_ERROR = /not wrapped in act\(/;

describe("sorter widget", () => {
    describe("snapshot", () => {
        it("should snapshot", async () => {
            // Arrange
            jest.useRealTimers();

            const apiOptions: APIOptions = {
                isMobile: false,
            };

            // Act
            const {container} = renderQuestion(basicQuestion, apiOptions);
            await wait();

            // Assert
            expect(container).toMatchSnapshot("first render");
        });

        it("should snapshot on mobile", async () => {
            // Arrange
            jest.useRealTimers();

            const apiOptions: APIOptions = {
                isMobile: true,
            };

            // Act
            const {container} = renderQuestion(basicQuestion, apiOptions);
            await wait();

            // Assert
            expect(container).toMatchSnapshot("first mobile render");
        });
    });

    describe("general behavior", () => {
        // The card contents in their correct order
        const sortedOrder = ["Zeroth", "First", "Second", "Third", "Fourth"];
        const sorterQuestion = generateTestPerseusRenderer({
            content: "[[☃ sorter 1]]",
            widgets: {
                "sorter 1": generateSorterWidget({
                    options: generateSorterOptions({correct: sortedOrder}),
                }),
            },
        });

        let unexpectedConsoleErrors: string[] = [];

        beforeEach(() => {
            unexpectedConsoleErrors = [];
            jest.spyOn(console, "error").mockImplementation((...args) => {
                const message = args.map(String).join(" ");
                if (!EXPECTED_CONSOLE_ERROR.test(message)) {
                    unexpectedConsoleErrors.push(message);
                }
            });

            jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
                ...testDependencies,
                TeX: ({
                    children,
                    onRender: onLoad,
                }: {
                    children: React.ReactNode;
                    onRender?: () => unknown;
                }) => {
                    React.useLayoutEffect(() => {
                        onLoad?.();
                    }, [onLoad]);
                    return <span className="tex-mock">{children}</span>;
                },
            });
        });

        afterEach(() => {
            expect(unexpectedConsoleErrors).toEqual([]);
        });

        it("reports itself as rendered to analytics", () => {
            // Arrange
            const onAnalyticsEvent = jest.fn();

            // Act
            renderQuestion(sorterQuestion, undefined, undefined, undefined, {
                ...testDependenciesV2,
                analytics: {onAnalyticsEvent},
            });

            // Assert
            expect(onAnalyticsEvent).toHaveBeenCalledWith({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "sorter",
                    widgetId: "sorter 1",
                },
            });
        });

        it("starts with the cards in a different order from the answer", () => {
            // Arrange, Act
            const {renderer} = renderQuestion(sorterQuestion);

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"].options).not.toEqual(
                sortedOrder,
            );
        });

        it("starts with every card present and the input marked unchanged", () => {
            // Arrange, Act
            const {renderer} = renderQuestion(sorterQuestion);

            // Assert
            const userInput = renderer.getUserInputMap()["sorter 1"];
            expect([...userInput.options].sort()).toEqual(
                [...sortedOrder].sort(),
            );
            expect(userInput.changed).toBe(false);
        });

        it("reports the new card order and marks the input changed when a card is moved", () => {
            // Arrange
            const {renderer} = renderQuestion(sorterQuestion);
            const sorter = renderer.findWidgets("sorter 1")[0];

            // Act
            sortedOrder.forEach((option, index) => {
                act(() => sorter.moveOptionToIndex(option, index));
            });

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"]).toEqual({
                options: sortedOrder,
                changed: true,
            });
        });

        it("tracks an interaction when a card is moved", () => {
            // Arrange
            const trackInteraction = jest.fn();
            const {renderer} = renderQuestion(sorterQuestion, {
                trackInteraction,
            });
            const sorter = renderer.findWidgets("sorter 1")[0];

            // Act
            act(() => sorter.moveOptionToIndex("Zeroth", 4));

            // Assert
            expect(trackInteraction).toHaveBeenCalledWith({
                type: "sorter",
                id: "sorter 1",
            });
        });

        it("does not track an interaction before any card is moved", () => {
            // Arrange, Act
            const trackInteraction = jest.fn();
            renderQuestion(sorterQuestion, {trackInteraction});

            // Assert
            expect(trackInteraction).not.toHaveBeenCalled();
        });

        it("describes the learner's current card order in the prompt JSON", () => {
            // Arrange
            const {renderer} = renderQuestion(sorterQuestion);
            const sorter = renderer.findWidgets("sorter 1")[0];

            // Act
            sortedOrder.forEach((option, index) => {
                act(() => sorter.moveOptionToIndex(option, index));
            });

            // Assert
            expect(sorter.getPromptJSON()).toEqual({
                type: "sorter",
                userInput: {values: sortedOrder, changed: true},
            });
        });
    });

    describe("answerless vs answerful", () => {
        const answerfulItem = generateTestPerseusItem({
            question: basicQuestion,
        });
        const answerlessItem = splitPerseusItem(answerfulItem);

        test("safety check: the answerless data does not contain the correct answer", () => {
            expect(
                answerlessItem.question.widgets["sorter 1"].options.correct,
            ).not.toEqual(
                answerfulItem.question.widgets["sorter 1"].options.correct,
            );
        });

        describe.each([
            ["answerful", answerfulItem],
            ["answerless", answerlessItem],
        ])("given %s data", (_, {question}) => {
            it("is initially scored 'invalid'", () => {
                // Arrange
                const {renderer} = renderQuestion(question);

                // Act
                const userInput = renderer.getUserInputMap();
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    userInput,
                );

                // Assert
                expect(score).toHaveInvalidInput();
            });

            it("can be answered correctly", () => {
                // Arrange
                const {renderer} = renderQuestion(question);
                const sorter = renderer.findWidgets("sorter 1")[0];

                // Act
                // Put the options in the correct order
                ["Zeroth", "First", "Second", "Third", "Fourth"].forEach(
                    (option, index) => {
                        act(() => sorter.moveOptionToIndex(option, index));
                    },
                );

                const userInput = renderer.getUserInputMap();
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    userInput,
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            });

            it("can be answered incorrectly", () => {
                // Arrange
                const {renderer} = renderQuestion(question);
                const sorter = renderer.findWidgets("sorter 1")[0];

                // Act
                act(() => sorter.moveOptionToIndex("Zeroth", 4));

                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredIncorrectly();
            });
        });
    });
});
