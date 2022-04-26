// @flow

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import * as Perseus from "../../index.js";
import {
    question1AndAnswer,
    multipleAnswers,
    percentageProblem,
    multipleAnswersWithDecimals,
    question1,
    duplicatedAnswers,
    withCoefficient,
} from "../__testdata__/numeric-input_testdata.js";
import {
    maybeParsePercentInput,
    NumericInput,
    unionAnswerForms,
} from "../numeric-input.jsx";

import type {APIOptions} from "../../types.js";
import type {Rubric} from "../numeric-input.jsx";

const renderQuestion = (question, apiOptions: APIOptions) => {
    // Perseus.init() registers all of the widgets synchronously so
    // it's okay to ignore the promise it returns.
    Perseus.init({skipMathJax: true});

    let renderer = null;
    const {container} = render(
        <RenderStateRoot>
            <Perseus.Renderer
                ref={(node) => (renderer = node)}
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={apiOptions}
            />
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Not rendered`);
    }
    return {container, renderer};
};

const options: $ReadOnlyArray<APIOptions> = [
    {satStyling: true},
    {satStyling: false},
];

describe.each(options)(
    "numeric-input widget (options: %j)",
    (apiOptions: APIOptions) => {
        describe("question", () => {
            const [question, correct, incorrect] = question1AndAnswer;

            beforeEach(() => {
                jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                    testDependencies,
                );
            });

            it("Should accept the right answer", () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                // Act
                userEvent.paste(
                    screen.getByRole("textbox", {hidden: true}),
                    correct,
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
            });

            it("Should render predictably", () => {
                // Arrange
                const {container} = renderQuestion(question, apiOptions);
                expect(container).toMatchSnapshot("first render");

                // Act
                userEvent.paste(
                    screen.getByRole("textbox", {hidden: true}),
                    correct,
                );

                // Assert
                expect(container).toMatchSnapshot("after interaction");
            });

            it("should reject an incorrect answer", () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                // Act
                userEvent.paste(
                    screen.getByRole("textbox", {hidden: true}),
                    incorrect,
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredIncorrectly();
            });
        });
    },
);

describe("static function getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("can get one correct answer from a rubric with multiple answers", () => {
        const widget = multipleAnswersWithDecimals.widgets["numeric-input 1"];
        const widgetOptions = widget && widget.options;
        const answers: $ReadOnlyArray<any> =
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
        const answers: $ReadOnlyArray<any> =
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
        const answers = [];
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
        };

        const score = NumericInput.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            Object {
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
        };

        const score = NumericInput.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            Object {
              "message": "We could not understand your answer. Please check your answer for extra text or symbols.",
              "type": "invalid",
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
        };

        const score = NumericInput.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            Object {
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
        };

        const score = NumericInput.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            Object {
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
        };

        const score = NumericInput.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            Object {
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
        const {renderer} = renderQuestion(multipleAnswers, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "1");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple correct answers (Part two)", () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "2");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle duplicated answers", () => {
        // Arrange
        const {renderer} = renderQuestion(duplicatedAnswers, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "2.4");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can handle coefficients", () => {
        // Arrange
        const {renderer} = renderQuestion(withCoefficient, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "1.0");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are percentages", () => {
        // Arrange
        const {renderer} = renderQuestion(percentageProblem, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "33%");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are decimals", () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswersWithDecimals, {
            satStyling: false,
        });

        // Act
        userEvent.paste(screen.getByRole("textbox", {hidden: true}), "12.2");

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("supports being static", () => {
        // Arrange
        renderQuestion(multipleAnswersWithDecimals, {
            satStyling: false,
            staticRender: true,
        });

        // Assert
        const element = screen.queryByRole("textbox", {hidden: true});
        expect(element).toBeNull();
    });

    it("styles differently on mobile", () => {
        const {container} = renderQuestion(multipleAnswersWithDecimals, {
            satStyling: false,
            // I wish this was more clear but this is how mobile
            // rendering is triggered
            customKeypad: true,
        });

        expect(container).toMatchSnapshot("mobile render");
    });

    it("can be focused", () => {
        const {renderer} = renderQuestion(question1, {
            satStyling: true,
        });

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
            satStyling: true,
            interactionCallback: testCallback,
        });

        // Act
        renderer.focus();

        // Assert
        expect(testCallback).toHaveBeenCalled();
    });

    it("can be blurred", () => {
        const {renderer} = renderQuestion(question1, {
            satStyling: true,
        });

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
            {
                status: "correct",
                value: 1,
            },
            {
                status: "correct",
                value: 1,
            },
        ];

        // act
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
