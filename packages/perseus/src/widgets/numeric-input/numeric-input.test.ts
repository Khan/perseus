import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import NumericInputWidgetExport, {
    findCommonFractions,
    findPrecision,
} from "./numeric-input.class";
import {
    correctAndWrongAnswers,
    duplicatedAnswers,
    multipleAnswers,
    multipleAnswersWithDecimals,
    percentageProblem,
    question1,
    question1AndAnswer,
    withCoefficient,
} from "./numeric-input.testdata";

import type {
    PerseusItem,
    PerseusNumericInputRubric,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
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
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("should reject an incorrect answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            incorrect,
        );
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
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

    it("should send analytics event when widget is rendered", async () => {
        // Arrange
        const onAnalyticsEventSpy = jest.spyOn(
            testDependenciesV2.analytics,
            "onAnalyticsEvent",
        );

        // Act
        renderQuestion(question);
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "numeric-input",
                widgetId: "numeric-input 1",
            },
        });
    });

    it("Should render tooltip when format option is given", async () => {
        // Arrange
        const questionWithFormatOptions = JSON.parse(JSON.stringify(question1));
        questionWithFormatOptions.widgets[
            "numeric-input 1"
        ].options.answers[0].answerForms = ["proper"];

        // Act
        const {container} = renderQuestion(questionWithFormatOptions);

        // Assert
        expect(container).toMatchSnapshot("render with format tooltip");
    });

    it("Should render a visible tooltip when format options are given", async () => {
        // Arrange
        const item = generateTestPerseusRenderer({
            content: "[[☃ numeric-input 1]] ",
            widgets: {
                "numeric-input 1": generateNumericInputWidget({
                    options: generateNumericInputOptions({
                        answers: [
                            generateNumericInputAnswer({
                                value: 1252,
                                answerForms: ["proper", "improper", "mixed"],
                            }),
                        ],
                    }),
                }),
            },
        });

        // Act
        renderQuestion(item);
        await userEvent.tab();
        expect(screen.getByRole("textbox")).toHaveFocus();

        // Assert
        expect(
            screen.getByText(/a simplified proper fraction, like 3\/5, or/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/a simplified improper fraction, like 7\/4, or/),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/a mixed number, like 1 and 3\/4/),
        ).toBeInTheDocument();
    });

    it("Should render tooltip as list when multiple format options are given", async () => {
        // Arrange
        const questionWithFormatOptions = JSON.parse(JSON.stringify(question1));
        questionWithFormatOptions.widgets[
            "numeric-input 1"
        ].options.answers[0].answerForms = ["proper", "improper", "mixed"];

        // Act
        const {container} = renderQuestion(questionWithFormatOptions);

        // Assert
        expect(container).toMatchSnapshot("render with format list tooltip");
    });

    it("Should render tooltip using only correct answer formats", async () => {
        // Arrange
        const {container} = renderQuestion(correctAndWrongAnswers);

        // Assert
        expect(container).toMatchSnapshot(
            "render tooltip only with correct answers",
        );
    });

    it("Should render an element with format options as text for use by assistive technologies", async () => {
        // Arrange - Fractions
        const questionWithFormatOptions = JSON.parse(JSON.stringify(question1));
        questionWithFormatOptions.widgets[
            "numeric-input 1"
        ].options.answers[0].answerForms = ["proper", "improper", "mixed"];

        // Act
        const fractionsContainer = renderQuestion(
            questionWithFormatOptions,
        ).container;

        const fractionTextContainer =
            // eslint-disable-next-line testing-library/no-node-access
            fractionsContainer.querySelector("[id*='aria-for-']");

        // Assert
        expect(fractionTextContainer).toHaveTextContent(
            "a simplified proper fraction",
        );
        expect(fractionTextContainer).toHaveTextContent(
            "a simplified improper fraction",
        );
        expect(fractionTextContainer).toHaveTextContent("a mixed number");

        // Arrange - Non-Fractions
        questionWithFormatOptions.widgets[
            "numeric-input 1"
        ].options.answers[0].answerForms = ["integer", "decimal", "pi"];

        // Act
        const othersContainer = renderQuestion(
            questionWithFormatOptions,
        ).container;

        const othersTextContainer =
            // eslint-disable-next-line testing-library/no-node-access
            othersContainer.querySelector("[id*='aria-for-']");

        // Assert
        expect(othersTextContainer).toHaveTextContent("an integer");
        expect(othersTextContainer).toHaveTextContent("an exact decimal");
        expect(othersTextContainer).toHaveTextContent("a multiple of pi");
    });
});

describe("static function getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("can get one correct answer from scoring data with multiple answers", () => {
        const widget = multipleAnswersWithDecimals.widgets["numeric-input 1"];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widgetOptions = widget && widget.options;
        const answers =
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (widgetOptions && widgetOptions.answers) || [];

        const singleAnswer =
            NumericInputWidgetExport.getOneCorrectAnswerFromRubric?.({
                answers,
                coefficient: false,
            });
        expect(singleAnswer).toBe("12.2");
    });

    it("can get one correct answer from scoring data with one answer", () => {
        const widget = question1.widgets["numeric-input 1"];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const widgetOptions = widget && widget.options;
        const answers =
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (widgetOptions && widgetOptions.answers) || [];
        const singleAnswer =
            NumericInputWidgetExport.getOneCorrectAnswerFromRubric?.({
                answers,
                coefficient: false,
            });
        expect(singleAnswer).toBe("1252");
    });

    it("can not get a correct answer from scoring data with no answer", () => {
        const answers: Array<never> = [];
        const singleAnswer =
            NumericInputWidgetExport.getOneCorrectAnswerFromRubric?.({
                answers,
                coefficient: false,
            });
        expect(singleAnswer).toBeUndefined();
    });

    it("supports error bars", () => {
        const rubric: PerseusNumericInputRubric = {
            answers: [
                {
                    status: "correct",
                    value: 1.0,
                    maxError: 0.2,
                    answerForms: ["decimal"],
                    simplify: "optional",
                    strict: false,
                    message: "",
                },
            ],
            coefficient: true,
        };
        const singleAnswer =
            NumericInputWidgetExport.getOneCorrectAnswerFromRubric?.(rubric);
        expect(singleAnswer).toBe("1 ± 0.2");
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
        const score = scorePerseusItemTesting(
            multipleAnswers,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle multiple correct answers (Part two)", async () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswers);

        // Act
        await userEvent.type(screen.getByRole("textbox", {hidden: true}), "2");
        const score = scorePerseusItemTesting(
            multipleAnswers,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle duplicated answers", async () => {
        // Arrange
        const {renderer} = renderQuestion(duplicatedAnswers);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "2.4",
        );
        const score = scorePerseusItemTesting(
            duplicatedAnswers,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can handle coefficients", async () => {
        // Arrange
        const {renderer} = renderQuestion(withCoefficient);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "1.0",
        );
        const score = scorePerseusItemTesting(
            withCoefficient,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are percentages", async () => {
        // Arrange
        const {renderer} = renderQuestion(percentageProblem);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "33%",
        );
        const score = scorePerseusItemTesting(
            percentageProblem,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("handles answers that are decimals", async () => {
        // Arrange
        const {renderer} = renderQuestion(multipleAnswersWithDecimals);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "12.2",
        );
        const score = scorePerseusItemTesting(
            multipleAnswersWithDecimals,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
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
    });

    function getAnswerfulItem(): PerseusItem {
        const question: PerseusRenderer = {
            content: "[[☃ numeric-input 1]] ",
            images: {},
            widgets: {
                "numeric-input 1": generateNumericInputWidget({
                    options: generateNumericInputOptions({
                        answers: [
                            generateNumericInputAnswer({
                                value: 42,
                                answerForms: ["proper", "improper", "mixed"],
                            }),
                        ],
                    }),
                }),
            },
        };

        return generateTestPerseusItem({question});
    }

    function getAnswerlessItem(): PerseusItem {
        return splitPerseusItem(getAnswerfulItem());
    }

    test.each(["answerless", "answerful"])(
        "is interactive with widget options: %p",
        async (e) => {
            // Arrange
            const useAnswerless = e === "answerless";
            const renderItem = useAnswerless
                ? getAnswerlessItem()
                : getAnswerfulItem();

            // Act
            const {renderer} = renderQuestion(renderItem.question);
            await userEvent.tab();
            expect(screen.getByRole("textbox")).toHaveFocus();

            // Assert
            expect(
                screen.getByText(/a simplified proper fraction, like 3\/5, or/),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /a simplified improper fraction, like 7\/4, or/,
                ),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/a mixed number, like 1 and 3\/4/),
            ).toBeInTheDocument();

            await userEvent.type(
                screen.getByRole("textbox", {hidden: true}),
                "42",
            );

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem().question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        },
    );
});

describe("findPrecision", () => {
    it.each([
        [1.23, 2],
        [0.3334, 4],
        [1, 0],
    ])("should find the correct precision", (num, precision) => {
        expect(findPrecision(num)).toEqual(precision);
    });
});

describe("findCommonFractions", () => {
    it.each([
        [1 / 8, 1, 8],
        [+(2 / 3).toFixed(4), 2, 3],
        [500.5, 1001, 2],
    ])("should find the correct representation", (value, num, denom) => {
        const found = findCommonFractions(value);
        expect(found).toEqual({num, denom});
    });

    it.each([2, 20, 500])("should skip whole numbers", (num) => {
        expect(findCommonFractions(num)).toBeFalsy();
    });
});
