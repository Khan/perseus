import {it, describe, beforeEach} from "@jest/globals";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";
import {
    expressionItem2,
    expressionItem3,
    expressionItem3Options,
    expressionItemWithAnswer,
} from "../__testdata__/expression.testdata";
import {Expression} from "../expression";

import {renderQuestion} from "./renderQuestion";

import type {PerseusItem} from "../../perseus-types";
import type {APIOptions} from "../../types";

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
    expect(renderer).toHaveBeenAnsweredCorrectly();

    expect(testDependenciesV2.analytics.onAnalyticsEvent).toHaveBeenCalledWith({
        type: "perseus:expression-evaluated",
        payload: {
            result: "correct",
            virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2",
        },
    });
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
    expect(renderer).toHaveBeenAnsweredIncorrectly();

    expect(testDependenciesV2.analytics.onAnalyticsEvent).toHaveBeenCalledWith({
        type: "perseus:expression-evaluated",
        payload: {
            result: "incorrect",
            virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2",
        },
    });
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
    if (input.length) {
        await userEvent.type(screen.getByRole("textbox"), input);
    }
    act(() => jest.runOnlyPendingTimers());
    expect(renderer).toHaveInvalidInput();
};

describe("Expression Widget", function () {
    let userEvent;
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

    describe("ungraded", function () {
        it("should handle ungraded answers with no error callback", function () {
            const err = Expression.validate(
                "x+1",
                expressionItem3Options,
                undefined,
                mockStrings,
                "en",
            );
            expect(err).toStrictEqual({message: "", type: "invalid"});
        });
    });

    describe("invalid", function () {
        it("should handle ungraded answers with no error callback", function () {
            const err = Expression.validate(
                "x+^1",
                expressionItem3Options,
                undefined,
                mockStrings,
                "en",
            );
            expect(err).toStrictEqual({message: null, type: "invalid"});
        });
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
    });

    describe("analytics", () => {
        const assertKeypadVersion = (
            apiOptions: APIOptions,
            virtualKeypadVersion: string,
        ) => {
            const {renderer} = renderQuestion(
                expressionItem2.question,
                apiOptions,
            );

            renderer.guessAndScore();

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:expression-evaluated",
                payload: {
                    // We're not interested in validating that the expression
                    // widget did anything useful or that the keypad worked. We
                    // just want to make sure the code that derives which
                    // keypad version it detected is correct.
                    result: "correct",
                    virtualKeypadVersion,
                },
            });
        };

        beforeEach(() => {
            jest.spyOn(Expression, "validate").mockReturnValue({
                type: "points",
                earned: 1,
                total: 1,
            });
        });

        it("should set the virtual keypad version to REACT_NATIVE_KEYPAD when nativeKeypadProxy is provided", () => {
            assertKeypadVersion(
                {nativeKeypadProxy: jest.fn()},
                "REACT_NATIVE_KEYPAD",
            );
        });

        it("should default the virtual keypad version to MATH_INPUT_KEYPAD_V2", () => {
            assertKeypadVersion(Object.freeze({}), "MATH_INPUT_KEYPAD_V2");
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
});

describe("getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should return undefined if rubric.value is null/undefined", () => {
        // Arrange
        const rubric = {
            answerForms: [],
            buttonSets: [],
            functions: [],
            times: true,
        } as const;

        // Act
        const result = Expression.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toBeUndefined();
    });

    it("returns a correct answer when there is one correct answer", () => {
        // Arrange
        const rubric = {
            answerForms: [
                {
                    value: "123",
                    form: true,
                    simplify: false,
                    considered: "correct",
                },
            ],
            buttonSets: [],
            functions: [],
            times: true,
        } as const;

        // Act
        const result = Expression.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toEqual("123");
    });

    it("returns the first correct answer when there are multiple correct answers", () => {
        // Arrange
        const rubric = {
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
            buttonSets: [],
            functions: [],
            times: true,
        } as const;

        // Act
        const result = Expression.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toEqual("123");
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
        act(() => renderer.setInputValue(["expression 1"], "123-x", () => {}));
        act(() => jest.runOnlyPendingTimers());
        const score = renderer.guessAndScore()[1];

        // Assert
        expect(score.type).toBe("points");
        // Score.total doesn't exist if the input is invalid
        // In this case we know that it'll be valid so we can assert directly
        // @ts-expect-error - TS2339 - Property 'earned' does not exist on type 'PerseusScore'. | TS2339 - Property 'total' does not exist on type 'PerseusScore'.
        expect(score.earned).toBe(score.total);
    });

    it("has a developer facility for inserting", () => {
        // arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        act(() => jest.runOnlyPendingTimers());

        act(() => {
            const expression = renderer.findWidgets("expression 1")[0];
            expression.insert("x+1");
            act(() => jest.runOnlyPendingTimers());
        });

        // act
        const score = renderer.score();

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
        const expression = renderer.findWidgets("expression 1")[0];

        // Act
        // Note(jeremy): You might think you could collapse all of these calls
        // inside a single act() block, but that didn't work. The only way this
        // test passes is with each statement in its own act() call. :/
        act(() => expression.insert("x&&&&&^1"));
        act(() => jest.runOnlyPendingTimers());
        act(() => screen.getByRole("textbox").blur());
        act(() => jest.runOnlyPendingTimers());
        renderer.guessAndScore();

        // Assert
        expect(screen.getByText("Oops!")).toBeVisible();
        expect(
            screen.getByText("Sorry, I don't understand that!"),
        ).toBeVisible();
    });

    it("does not show error text when the sen() function is used (Portuguese for sin())", async () => {
        // Arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        // Act
        act(() => expression.insert("sen(x)"));
        act(() => jest.runOnlyPendingTimers());
        act(() => screen.getByRole("textbox").blur());
        renderer.guessAndScore();

        // Assert
        expect(screen.queryByText("Oops!")).toBeNull();
        expect(
            screen.queryByText("Sorry, I don't understand that!"),
        ).toBeNull();
    });
});
