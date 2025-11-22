import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {getAnswerfulItem, getAnswerlessItem} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question2} from "./orderer.testdata";

import type {APIOptions, PerseusDependenciesV2} from "../../types";
import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";

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
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question2, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question2, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question2, undefined, undefined, undefined, depsV2);
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
