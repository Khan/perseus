import {it, describe, beforeEach} from "@jest/globals";
import {screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {PerseusItem} from "../../perseus-types";
import {
    expressionItem2,
    expressionItem3,
    expressionItem3Options,
} from "../__testdata__/expression.testdata";
import {Expression} from "../expression";

import {renderQuestion} from "./renderQuestion";

const assertComplete = (itemData: PerseusItem, input, isCorrect: boolean) => {
    const {renderer} = renderQuestion(itemData.question);
    userEvent.type(screen.getByRole("textbox"), input);
    const [_, score] = renderer.guessAndScore();

    expect(score).toMatchObject({
        type: "points",
        earned: isCorrect ? 1 : 0,
    });
};

const assertCorrect = (itemData: PerseusItem, input) => {
    assertComplete(itemData, input, true);

    expect(testDependencies.analytics.sendEvent).toHaveBeenCalledWith({
        type: "perseus:expression-evaluated",
        payload: {
            virtualKeypadVersion: "PERSEUS_MATH_INPUT",
            result: "correct",
        },
    });
};

const assertIncorrect = (itemData: PerseusItem, input: string) => {
    assertComplete(itemData, input, false);

    expect(testDependencies.analytics.sendEvent).toHaveBeenCalledWith({
        type: "perseus:expression-evaluated",
        payload: {
            virtualKeypadVersion: "PERSEUS_MATH_INPUT",
            result: "incorrect",
        },
    });
};

// TODO: actually Assert that message is being set on the score object.
const assertInvalid = (itemData: PerseusItem, input, message?: string) => {
    const {renderer} = renderQuestion(itemData.question);
    if (input.length) {
        userEvent.type(screen.getByRole("textbox"), input);
    }
    const [_, score] = renderer.guessAndScore();
    expect(score).toMatchObject({type: "invalid"});

    expect(testDependencies.analytics.sendEvent).toHaveBeenCalledWith({
        type: "perseus:expression-evaluated",
        payload: {
            virtualKeypadVersion: "PERSEUS_MATH_INPUT",
            result: "invalid",
        },
    });
};

describe("Expression Widget", function () {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("grading", function () {
        it("should not grade a thing that doesn't parse", async () => {
            assertInvalid(expressionItem2, "+++");
        });

        it("should not grade a thing that is empty", async () => {
            assertInvalid(expressionItem2, "");
        });
    });

    describe("fallthrough", function () {
        it("should grade answers which don't match anything as wrong", function () {
            assertIncorrect(expressionItem2, "500");
        });
    });

    describe("variables", function () {
        it.each(["123-X", "X-123"])(
            "should not grade answers that are correct except for the " +
                "variable case",
            function (input) {
                assertInvalid(expressionItem2, input);
            },
        );

        // This isn't necessarily the ideal behavior; it's just what was the
        // easiest to implement
        it(
            "should not grade answers that have the wrong variable case, " +
                "even if the answer has got other errors",
            function () {
                assertInvalid(expressionItem2, "123+X");
            },
        );

        it.each(["123-y", "123-Y"])(
            "should not not grade answers that use the wrong variable",
            function (input) {
                assertInvalid(expressionItem2, input);
            },
        );
    });

    describe("multiple answers", function () {
        it.each(["x-123", "123-x"])(
            "should recognize either of two possibilities",
            (input) => {
                assertCorrect(expressionItem2, input);
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

        it("should match from top to bottom", function () {
            assertInvalid(expressionItem3, "x+1");
        });

        it("should match from top to bottom (2)", function () {
            assertIncorrect(expressionItem3, "y+1");
        });

        it("should match from top to bottom (3)", function () {
            assertCorrect(expressionItem3, "z+1");
        });

        it.each([["X+1"], ["Y+1"], ["Z+1"]])(
            "should give casing or variable name error only relative to the " +
                "correct answer",
            (input) => {
                assertInvalid(expressionItem3, input);
            },
        );
    });

    describe("ungraded", function () {
        it("should handle ungraded answers with no error callback", function () {
            const err = Expression.validate("x+1", expressionItem3Options);
            expect(err).toStrictEqual({message: "", type: "invalid"});
        });
    });

    describe("invalid", function () {
        it("should handle ungraded answers with no error callback", function () {
            const err = Expression.validate("x+^1", expressionItem3Options);
            expect(err).toStrictEqual({message: null, type: "invalid"});
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
        expressionInput.focus();

        // Assert
        expect(expressionInput).toHaveFocus();
    });

    it("supports directly blurring", () => {
        //  Arrange
        renderQuestion(expressionItem2.question);

        // Act
        const expressionInput = screen.getByRole("textbox");
        expressionInput.focus();
        expressionInput.blur();

        // Assert
        expect(expressionInput).not.toHaveFocus();
    });

    it("can be focused via a function", () => {
        // arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        // act
        expression.focusInputPath();

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
    });

    it("sets input value directly", () => {
        // arrange
        const {renderer} = renderQuestion(expressionItem2.question);

        // act
        renderer.setInputValue(["expression 1"], "123-x", () => {});
        const score = renderer.guessAndScore()[1];

        // Assert
        expect(score.type).toBe("points");
        // Score.total doesn't exist if the input is invalid
        // In this case we know that it'll be valid so we can assert directly
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'earned' does not exist on type 'PerseusScore'. | TS2339 - Property 'total' does not exist on type 'PerseusScore'.
        expect(score.earned).toBe(score.total);
    });

    it("has a developer facility for inserting", () => {
        // arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];
        expression.insert("x+1");

        // act
        const score = renderer.score();

        // Assert
        // Score.total doesn't exist if the input is invalid
        // In this case we know that it'll be valid so we can assert directly
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'total' does not exist on type 'PerseusScore'.
        expect(score.total).toBe(1);
    });
});

describe("error tooltip", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("shows on error", () => {
        // Arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        // Act
        expression.insert("x&&&&&^1");
        renderer.guessAndScore();
        jest.runOnlyPendingTimers();

        // Assert
        const errorMessage = screen.getByText(
            "Sorry, I don't understand that!",
        );
        expect(errorMessage).not.toBeUndefined();
    });

    it("shows error text on mouse over", async () => {
        // Arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        // Act
        expression.insert("x&&&&&^1");
        renderer.guessAndScore();
        jest.runOnlyPendingTimers();

        const tooltip = await screen.findByTestId("test-error-icon");

        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseEnter(tooltip);

        // Assert
        expect(
            screen.getByText("Sorry, I don't understand that!"),
        ).toBeVisible();
    });
    it("hides error text on mouse leave", async () => {
        // Arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        expression.insert("x&&&&&^1");
        renderer.guessAndScore();
        jest.runOnlyPendingTimers();

        const tooltip = await screen.findByTestId("test-error-icon");

        // Act
        // NOTE(Nicole): The existing perseus code requires explicit events
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseEnter(tooltip);
        // NOTE(Nicole): The existing perseus code requires explicit events
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseLeave(tooltip);

        // Assert
        expect(
            screen.getByText("Sorry, I don't understand that!"),
        ).not.toBeVisible();
    });

    it("toggles error text on click", async () => {
        // Arrange
        const {renderer} = renderQuestion(expressionItem2.question);
        const expression = renderer.findWidgets("expression 1")[0];

        expression.insert("x&&&&&^1");
        renderer.guessAndScore();
        jest.runOnlyPendingTimers();

        const tooltip = await screen.findByTestId("test-error-icon");

        // Act & Assert
        // NOTE(Nicole): The existing perseus code requires explicit events
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.click(tooltip);
        expect(
            screen.getByText("Sorry, I don't understand that!"),
        ).toBeVisible();

        // Act & Assert
        // NOTE(Nicole): The existing perseus code requires explicit events
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.click(tooltip);
        expect(
            screen.getByText("Sorry, I don't understand that!"),
        ).not.toBeVisible();
    });
});
