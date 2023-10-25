import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {errors} from "../../util/answer-types";
import {
    question1AndAnswer,
    multipleAnswers,
    percentageProblem,
    multipleAnswersWithDecimals,
    question1,
    duplicatedAnswers,
    withCoefficient,
} from "../__testdata__/numeric-input.testdata";
import {
    maybeParsePercentInput,
    NumericInput,
    unionAnswerForms,
} from "../numeric-input";

import {renderQuestion} from "./renderQuestion";

import type {Rubric} from "../numeric-input";

describe("numeric-input widget", () => {
    const [question, correct, incorrect] = question1AndAnswer;

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should accept the right answer", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), correct);

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("Should render predictably", () => {
        // Arrange
        const {container} = renderQuestion(question);
        expect(container).toMatchSnapshot("first render");

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), correct);

        // Assert
        expect(container).toMatchSnapshot("after interaction");
    });

    it("should reject an incorrect answer", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), incorrect);

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

        const score = NumericInput.validate(useInput, rubric);

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

        const score = NumericInput.validate(useInput, rubric);

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

        const score = NumericInput.validate(userInput, rubric);

        expect(score.message).not.toBe(errors.APPROXIMATED_PI_ERROR);
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

        const score = NumericInput.validate(userInput, rubric);

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

        const score = NumericInput.validate(useInput, rubric);

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

        const score = NumericInput.validate(useInput, rubric);

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

        const score = NumericInput.validate(useInput, rubric);

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
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("can handle multiple correct answers (Part one)", () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "1");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple correct answers (Part two)", () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "2");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle duplicated answers", () => {
        // Arrange
        const {renderer} = renderQuestion(duplicatedAnswers);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "2.4");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle coefficients", () => {
        // Arrange
        const {renderer} = renderQuestion(withCoefficient);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "1.0");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are percentages", () => {
        // Arrange
        const {renderer} = renderQuestion(percentageProblem);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "33%");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are decimals", () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswersWithDecimals);

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "12.2");

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

    it("can be focused", () => {
        const {renderer} = renderQuestion(question1);

        // Act
        const gotFocus = renderer.focus();

        // Assert
        expect(gotFocus).toBeTrue();
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.activeElement).toBe(
            screen.getByRole("textbox", {hidden: true}),
        );
    });

    it("calls the interaction callback on focus", () => {
        const testCallback = jest.fn();

        const {renderer} = renderQuestion(question1, {
            interactionCallback: testCallback,
        });

        // Act
        renderer.focus();

        // Assert
        expect(testCallback).toHaveBeenCalled();
    });

    it("can be blurred", () => {
        const {renderer} = renderQuestion(question1);

        // Act
        const input = screen.getByRole("textbox", {hidden: true});
        input.focus();
        renderer.blur();

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
                    simplify: "required",
                    name: "integer",
                },
            ],
            [
                {
                    simplify: "required",
                    name: "integer",
                },
            ],
        ];

        // act
        // @ts-expect-error - TS2345 - Argument of type '{ simplify: string; name: string; }[][]' is not assignable to parameter of type 'readonly (readonly PerseusNumericInputAnswerForm[])[]'.
        const result = unionAnswerForms(forms);

        // assert
        expect(result).toBeArrayOfSize(1);
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
