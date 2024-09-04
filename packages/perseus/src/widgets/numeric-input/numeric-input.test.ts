import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    maybeParsePercentInput,
    NumericInput,
    unionAnswerForms,
} from "./numeric-input";
import {
    question1AndAnswer,
    multipleAnswers,
    percentageProblem,
    multipleAnswersWithDecimals,
    question1,
    duplicatedAnswers,
    withCoefficient,
} from "./numeric-input.testdata";

import type {Rubric} from "./numeric-input";
import type {UserEvent} from "@testing-library/user-event";

describe("numeric-input widget", () => {
    const [question, correct, incorrect] = question1AndAnswer;

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should accept the right answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            correct,
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("Should render predictably", async () => {
        // Arrange
        const {container} = renderQuestion(question);
        expect(container).toMatchSnapshot("first render");

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            correct,
        );

        // Assert
        expect(container).toMatchSnapshot("after interaction");
    });

    it("should reject an incorrect answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            incorrect,
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});

describe("static function getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("can get one correct answer from a rubric with multiple answers", () => {
        const widget = multipleAnswersWithDecimals.widgets["numeric-input 1"];
        const widgetOptions = widget && widget.options;
        const answers: ReadonlyArray<any> =
            (widgetOptions && widgetOptions.answers) || [];

        const singleAnswer = NumericInput.getOneCorrectAnswerFromRubric({
            answers,
            labelText: "",
            size: "medium",
            static: false,
            coefficient: false,
        });
        expect(singleAnswer).toBe("12.2");
    });

    it("can get one correct answer from a rubric with one answer", () => {
        const widget = question1.widgets["numeric-input 1"];
        const widgetOptions = widget && widget.options;
        const answers: ReadonlyArray<any> =
            (widgetOptions && widgetOptions.answers) || [];
        const singleAnswer = NumericInput.getOneCorrectAnswerFromRubric({
            answers,
            labelText: "",
            size: "medium",
            static: false,
            coefficient: false,
        });
        expect(singleAnswer).toBe("1252");
    });

    it("can not get a correct answer from a rubric with no answer", () => {
        const answers: Array<never> = [];
        const singleAnswer = NumericInput.getOneCorrectAnswerFromRubric({
            answers,
            labelText: "",
            size: "medium",
            static: false,
            coefficient: false,
        });
        expect(singleAnswer).toBeUndefined();
    });

    it("supports error bars", () => {
        const rubric: Rubric = {
            answers: [
                {
                    status: "correct",
                    value: 1.0,
                    maxError: 0.2,
                    answerForms: ["decimal"],
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };
        const singleAnswer = NumericInput.getOneCorrectAnswerFromRubric(rubric);
        expect(singleAnswer).toBe("1 ± 0.2");
    });
});

describe("static function validate", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("with a simple value", () => {
        const rubric: Rubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1",
        } as const;

        const score = NumericInput.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with nonsense", () => {
        const rubric: Rubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: false,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "sadasdfas",
        } as const;

        const score = NumericInput.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "message": "We could not understand your answer. Please check your answer for extra text or symbols.",
              "type": "invalid",
            }
        `);
    });

    // Don't default to validating the answer as a pi answer
    // if answerForm isn't set on the answer.
    // The answer value, userInput.currentValue, and
    // the omission of answerForms in the answer are
    // important to the test.
    // https://khanacademy.atlassian.net/browse/LC-691
    it("doesn't default to validating pi", () => {
        const rubric: Rubric = {
            answers: [
                {
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: true,
                    value: 45.289,
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: false,
        };

        const userInput = {
            // (pi / 12) * 173 = 45.291
            // within the 0.01 margin of error
            // to trigger the pi validation flow
            currentValue: "45.282",
        } as const;

        const score = NumericInput.validate(userInput, rubric, mockStrings);

        expect(score.message).not.toBe(
            "Your answer is close, but you may " +
                "have approximated pi. Enter your " +
                "answer as a multiple of pi, like " +
                "<code>12\\ \\text{pi}</code> or " +
                "<code>2/3\\ \\text{pi}</code>",
        );
        expect(score.message?.includes("pi")).toBeFalsy();
    });

    it("still validates against pi if provided in answerForms", () => {
        const rubric: Rubric = {
            answers: [
                {
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    strict: false,
                    value: 311.01767270538954,
                    answerForms: ["pi"],
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: false,
        };

        const userInput = {
            currentValue: "99 pi",
        } as const;

        const score = NumericInput.validate(userInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
        {
          "earned": 1,
          "message": null,
          "total": 1,
          "type": "points",
        }
    `);
    });

    it("with a strict answer", () => {
        const rubric: Rubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.0",
        } as const;

        const score = NumericInput.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with a strict answer and max error is outside range", () => {
        const rubric: Rubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.3",
        } as const;

        const score = NumericInput.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 0,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("with a strict answer and max error is inside range", () => {
        const rubric: Rubric = {
            answers: [
                {
                    value: 1,
                    status: "correct",
                    maxError: 0.2,
                    simplify: "",
                    strict: true,
                    message: "",
                },
            ],
            labelText: "",
            size: "normal",
            static: false,
            coefficient: true,
        };

        const useInput = {
            currentValue: "1.12",
        } as const;

        const score = NumericInput.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });
});

describe("Numeric input widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("can handle multiple correct answers (Part one)", async () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers);

        // Act
        await userEvent.type(screen.getByRole("textbox", {hidden: true}), "1");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple correct answers (Part two)", async () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers);

        // Act
        await userEvent.type(screen.getByRole("textbox", {hidden: true}), "2");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle duplicated answers", async () => {
        // Arrange
        const {renderer} = renderQuestion(duplicatedAnswers);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "2.4",
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle coefficients", async () => {
        // Arrange
        const {renderer} = renderQuestion(withCoefficient);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "1.0",
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are percentages", async () => {
        // Arrange
        const {renderer} = renderQuestion(percentageProblem);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "33%",
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are decimals", async () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswersWithDecimals);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "12.2",
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("styles differently on mobile", () => {
        const {container} = renderQuestion(multipleAnswersWithDecimals, {
            // I wish this was more clear but this is how mobile
            // rendering is triggered
            customKeypad: true,
        });

        expect(container).toMatchSnapshot("mobile render");
    });

    it("can be focused", async () => {
        const {renderer} = renderQuestion(question1);

        // Act
        const gotFocus = await act(() => renderer.focus());

        // Assert
        expect(gotFocus).toBe(true);
        expect(screen.getByRole("textbox", {hidden: true})).toHaveFocus();
    });

    it("can be blurred", () => {
        const {renderer} = renderQuestion(question1);

        // Act
        const input = screen.getByRole("textbox", {hidden: true});
        act(() => input.focus());
        act(() => renderer.blur());

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).not.toBe(
            screen.getByRole("textbox", {hidden: true}),
        );
    });
});

describe("unionAnswerForms utility function", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("removes duplicates", () => {
        // arrange
        const forms = [
            [
                {
                    simplify: "required" as const,
                    name: "integer",
                } as const,
            ],
            [
                {
                    simplify: "required" as const,
                    name: "integer",
                } as const,
            ],
        ];

        // act
        const result = unionAnswerForms(forms);

        // assert
        expect(result).toHaveLength(1);
    });
});

describe("maybeParsePercentInput utility function", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("returns a percent if the input is a percent", () => {
        const result = maybeParsePercentInput("3%", false);

        expect(result).toBe(3);
    });

    it("returns the input if its not valid", () => {
        const result = maybeParsePercentInput("asdasd%", false);

        expect(result).toBe("asdasd%");
    });

    it("normalizes values", () => {
        const result = maybeParsePercentInput("20%", true);

        expect(result).toBe(0.2);
    });
});
