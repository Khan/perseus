import {screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {
    getAnswerfulItem,
    getAnswerlessItem,
    scorePerseusItemTesting,
} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1, tickCtrl} from "./number-line.testdata";

import type {APIOptions} from "../../types";
import type {PerseusNumberLineWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("number-line widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("snapshots", () => {
        let apiOptions: APIOptions;
        const createNumberLineQuestionWithOptions = (widgetOptions) => {
            return {
                ...question1,
                widgets: {
                    ...question1.widgets,
                    "number-line 1": {
                        ...question1.widgets["number-line 1"],
                        options: {
                            ...question1.widgets["number-line 1"].options,
                            range: [-10, 10],
                            ...widgetOptions,
                        },
                    },
                },
            };
        };

        beforeAll(() => {
            apiOptions = {
                isMobile: false,
            };
        });

        it("default", () => {
            // Act
            const {container} = renderQuestion(question1, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("first render");
        });

        it("mobile", () => {
            // Arrange
            jest.useRealTimers();

            const mobileApiOptions: APIOptions = {
                isMobile: true,
            };

            // Act
            const {container} = renderQuestion(question1, mobileApiOptions);

            // Assert
            expect(container).toMatchSnapshot("first mobile render");
        });

        it(`only endpoints/labels show when "Show label ticks" is off`, () => {
            // Arrange - endpoints
            let question = createNumberLineQuestionWithOptions({
                labelTicks: false,
            });

            // Act
            let {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot(
                "show label ticks off (endpoints)",
            );

            // Arrange - labels
            question = createNumberLineQuestionWithOptions({
                labelTicks: false,
                labelRange: [-4, 4],
            });

            // Act
            container = renderQuestion(question, apiOptions).container;

            // Assert
            expect(container).toMatchSnapshot("show label ticks off (labels)");
        });

        it(`labels are highlighted when part of the tick step`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                tickStep: 2,
                labelRange: [-6, 6],
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show highlighted labels");
        });

        it(`labels are inserted when NOT part of the tick step`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                tickStep: 2,
                labelRange: [-5, 5],
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show inserted labels");
        });

        it(`endpoints are highlighted when labels are NOT indicated`, () => {
            // Arrange - right endpoint should highlight
            let question = createNumberLineQuestionWithOptions({
                labelRange: [-5, null],
            });

            // Act
            let {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("right endpoint highlighted");

            // Arrange - left endpoint should highlight
            question = createNumberLineQuestionWithOptions({
                labelRange: [null, 5],
            });

            // Act
            container = renderQuestion(question, apiOptions).container;

            // Assert
            expect(container).toMatchSnapshot("left endpoint highlighted");
        });

        it(`can handle fractions`, () => {
            // Some fractions create non-integer values (i.e. 7.00001).
            // This test works specifically with 1/6 to generate the value that might cause an error.

            // Arrange
            const question = createNumberLineQuestionWithOptions({
                range: [0, 1.1666666666666667],
                divisionRange: [1, 12],
                labelRange: [null, 0.16666666666666666],
                labelStyle: "improper",
                tickStep: 0.16666666666666666,
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show fractions");
        });

        it(`all tick labels show when "Style" is "decimal ticks" (deprecated option)`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                labelTicks: false,
                labelStyle: "decimal ticks",
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show decimal ticks");
        });
    });

    describe("controls", () => {
        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
        });

        function getInequalityOptions(): PerseusNumberLineWidgetOptions {
            return {
                static: false, // <= important
                isInequality: true, // <= important
                correctRel: "le",
                correctX: -1,
                divisionRange: [1, 12],
                initialX: -5,
                labelRange: [null, null],
                labelStyle: "decimal",
                labelTicks: true,
                numDivisions: null,
                range: [-5, 5],
                showTooltips: false,
                snapDivisions: 1,
                tickStep: 1,
                isTickCtrl: false,
            };
        }

        // Regression (LEMS-3247)
        test("can switch directions", async () => {
            const item = getAnswerfulItem(
                "number-line",
                getInequalityOptions(),
            );

            const {renderer} = renderQuestion(item.question);

            const preUserInput = renderer.getUserInputMap();

            await userEvent.click(
                screen.getByRole("button", {name: "Switch direction"}),
            );

            const postUserInput = renderer.getUserInputMap();

            // Assert the relationship changes direction
            // when we hit "switch direction"
            expect(preUserInput["number-line 1"].rel).toBe("ge");
            expect(postUserInput["number-line 1"].rel).toBe("le");
        });

        // Regression (LEMS-3247)
        test("can change circle fill", async () => {
            const item = getAnswerfulItem(
                "number-line",
                getInequalityOptions(),
            );

            const {renderer} = renderQuestion(item.question);

            const preUserInput = renderer.getUserInputMap();

            await userEvent.click(
                screen.getByRole("button", {name: "Make circle open"}),
            );

            const postUserInput = renderer.getUserInputMap();

            // Assert the relationship changes direction
            // when we hit "make circle open"
            expect(preUserInput["number-line 1"].rel).toBe("ge");
            expect(postUserInput["number-line 1"].rel).toBe("gt");
        });

        // Regression (LEMS-3530)
        test("can have its divisions edited", async () => {
            renderQuestion(tickCtrl);

            let tickCtrlInput: HTMLInputElement = screen.getByRole("textbox", {
                name: "Number of divisions:",
            }) as HTMLInputElement;

            expect(tickCtrlInput.value).toBe("1");

            await userEvent.clear(tickCtrlInput);
            await userEvent.type(tickCtrlInput, "10");

            expect(
                screen.queryByText("Rendering Error!"),
            ).not.toBeInTheDocument();

            tickCtrlInput = screen.getByRole("textbox", {
                name: "Number of divisions:",
            }) as HTMLInputElement;

            expect(tickCtrlInput.value).toBe("10");
        });
    });

    const numberLineOptions: PerseusNumberLineWidgetOptions = {
        labelRange: [null, null],
        initialX: null,
        tickStep: 1,
        labelStyle: "decimal",
        labelTicks: true,
        isInequality: false,
        snapDivisions: 2,
        range: [-4, 4],
        static: false,
        correctRel: "eq",
        numDivisions: null,
        divisionRange: [1, 10],
        correctX: -2.5,
        isTickCtrl: false,
    };

    test("answerless data doesn't contain answers", () => {
        const options = getAnswerlessItem("number-line", numberLineOptions)
            .question.widgets["number-line 1"].options;
        expect(options.correctX).toBeUndefined();
        expect(options.correctRel).toBeUndefined();
    });

    describe.each([
        ["answerless", getAnswerlessItem("number-line", numberLineOptions)],
        ["answerful", getAnswerfulItem("number-line", numberLineOptions)],
    ])("given %s options", (_, {question}) => {
        const correctAnswer = getAnswerfulItem(
            "number-line",
            numberLineOptions,
        ).question;

        it("can be answered correctly", () => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile: false,
            };
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const [numberLine] = renderer.findWidgets("number-line 1");
            act(() => numberLine.movePosition(-2.5));
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(correctAnswer, userInput);

            // assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be answered incorrectly", () => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile: false,
            };
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const [numberLine] = renderer.findWidgets("number-line 1");
            act(() => numberLine.movePosition(3.5));
            const score = scorePerseusItemTesting(
                correctAnswer,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });

        it("is scored invalid if the user does not interact with it", () => {
            // Arrange
            const apiOptions: APIOptions = {
                isMobile: false,
            };
            const {renderer} = renderQuestion(question, apiOptions);

            // Act
            const score = scorePerseusItemTesting(
                correctAnswer,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });
    });
});
