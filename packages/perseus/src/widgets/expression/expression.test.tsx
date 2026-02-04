import {it, describe, beforeEach} from "@jest/globals";
import {
    splitPerseusItem,
    generateTestPerseusItem,
    generateExpressionWidget,
    generateExpressionAnswerForm,
    generateExpressionOptions,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import ExpressionWidgetExport from "./expression";
import {
    expressionItemMixedAnswerStates,
    expressionItemMultipleEquivalentAnswers,
    expressionItemWithAnswer,
    expressionItemWithLabels,
} from "./expression.testdata";

import type {
    PerseusItem,
    PerseusRenderer,
    PerseusExpressionRubric,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const renderAndAnswer = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    itemData: PerseusItem,
    input: string,
    isCorrect: boolean,
) => {
    jest.useFakeTimers();
    const {renderer} = renderQuestion(itemData.question);
    await userEvent.type(screen.getByRole("textbox"), input);
    act(() => jest.runOnlyPendingTimers());

    return renderer;
};

const assertCorrect = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    itemData: PerseusItem,
    input: string,
) => {
    const renderer = await renderAndAnswer(
        await userEvent,
        itemData,
        input,
        true,
    );
    const score = scorePerseusItemTesting(
        itemData.question,
        renderer.getUserInputMap(),
    );
    expect(score).toHaveBeenAnsweredCorrectly();
};

const assertIncorrect = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    itemData: PerseusItem,
    input: string,
) => {
    const renderer = await renderAndAnswer(
        await userEvent,
        itemData,
        input,
        false,
    );
    const score = scorePerseusItemTesting(
        itemData.question,
        renderer.getUserInputMap(),
    );
    expect(score).toHaveBeenAnsweredIncorrectly();
};

const assertInvalid = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    itemData: PerseusItem,
    input: string,
) => {
    jest.useFakeTimers();
    const {renderer} = renderQuestion(itemData.question);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (input.length) {
        await userEvent.type(screen.getByRole("textbox"), input);
    }
    act(() => jest.runOnlyPendingTimers());
    const score = scorePerseusItemTesting(
        itemData.question,
        renderer.getUserInputMap(),
    );
    expect(score).toHaveInvalidInput();
};

const assertValid = async (
    userEvent: ReturnType<(typeof userEventLib)["setup"]>,
    itemData: PerseusItem,
    input: string,
    message?: string,
) => {
    jest.useFakeTimers();
    const {renderer} = renderQuestion(itemData.question);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (input.length) {
        await userEvent.type(screen.getByRole("textbox"), input);
    }
    act(() => jest.runOnlyPendingTimers());
    const score = scorePerseusItemTesting(
        itemData.question,
        renderer.getUserInputMap(),
    );
    expect(score).not.toHaveInvalidInput();
};

describe("Expression Widget", function () {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(testDependenciesV2.analytics, "onAnalyticsEvent");
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
    });

    describe("grading", function () {
        it("should not grade a thing that doesn't parse", async () => {
            await assertInvalid(
                userEvent,
                expressionItemMultipleEquivalentAnswers,
                "+++",
            );
        });

        it("should not grade  ampersands that do not parse", async () => {
            await assertInvalid(
                userEvent,
                expressionItemMultipleEquivalentAnswers,
                "x&&&&&^1",
            );
        });

        it("should not grade a thing that is empty", async () => {
            await assertInvalid(
                userEvent,
                expressionItemMultipleEquivalentAnswers,
                "",
            );
        });

        it("should grade a portugese sen", async () => {
            await assertValid(
                userEvent,
                expressionItemMultipleEquivalentAnswers,
                "sen(x)",
            );
        });
    });

    describe("fallthrough", function () {
        it("should grade answers which don't match anything as wrong", async function () {
            await assertIncorrect(
                userEvent,
                expressionItemMultipleEquivalentAnswers,
                "500",
            );
        });
    });

    describe("variables", function () {
        it.each(["123-X", "X-123"])(
            "should not grade answers that are correct except for the " +
                "variable case",
            async function (input) {
                await assertInvalid(
                    userEvent,
                    expressionItemMultipleEquivalentAnswers,
                    input,
                );
            },
        );

        // This isn't necessarily the ideal behavior; it's just what was the
        // easiest to implement
        it(
            "should not grade answers that have the wrong variable case, " +
                "even if the answer has got other errors",
            async function () {
                await assertInvalid(
                    userEvent,
                    expressionItemMultipleEquivalentAnswers,
                    "123+X",
                );
            },
        );

        it.each(["123-y", "123-Y"])(
            "should not not grade answers that use the wrong variable",
            async function (input) {
                await assertInvalid(
                    userEvent,
                    expressionItemMultipleEquivalentAnswers,
                    input,
                );
            },
        );
    });

    describe("multiple answers", function () {
        it.each(["x-123", "123-x"])(
            "should recognize either of two possibilities",
            async (input) => {
                await assertCorrect(
                    userEvent,
                    expressionItemMultipleEquivalentAnswers,
                    input,
                );
            },
        );

        /* For the tests below, here are the three answer forms:
         *
         *     considered: "ungraded"
         *     value: x+1
         *
         *     considered: "incorrect"
         *     value: y+1
         *
         *     considered: "correct"
         *     value: z+1
         */

        it("should match from top to bottom", async function () {
            await assertInvalid(
                userEvent,
                expressionItemMixedAnswerStates,
                "x+1",
            );
        });

        it("should match from top to bottom (2)", async function () {
            await assertIncorrect(
                userEvent,
                expressionItemMixedAnswerStates,
                "y+1",
            );
        });

        it("should match from top to bottom (3)", async function () {
            await assertCorrect(
                userEvent,
                expressionItemMixedAnswerStates,
                "z+1",
            );
        });

        it.each([["X+1"], ["Y+1"], ["Z+1"]])(
            "should give casing or variable name error only relative to the " +
                "correct answer",
            async (input) => {
                await assertInvalid(
                    userEvent,
                    expressionItemMixedAnswerStates,
                    input,
                );
            },
        );
    });

    describe("when the question uses the sin function", () => {
        it("allows parens", async () => {
            const item = expressionItemWithAnswer("sin(x)");
            await assertCorrect(userEvent, item, "sin(x)");
        });

        it("allows no parens", async () => {
            const item = expressionItemWithAnswer("sin(x)");
            await assertCorrect(userEvent, item, "sin x");
        });

        it("grades a wrong answer as incorrect", async () => {
            const item = expressionItemWithAnswer("sin(x)");
            await assertIncorrect(userEvent, item, "2");
        });

        it("allows portugese sen", async () => {
            const item = expressionItemWithAnswer("sin(42)");
            await assertCorrect(userEvent, item, "sen(42)");
        });

        it("allows portugese tg", async () => {
            const item = expressionItemWithAnswer("tan(42)");
            await assertCorrect(userEvent, item, "tg(42)");
        });
    });

    describe("international trig operators", () => {
        it("treats sen as equivalent to sin", async () => {
            const item = expressionItemWithAnswer("sin(x)");
            await assertCorrect(userEvent, item, "sen x");
        });

        it("works when multiple operators are present", async () => {
            const item = expressionItemWithAnswer("sin(sin(x))");
            await assertCorrect(userEvent, item, "sen(sen(x))");
        });

        it("treats arctg as equivalent to arctan", async () => {
            const item = expressionItemWithAnswer("arctan(x)");
            await assertCorrect(userEvent, item, "arctg x");
        });

        it("treats cosec as equivalent to csc", async () => {
            const item = expressionItemWithAnswer("csc(x)");
            await assertCorrect(userEvent, item, "cosec x");
        });

        it("treats cossec as equivalent to csc", async () => {
            const item = expressionItemWithAnswer("csc(x)");
            await assertCorrect(userEvent, item, "cossec x");
        });

        it("treats cotg as equivalent to cot", async () => {
            const item = expressionItemWithAnswer("cot(x)");
            await assertCorrect(userEvent, item, "cotg x");
        });

        it("treats ctg as equivalent to cot", async () => {
            const item = expressionItemWithAnswer("cot(x)");
            await assertCorrect(userEvent, item, "ctg x");
        });

        it("treats tg as equivalent to tan", async () => {
            const item = expressionItemWithAnswer("tan(x)");
            await assertCorrect(userEvent, item, "tg x");
        });
    });

    describe("getOneCorrectAnswerFromRubric", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("should return undefined if rubric.value is null/undefined", () => {
            // Arrange
            const rubric: PerseusExpressionRubric = {
                answerForms: [],
                functions: [],
            };

            // Act
            const result =
                ExpressionWidgetExport.getOneCorrectAnswerFromRubric?.(rubric);

            // Assert
            expect(result).toBeUndefined();
        });

        it("returns a correct answer when there is one correct answer", () => {
            // Arrange
            const rubric: PerseusExpressionRubric = {
                answerForms: [
                    {
                        value: "123",
                        form: true,
                        simplify: false,
                        considered: "correct",
                    },
                ],
                functions: [],
            };

            // Act
            const result =
                ExpressionWidgetExport.getOneCorrectAnswerFromRubric?.(rubric);

            // Assert
            expect(result).toEqual("123");
        });

        it("returns the first correct answer when there are multiple correct answers", () => {
            // Arrange
            const rubric: PerseusExpressionRubric = {
                answerForms: [
                    {
                        value: "123",
                        form: true,
                        simplify: false,
                        considered: "correct",
                    },
                    {
                        value: "456",
                        form: true,
                        simplify: false,
                        considered: "correct",
                    },
                ],
                functions: [],
            };

            // Act
            const result =
                ExpressionWidgetExport.getOneCorrectAnswerFromRubric?.(rubric);

            // Assert
            expect(result).toEqual("123");
        });
    });

    describe("labels", () => {
        it("renders visible label", async () => {
            // Arrange, Act
            renderQuestion(expressionItemWithLabels.question);

            // Assert
            const label = await screen.findByText("Test visible label");
            expect(label).toBeVisible();
        });

        it("renders aria label", async () => {
            // Arrange, Act
            renderQuestion(expressionItemWithLabels.question);

            // Assert
            const input = await screen.findByLabelText("Test aria label:");
            expect(input).toBeVisible();
        });

        it("input can be focused by visible label", async () => {
            // Arrange
            renderQuestion(expressionItemWithLabels.question);

            // Act
            const label = await screen.findByText("Test visible label");
            const input = await screen.findByLabelText("Test aria label:");
            await userEvent.click(label);

            // Assert
            expect(input).toHaveFocus();
        });

        it("provides a default ARIA label for accessibility when none is specified", () => {
            // Arrange, Act
            renderQuestion(expressionItemMultipleEquivalentAnswers.question);

            // Assert
            const input = screen.getByRole("textbox");
            expect(input).toBeVisible();
            expect(input).toHaveAccessibleName(/Math input box/);
        });
    });

    describe("focus state", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("supports directly focusing", () => {
            //  Arrange
            renderQuestion(expressionItemMultipleEquivalentAnswers.question);

            // Act
            const expressionInput = screen.getByRole("textbox");
            act(() => expressionInput.focus());

            // Assert
            expect(expressionInput).toHaveFocus();
        });

        it("supports directly blurring", () => {
            //  Arrange
            renderQuestion(expressionItemMultipleEquivalentAnswers.question);

            // Act
            const expressionInput = screen.getByRole("textbox");
            act(() => expressionInput.focus());
            act(() => expressionInput.blur());

            // Assert
            expect(expressionInput).not.toHaveFocus();
        });

        it("can be focused via a function", () => {
            // arrange
            const {renderer} = renderQuestion(
                expressionItemMultipleEquivalentAnswers.question,
            );
            const expression = renderer.findWidgets("expression 1")[0];

            // act
            act(() => expression.focusInputPath());

            // Assert
            const expressionInput = screen.getByRole("textbox");
            expect(expressionInput).toHaveFocus();
        });

        it("returns true from focus() and succeeds even if called before the DOM ID is assigned", () => {
            // Arrange
            const {renderer} = renderQuestion(
                expressionItemMultipleEquivalentAnswers.question,
            );
            const expression = renderer.findWidgets("expression 1")[0];
            const expressionInput = screen.getByRole("textbox");
            expressionInput.removeAttribute("id");

            // Act
            const focused = expression.focus();

            // Assert
            expect(focused).toBe(true);
            expect(expressionInput).toHaveFocus();
        });

        it("prevents focus callback errors after the component is unmounted", () => {
            const {renderer, unmount} = renderQuestion(
                expressionItemMultipleEquivalentAnswers.question,
                {
                    customKeypad: true,
                },
            );
            const expression = renderer.findWidgets("expression 1")[0];
            unmount();

            // Should not throw or cause errors
            expect(() => {
                expression.focus();
            }).not.toThrow();
        });
    });

    describe("rendering", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("should send analytics event when widget is rendered", () => {
            // Arrange
            const onAnalyticsEventSpy = jest.spyOn(
                testDependenciesV2.analytics,
                "onAnalyticsEvent",
            );

            // Act
            renderQuestion(expressionItemMultipleEquivalentAnswers.question);
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "expression",
                    widgetId: "expression 1",
                },
            });
        });

        it("supports mobile rendering", async () => {
            // arrange and act
            renderQuestion(expressionItemMultipleEquivalentAnswers.question, {
                // Setting this triggers mobile rendering
                // it would be nice if this was more clear in the code
                customKeypad: true,
            });

            // Assert
            const mobileInput = await screen.findByRole("textbox");
            expect(mobileInput).toBeVisible();
        });
    });

    describe("interaction", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            jest.useFakeTimers();
        });

        it("has a developer facility for inserting", async () => {
            // arrange
            const {renderer} = renderQuestion(
                expressionItemMultipleEquivalentAnswers.question,
            );
            act(() => jest.runOnlyPendingTimers());

            const expression = renderer.findWidgets("expression 1")[0];
            act(() => expression.insert("x+1"));
            act(() => jest.runOnlyPendingTimers());

            // act
            const score = scorePerseusItem(
                expressionItemMultipleEquivalentAnswers.question,
                renderer.getUserInputMap(),
                "en",
            );

            // Assert
            // Score.total doesn't exist if the input is invalid
            // In this case we know that it'll be valid so we can assert directly
            expect(score.type).toBe("points");
            if (score.type === "points") {
                expect(score.total).toBe(1);
            }
        });

        it("programmatically inserts content immediately after mount without prior focus", () => {
            // arrange
            const {renderer} = renderQuestion(
                expressionItemMultipleEquivalentAnswers.question,
            );
            const expression = renderer.findWidgets("expression 1")[0];

            // act
            expect(() =>
                act(() => {
                    expression.insert("x+1");
                }),
            ).not.toThrow();
            act(() => jest.runOnlyPendingTimers());

            // Assert
            const score = scorePerseusItem(
                expressionItemMultipleEquivalentAnswers.question,
                renderer.getUserInputMap(),
                "en",
            );
            expect(score.type).toBe("points");
            if (score.type === "points") {
                expect(score.total).toBe(1);
            }
        });
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
        });

        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });

            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );

            // Mocked for loading graphie in svg-image
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    text: () => "",
                    ok: true,
                }),
            ) as jest.Mock;
        });

        function getFullItem(): PerseusItem {
            const question: PerseusRenderer = {
                content: "[[☃ expression 1]]",
                images: {},
                widgets: {
                    "expression 1": generateExpressionWidget({
                        version: {major: 2, minor: 0},
                        options: generateExpressionOptions({
                            answerForms: [
                                generateExpressionAnswerForm({
                                    considered: "correct",
                                    form: true,
                                    value: "1i",
                                }),
                            ],
                            buttonSets: [],
                            functions: [],
                            extraKeys: ["i"],
                        }),
                    }),
                },
            };

            return generateTestPerseusItem({question});
        }

        function getSplitItem(): PerseusItem {
            return splitPerseusItem(getFullItem());
        }

        it.each([
            {optionsMode: "answerful", renderItem: getFullItem()},
            {optionsMode: "answerless", renderItem: getSplitItem()},
        ])(
            "is interactive with widget options: $optionsMode",
            async ({renderItem}) => {
                // Act
                const {renderer} = renderQuestion(renderItem.question);

                await userEvent.click(
                    screen.getByRole("button", {name: "open math keypad"}),
                );
                await userEvent.click(screen.getByRole("button", {name: "1"}));
                await userEvent.click(
                    screen.getByRole("tab", {name: "Extras"}),
                );
                await userEvent.click(screen.getByRole("button", {name: "i"}));
                act(() => jest.runOnlyPendingTimers());

                const userInput = renderer.getUserInputMap();
                const score = scorePerseusItem(
                    getFullItem().question,
                    userInput,
                    "en",
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            },
        );
    });
});
