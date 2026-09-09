import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act, screen} from "@testing-library/react";
// @ts-expect-error - TS2305 - Module '"aphrodite"' has no exported member 'StyleSheetTestUtils'.
import {StyleSheetTestUtils} from "aphrodite";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {wait} from "../../testing/wait";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {SORTER_MAX_HORIZONTAL_OPTIONS} from "./sorter";
import {basicQuestion} from "./sorter.testdata";

import type {SorterHandle} from "./sorter";
import type {APIOptions} from "../../types";

/*
 * Sortable settles its cards from a requestAnimationFrame callback, which can
 * land after a test has finished awaiting and React then reports as an
 * un-act()-ed update. Fixing it means reworking Sortable's drag animation, so we
 * let this one message through — but only this one. Blanket-mocking console.error
 * would also swallow genuine React errors and let a regression pass silently.
 */
const EXPECTED_CONSOLE_ERROR = /not wrapped in act\(/;

/**
 * Sortable keeps its cards behind a spinner until the math typesetter reports
 * that it has loaded, which it learns from a dummy TeX component's `onRender`.
 * The default test TeX never calls `onRender`, so any test that needs to see
 * the cards themselves has to supply one that does.
 */
function mockTexThatFinishesLoading() {
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
}

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

            mockTexThatFinishesLoading();
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
            const sorter: SorterHandle = renderer.findWidgets("sorter 1")[0];

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
            const sorter: SorterHandle = renderer.findWidgets("sorter 1")[0];

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
            const sorter: SorterHandle = renderer.findWidgets("sorter 1")[0];

            // Act
            sortedOrder.forEach((option, index) => {
                act(() => sorter.moveOptionToIndex(option, index));
            });

            // Assert
            expect(renderer.findWidgets("sorter 1")[0].getPromptJSON()).toEqual(
                {
                    type: "sorter",
                    userInput: {values: sortedOrder, changed: true},
                },
            );
        });
    });

    describe("layout", () => {
        // A card advertises the direction it can be dragged through its
        // cursor, so the cursor is also a readout of how it was laid out.
        const DRAG_CURSOR = {
            horizontal: "ew-resize",
            vertical: "ns-resize",
        } as const;

        function getCardDragCursors(): string[] {
            return screen
                .getAllByRole("listitem")
                .map((card) => getComputedStyle(card).cursor);
        }

        function sorterQuestionWith(
            cardCount: number,
            layout: "horizontal" | "vertical",
        ) {
            return generateTestPerseusRenderer({
                content: "[[☃ sorter 1]]",
                widgets: {
                    "sorter 1": generateSorterWidget({
                        options: generateSorterOptions({
                            correct: Array.from(
                                {length: cardCount},
                                (_, i) => `Card ${i + 1}`,
                            ),
                            layout,
                        }),
                    }),
                },
            });
        }

        beforeEach(() => {
            jest.useRealTimers();
            // Sortable styles its cards with Aphrodite, and the shared test
            // setup suppresses Aphrodite's style injection (see
            // config/test/test-setup.ts). Turn it back on for this block so
            // that the cards' layout can be read off their computed styles.
            StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
            mockTexThatFinishesLoading();
        });

        afterEach(() => {
            StyleSheetTestUtils.suppressStyleInjection();
        });

        it("lays out the cards horizontally when the layout is horizontal", async () => {
            // Arrange, Act
            renderQuestion(
                sorterQuestionWith(
                    SORTER_MAX_HORIZONTAL_OPTIONS - 1,
                    "horizontal",
                ),
            );
            await wait();

            // Assert
            expect(getCardDragCursors()).toEqual(
                Array(SORTER_MAX_HORIZONTAL_OPTIONS - 1).fill(
                    DRAG_CURSOR.horizontal,
                ),
            );
        });

        it("lays out the cards vertically when the layout is vertical", async () => {
            // Arrange, Act
            renderQuestion(
                sorterQuestionWith(
                    SORTER_MAX_HORIZONTAL_OPTIONS - 1,
                    "vertical",
                ),
            );
            await wait();

            // Assert
            expect(getCardDragCursors()).toEqual(
                Array(SORTER_MAX_HORIZONTAL_OPTIONS - 1).fill(
                    DRAG_CURSOR.vertical,
                ),
            );
        });

        it("keeps a horizontal sorter horizontal at exactly the maximum number of cards", async () => {
            // Arrange, Act
            renderQuestion(
                sorterQuestionWith(SORTER_MAX_HORIZONTAL_OPTIONS, "horizontal"),
            );
            await wait();

            // Assert
            expect(getCardDragCursors()).toEqual(
                Array(SORTER_MAX_HORIZONTAL_OPTIONS).fill(
                    DRAG_CURSOR.horizontal,
                ),
            );
        });

        it("lays out a horizontal sorter vertically when it has more cards than the maximum", async () => {
            // Arrange, Act
            renderQuestion(
                sorterQuestionWith(
                    SORTER_MAX_HORIZONTAL_OPTIONS + 1,
                    "horizontal",
                ),
            );
            await wait();

            // Assert
            expect(getCardDragCursors()).toEqual(
                Array(SORTER_MAX_HORIZONTAL_OPTIONS + 1).fill(
                    DRAG_CURSOR.vertical,
                ),
            );
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
