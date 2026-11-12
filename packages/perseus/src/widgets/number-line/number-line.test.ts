import {screen, act, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../__testutils__/render-question";
import {Log} from "../../logging/log";
import {
    getAnswerfulItem,
    getAnswerlessItem,
    scorePerseusItemTesting,
} from "../../util/scoring.testutils";

import {inequality, question1, tickCtrl} from "./number-line.testdata";

import type {APIOptions} from "../../types";
import type {
    PerseusNumberLineWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// Builds a native mouse event at the given page coordinates. jsdom doesn't
// implement MouseEvent's pageX/pageY, which Graphie reads, so we set them.
function mouseEventAt(type: string, pageX: number, pageY: number) {
    const event = new MouseEvent(type, {bubbles: true, cancelable: true});
    Object.defineProperties(event, {
        pageX: {value: pageX},
        pageY: {value: pageY},
    });
    return event;
}

// Presses and releases the mouse on the number line, 300px from the left edge
// of the page. Graphie handles clicks on a transparent <rect> in its mouse
// layer, which has no accessible handle. It listens for jQuery vmouse events,
// which the vmouse plugin generates from these native ones.
function clickNumberLine(container: HTMLElement) {
    // eslint-disable-next-line testing-library/no-node-access
    const clickTarget = container.querySelector("svg rect");
    if (clickTarget == null) {
        throw new Error("Couldn't find the number line's click target");
    }
    fireEvent(clickTarget, mouseEventAt("mousedown", 300, 40));
    fireEvent(document, mouseEventAt("mouseup", 300, 40));
}

describe("number-line widget", () => {
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
            const {container} = renderQuestion(question1, {apiOptions});

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
            const {container} = renderQuestion(question1, {
                apiOptions: mobileApiOptions,
            });

            // Assert
            // Note: MovablePoint colors appear as fill/stroke="none" in this
            // snapshot because tokenValue() reads CSS custom properties at
            // runtime — jsdom doesn't define them, so it returns "". The
            // correct hex values resolve in a real browser and are covered
            // by Chromatic visual regression tests.
            expect(container).toMatchSnapshot("first mobile render");
        });

        it(`only endpoints/labels show when "Show label ticks" is off`, () => {
            // Arrange - endpoints
            let question = createNumberLineQuestionWithOptions({
                labelTicks: false,
            });

            // Act
            let {container} = renderQuestion(question, {apiOptions});

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
            container = renderQuestion(question, {apiOptions}).container;

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
            const {container} = renderQuestion(question, {apiOptions});

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
            const {container} = renderQuestion(question, {apiOptions});

            // Assert
            expect(container).toMatchSnapshot("show inserted labels");
        });

        it(`endpoints are highlighted when labels are NOT indicated`, () => {
            // Arrange - right endpoint should highlight
            let question = createNumberLineQuestionWithOptions({
                labelRange: [-5, null],
            });

            // Act
            let {container} = renderQuestion(question, {apiOptions});

            // Assert
            expect(container).toMatchSnapshot("right endpoint highlighted");

            // Arrange - left endpoint should highlight
            question = createNumberLineQuestionWithOptions({
                labelRange: [null, 5],
            });

            // Act
            container = renderQuestion(question, {apiOptions}).container;

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
            const {container} = renderQuestion(question, {apiOptions});

            // Assert
            expect(container).toMatchSnapshot("show fractions");
        });
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question1, {dependencies});

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "number-line",
                widgetId: "number-line 1",
            },
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

        test("removes the point's drop shadow when the circle is made open on mobile", async () => {
            // Arrange
            const item = getAnswerfulItem(
                "number-line",
                getInequalityOptions(),
            );
            const {container} = renderQuestion(item.question, {
                apiOptions: {isMobile: true},
            });
            // The shadow lives in an inline `filter` style on the point's
            // wrapper; there's no accessible handle for it.
            const shadowed = () =>
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                container.querySelectorAll('[style*="drop-shadow"]');
            expect(shadowed()).toHaveLength(1);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Make circle open"}),
            );

            // Assert
            expect(shadowed()).toHaveLength(0);
        });

        // Regression (LEMS-3530)
        test("can have its divisions edited", async () => {
            renderQuestion(tickCtrl);

            // eslint-disable-next-line no-restricted-syntax
            let tickCtrlInput: HTMLInputElement = screen.getByRole("textbox", {
                name: "Number of divisions:",
            }) as HTMLInputElement;

            expect(tickCtrlInput.value).toBe("1");

            await userEvent.clear(tickCtrlInput);
            await userEvent.type(tickCtrlInput, "10");

            expect(
                screen.queryByText("Rendering Error!"),
            ).not.toBeInTheDocument();

            // eslint-disable-next-line no-restricted-syntax
            tickCtrlInput = screen.getByRole("textbox", {
                name: "Number of divisions:",
            }) as HTMLInputElement;

            expect(tickCtrlInput.value).toBe("10");
        });

        test("reuses the same graphie setup function when its divisions change", async () => {
            // <Graphie> logs an error if it's handed a new `setup` function
            // after it mounts, so NumberLine must give it the same one on
            // every render.

            // Arrange
            const logError = jest
                .spyOn(Log, "error")
                .mockImplementation(() => {});
            renderQuestion(tickCtrl);
            const tickCtrlInput = screen.getByRole("textbox", {
                name: "Number of divisions:",
            });

            // Act
            await userEvent.clear(tickCtrlInput);
            await userEvent.type(tickCtrlInput, "5");

            // Assert
            expect(logError).not.toHaveBeenCalled();
        });

        test("moves the point when the number line is clicked", () => {
            // Arrange
            const {renderer, container} = renderQuestion(question1);

            // Act
            clickNumberLine(container);

            // Assert
            expect(
                renderer.getUserInputMap()["number-line 1"].numLinePosition,
            ).toBe(1.5);
        });
    });

    describe.each([
        {name: "static", isStatic: true, readOnly: false},
        {name: "read-only", isStatic: false, readOnly: true},
    ])("when $name", ({isStatic, readOnly}) => {
        function withStatic(question: PerseusRenderer): PerseusRenderer {
            return {
                ...question,
                widgets: {
                    "number-line 1": {
                        ...question.widgets["number-line 1"],
                        static: isStatic,
                    },
                },
            };
        }

        it("does not move the point when the number line is clicked", () => {
            // Arrange
            const {renderer, container} = renderQuestion(
                withStatic(question1),
                {apiOptions: {readOnly}},
            );
            // Static widgets start with the correct answer filled in, so
            // compare against the initial input instead of a fixed value.
            const initialUserInput = renderer.getUserInputMap();

            // Act
            clickNumberLine(container);

            // Assert
            expect(renderer.getUserInputMap()).toEqual(initialUserInput);
        });

        it("disables the divisions input", () => {
            // Arrange, Act
            renderQuestion(withStatic(tickCtrl), {apiOptions: {readOnly}});

            // Assert
            expect(
                screen.getByRole("textbox", {name: "Number of divisions:"}),
            ).toBeDisabled();
        });

        it("disables the divisions input when using the on-screen keypad", () => {
            // Arrange, Act
            renderQuestion(withStatic(tickCtrl), {
                apiOptions: {readOnly, customKeypad: true},
            });

            // Assert
            expect(
                screen.getByRole("textbox", {name: "Number of divisions:"}),
            ).toBeDisabled();
        });
    });

    it("disables the inequality buttons when read-only", () => {
        // Arrange, Act
        renderQuestion(inequality, {apiOptions: {readOnly: true}});

        // Assert
        expect(
            screen.getByRole("button", {name: "Switch direction"}),
        ).toBeDisabled();
        expect(
            screen.getByRole("button", {name: "Make circle open"}),
        ).toBeDisabled();
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
            const {renderer} = renderQuestion(question, {apiOptions});

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
            const {renderer} = renderQuestion(question, {apiOptions});

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
            const {renderer} = renderQuestion(question, {apiOptions});

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
