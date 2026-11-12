import {
    generateOrdererOption,
    generateOrdererOptions,
    generateOrdererWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, createEvent, fireEvent, screen} from "@testing-library/react";

import {renderQuestion} from "../../__testutils__/render-question";
import {
    getAnswerfulItem,
    getAnswerlessItem,
} from "../../util/scoring.testutils";

import {question2} from "./orderer.testdata";

import type {APIOptions} from "../../types";
import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const ordererOptions: PerseusOrdererWidgetOptions = {
    otherOptions: [],
    layout: "horizontal",
    options: [
        {content: "1", images: {}, widgets: {}},
        {content: "3", images: {}, widgets: {}},
        {content: "2", images: {}, widgets: {}},
    ],
    correctOptions: [
        {content: "1", images: {}, widgets: {}},
        {content: "2", images: {}, widgets: {}},
        {content: "3", images: {}, widgets: {}},
    ],
    height: "normal",
};

describe("orderer widget", () => {
    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question2, {apiOptions});

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question2, {apiOptions});

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question2, {dependencies});
        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "orderer",
                widgetId: "orderer 1",
            },
        });
    });

    describe("disabled state", () => {
        function generateQuestion(isStatic: boolean): PerseusRenderer {
            return generateTestPerseusRenderer({
                content: "[[☃ orderer 1]]",
                widgets: {
                    "orderer 1": generateOrdererWidget({
                        static: isStatic,
                        options: generateOrdererOptions({
                            options: [generateOrdererOption("Card A")],
                        }),
                    }),
                },
            });
        }

        function firePointerEvent(
            type: "mouseDown" | "mouseUp",
            target: Document | Element,
        ) {
            // The orderer positions cards using the event's pageX/pageY,
            // which jsdom doesn't set, so we set them ourselves.
            const event = createEvent[type](target);
            Object.defineProperties(event, {
                pageX: {value: 0},
                pageY: {value: 0},
            });
            fireEvent(target, event);
        }

        function dragBankCard() {
            // The orderer listens for raw mouse events (bound with jQuery on
            // the document), so we drive it with fireEvent.
            firePointerEvent("mouseDown", screen.getByText("Card A"));
            firePointerEvent("mouseUp", document);
        }

        it("adds a card to the answer list when interactive", () => {
            // Arrange
            const {renderer} = renderQuestion(generateQuestion(false), {
                apiOptions: {readOnly: false},
            });

            // Act
            dragBankCard();

            // Assert
            expect(renderer.getUserInputMap()).toEqual({
                "orderer 1": {current: ["Card A"]},
            });
        });

        it.each([
            {name: "static", isStatic: true, readOnly: false},
            {name: "read-only", isStatic: false, readOnly: true},
        ])(
            "does not add a card to the answer list when $name",
            ({isStatic, readOnly}) => {
                // Arrange
                const {renderer} = renderQuestion(generateQuestion(isStatic), {
                    apiOptions: {readOnly},
                });

                // Act
                dragBankCard();

                // Assert
                expect(renderer.getUserInputMap()).toEqual({
                    "orderer 1": {current: []},
                });
            },
        );
    });

    test("the answerless test data doesn't contain answers", () => {
        // Arrange / Act / Assert
        expect(
            getAnswerlessItem("orderer", ordererOptions).question.widgets[
                "orderer 1"
            ].options.correctOptions,
        ).toBeUndefined();
        expect(
            getAnswerlessItem("orderer", ordererOptions).question.widgets[
                "orderer 1"
            ].options.otherOptions,
        ).toBeUndefined();
    });

    describe.each([
        ["answerless", getAnswerlessItem("orderer", ordererOptions)],
        ["answerful", getAnswerfulItem("orderer", ordererOptions)],
    ])("given %s options", (_, {question}) => {
        it("renders", async () => {
            // Arrange / Act
            renderQuestion(question);

            // Assert
            expect(await screen.findByText("1")).toBeInTheDocument();
            expect(await screen.findByText("2")).toBeInTheDocument();
        });

        it("can be answered", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const [orderer] = renderer.findWidgets("orderer 1");
            act(() => orderer.setListValues(["37"]));
            const userInput = renderer.getUserInputMap();

            // Assert
            expect(userInput).toEqual({"orderer 1": {current: ["37"]}});
        });

        it("can give an invalid score", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem("orderer", ordererOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });

        it("can be answered correctly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const [orderer] = renderer.findWidgets("orderer 1");

            act(() => orderer.setListValues(["1", "2", "3"]));
            const userInput = renderer.getUserInputMap();

            const score = scorePerseusItem(
                getAnswerfulItem("orderer", ordererOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be scored incorrectly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const [orderer] = renderer.findWidgets("orderer 1");

            act(() => orderer.setListValues(["2", "3", "1"]));
            const userInput = renderer.getUserInputMap();

            const score = scorePerseusItem(
                getAnswerfulItem("orderer", ordererOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });
});
