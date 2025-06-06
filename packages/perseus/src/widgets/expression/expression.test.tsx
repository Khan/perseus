import {it, describe, beforeEach} from "@jest/globals";
import {
    splitPerseusItem,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import ExpressionWidgetExport from "./expression";
import {
    expressionItem2,
    expressionItem3,
    expressionItemWithAnswer,
    expressionItemWithLabels,
} from "./expression.testdata";

import type {
    PerseusItem,
    PerseusExpressionWidgetOptions,
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
    const userInput = renderer.getUserInputMap();
    const score = scorePerseusItemTesting(itemData.question, userInput);
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

// TODO: actually Assert that message is being set on the score object.
const assertInvalid = async (
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
    expect(score).toHaveInvalidInput();
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
            await assertInvalid(userEvent, expressionItem2, "+++");
        });

        it("should not grade a thing that is empty", async () => {
            await assertInvalid(userEvent, expressionItem2, "");
        });
    });

    describe("fallthrough", function () {
        it("should grade answers which don't match anything as wrong", async function () {
            await assertIncorrect(userEvent, expressionItem2, "500");
        });
    });

    describe("variables", function () {
        it.each(["123-X", "X-123"])(
            "should not grade answers that are correct except for the " +
                "variable case",
            async function (input) {
                await assertInvalid(userEvent, expressionItem2, input);
            },
        );

        // This isn't necessarily the ideal behavior; it's just what was the
        // easiest to implement
        it(
            "should not grade answers that have the wrong variable case, " +
                "even if the answer has got other errors",
            async function () {
                await assertInvalid(userEvent, expressionItem2, "123+X");
            },
        );

        it.each(["123-y", "123-Y"])(
            "should not not grade answers that use the wrong variable",
            async function (input) {
                await assertInvalid(userEvent, expressionItem2, input);
            },
        );
    });

    describe("multiple answers", function () {
        it.each(["x-123", "123-x"])(
            "should recognize either of two possibilities",
            async (input) => {
                await assertCorrect(userEvent, expressionItem2, input);
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
            await assertInvalid(userEvent, expressionItem3, "x+1");
        });

        it("should match from top to bottom (2)", async function () {
            await assertIncorrect(userEvent, expressionItem3, "y+1");
        });

        it("should match from top to bottom (3)", async function () {
            await assertCorrect(userEvent, expressionItem3, "z+1");
        });

        it.each([["X+1"], ["Y+1"], ["Z+1"]])(
            "should give casing or variable name error only relative to the " +
                "correct answer",
            async (input) => {
                await assertInvalid(userEvent, expressionItem3, input);
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
    });

    describe("focus state", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("supports directly focusing", () => {
            //  Arrange
            renderQuestion(expressionItem2.question);

            // Act
            const expressionInput = screen.getByRole("textbox");
            act(() => expressionInput.focus());

            // Assert
            expect(expressionInput).toHaveFocus();
        });

        it("supports directly blurring", () => {
            //  Arrange
            renderQuestion(expressionItem2.question);

            // Act
            const expressionInput = screen.getByRole("textbox");
            act(() => expressionInput.focus());
            act(() => expressionInput.blur());

            // Assert
            expect(expressionInput).not.toHaveFocus();
        });

        it("can be focused via a function", () => {
            // arrange
            const {renderer} = renderQuestion(expressionItem2.question);
            const expression = renderer.findWidgets("expression 1")[0];

            // act
            act(() => expression.focusInputPath());

            // Assert
            const expressionInput = screen.getByRole("textbox");
            expect(expressionInput).toHaveFocus();
        });
    });

    describe("rendering", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        it("supports mobile rendering", async () => {
            // arrange and act
            renderQuestion(expressionItem2.question, {
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

        it("sets input value directly", () => {
            // arrange
            const {renderer} = renderQuestion(expressionItem2.question);
            act(() => jest.runOnlyPendingTimers());

            // act
            act(() =>
                renderer.setInputValue(["expression 1"], "123-x", () => {}),
            );
            act(() => jest.runOnlyPendingTimers());

            const userInput = renderer.getUserInputMap();
            expect(userInput).toEqual({"expression 1": "123-x"});

            const score = scorePerseusItem(
                expressionItem2.question,
                userInput,
                "en",
            );

            // Assert
            expect(score.type).toBe("points");
            // Score.total doesn't exist if the input is invalid
            // In this case we know that it'll be valid so we can assert directly
            // @ts-expect-error - TS2339 - Property 'earned' does not exist on type 'PerseusScore'. | TS2339 - Property 'total' does not exist on type 'PerseusScore'.
            expect(score.earned).toBe(score.total);
        });

        it("has a developer facility for inserting", async () => {
            // arrange
            const {renderer} = renderQuestion(expressionItem2.question);
            act(() => jest.runOnlyPendingTimers());

            const expression = renderer.findWidgets("expression 1")[0];
            act(() => expression.insert("x+1"));
            act(() => jest.runOnlyPendingTimers());

            // act
            const score = scorePerseusItem(
                expressionItem2.question,
                renderer.getUserInputMap(),
                "en",
            );

            // Assert
            // Score.total doesn't exist if the input is invalid
            // In this case we know that it'll be valid so we can assert directly
            // @ts-expect-error - TS2339 - Property 'total' does not exist on type 'PerseusScore'.
            expect(score.total).toBe(1);
        });
    });

    describe("error tooltip", () => {
        beforeEach(() => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            jest.useFakeTimers();
        });

        it("shows error text in tooltip", async () => {
            // Arrange
            const {renderer} = renderQuestion(expressionItem2.question);

            // Act
            // Note(jeremy): You might think you could collapse all of these calls
            // inside a single act() block, but that didn't work. The only way this
            // test passes is with each statement in its own act() call. :/
            await userEvent.type(screen.getByRole("textbox"), "x&&&&&^1");
            act(() => jest.runOnlyPendingTimers());
            expect(renderer.getUserInputMap()).toEqual({
                "expression 1": "x\\&\\&\\&\\&\\&^{1}",
            });

            act(() => screen.getByRole("textbox").blur());
            act(() => jest.runOnlyPendingTimers());

            // Assert
            await waitFor(() =>
                expect(
                    screen.getByText("Oops! Sorry, I don't understand that!"),
                ).toBeVisible(),
            );
        });

        it("does not show error text when the sen() function is used (Portuguese for sin())", async () => {
            // Arrange
            const {renderer} = renderQuestion(expressionItem2.question);
            const expression = renderer.findWidgets("expression 1")[0];

            // Act
            act(() => expression.insert("sen(x)"));
            act(() => jest.runOnlyPendingTimers());
            act(() => screen.getByRole("textbox").blur());

            // Assert
            expect(screen.queryByText("Oops!")).toBeNull();
            expect(
                screen.queryByText("Sorry, I don't understand that!"),
            ).toBeNull();
        });
    });

    describe("transform", () => {
        it("can transform widget options into render props", () => {
            const widgetOptions: PerseusExpressionWidgetOptions = {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
                buttonsVisible: "never",
                visibleLabel: "Test visible label",
                ariaLabel: "Test aria label",
                extraKeys: ["i"],
            };

            const expected = {
                keypadConfiguration: {
                    keypadType: "EXPRESSION",
                    extraKeys: ["i"],
                    times: false,
                },
                times: false,
                functions: [],
                buttonSets: [],
                buttonsVisible: "never",
                visibleLabel: "Test visible label",
                ariaLabel: "Test aria label",
            };

            const result = ExpressionWidgetExport.transform(widgetOptions);

            expect(result).toEqual(expected);
        });

        it("should return expression keypad configuration by default", async () => {
            // Arrange
            // Act
            const result = ExpressionWidgetExport.transform({
                answerForms: [],
                buttonSets: [],
                times: false,
                functions: [],
            });

            // Assert
            expect(result.keypadConfiguration.keypadType).toEqual("EXPRESSION");
        });

        it("should forward extraKeys if present", async () => {
            // Arrange
            // Act
            const result = ExpressionWidgetExport.transform({
                buttonSets: [],
                times: false,
                functions: [],
                extraKeys: ["i"],
            });

            // Assert
            expect(result.keypadConfiguration.extraKeys).toEqual(["i"]);
        });

        it("should prioritize extraKeys over answerForms", async () => {
            // Arrange
            // Act
            const result = ExpressionWidgetExport.transform({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
                extraKeys: ["x"],
            });

            // Assert
            expect(result.keypadConfiguration.extraKeys).toEqual(["x"]);
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
                    "expression 1": {
                        type: "expression",
                        version: {major: 2, minor: 0},
                        options: {
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "1i",
                                },
                            ],
                            buttonSets: [],
                            times: false,
                            functions: [],
                            extraKeys: ["i"],
                        },
                    },
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
