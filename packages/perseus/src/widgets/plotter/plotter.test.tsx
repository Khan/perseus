import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen, waitFor} from "@testing-library/react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {getAnswerfulItem, getAnswerlessItem} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {dotPlotter} from "./plotter.testdata";

import type {PerseusDependenciesV2} from "../../types";
import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";

describe("plotter widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    // Regression (LEMS-3251) make sure the dot plotter doesn't crash
    it("should render dot plotters", () => {
        renderQuestion(dotPlotter);

        expect(screen.getByText("Average Temp")).toBeInTheDocument();
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(dotPlotter, undefined, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "plotter",
                widgetId: "plotter 1",
            },
        });
    });

    describe("drag text", () => {
        function sharedPlotterOptions(): PerseusPlotterWidgetOptions {
            return {
                categories: ["0", "1", "2"],
                plotDimensions: [300, 300],
                correct: [0, 1, 2],
                labels: ["Horizontal", "Vertical"],
                maxY: 2,
                scaleY: 1,
                snapsPerLine: 1,
                starting: [0, 0, 0],
                type: "bar",
            };
        }

        it("should show drag text when not static", async () => {
            // Arrange and Act
            renderQuestion(
                {
                    content: "[[☃ plotter 1]]",
                    images: {},
                    widgets: {
                        "plotter 1": {
                            type: "plotter",
                            static: false, // <= important
                            options: sharedPlotterOptions(),
                        },
                    },
                },
                {
                    ...ApiOptions.defaults,
                    isMobile: true, // <= important
                },
            );

            // Assert
            expect(
                await screen.findByText("Drag handles to make graph"),
            ).toBeInTheDocument();
        });

        it("should not show drag text when static", async () => {
            // Arrange and Act
            renderQuestion(
                {
                    content: "[[☃ plotter 1]]",
                    images: {},
                    widgets: {
                        "plotter 1": {
                            type: "plotter",
                            static: true, // <= important
                            options: sharedPlotterOptions(),
                        },
                    },
                },
                {
                    ...ApiOptions.defaults,
                    isMobile: true, // <= important
                },
            );

            // Assert
            await waitFor(() => {
                expect(
                    screen.queryByText("Drag handles to make graph"),
                ).not.toBeInTheDocument();
            });
        });
    });

    const plotterOptions: PerseusPlotterWidgetOptions = {
        categories: ["$1^{\\text{st}} \\text{}$"],
        picBoxHeight: 300,
        picSize: 300,
        picUrl: "",
        plotDimensions: [380, 300],
        correct: [15],
        labelInterval: 1,
        labels: ["School grade", "Number of absent students"],
        maxY: 30,
        scaleY: 5,
        snapsPerLine: 1,
        starting: [0],
        type: "bar",
    };

    test("the answerless test data doesn't contain answers", () => {
        // Arrange / Act / Assert
        expect(
            getAnswerlessItem("plotter", plotterOptions).question.widgets[
                "plotter 1"
            ].options.correct,
        ).toBeUndefined();
    });

    describe.each([
        ["answerless", getAnswerlessItem("plotter", plotterOptions)],
        ["answerful", getAnswerfulItem("plotter", plotterOptions)],
    ])("given %s options", (_, {question}) => {
        it("renders correctly", async () => {
            // Arrange / Act
            renderQuestion(question);

            // Assert
            expect(await screen.findByText("School grade")).toBeInTheDocument();
            expect(
                await screen.findByText("Number of absent students"),
            ).toBeInTheDocument();
        });

        it("can given an invalid score", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem("plotter", plotterOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(userInput).toEqual({"plotter 1": [0]});
            expect(score).toHaveInvalidInput();
        });

        it("can be answered correctly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const [plotter] = renderer.findWidgets("plotter 1");

            act(() => plotter._testInsertUserInput([15]));
            const userInput = renderer.getUserInputMap();

            const score = scorePerseusItem(
                getAnswerfulItem("plotter", plotterOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(userInput).toEqual({"plotter 1": [15]});
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be scored incorrectly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const [plotter] = renderer.findWidgets("plotter 1");
            act(() => plotter._testInsertUserInput([7])); // mock user entering a value
            const userInput = renderer.getUserInputMap();

            const score = scorePerseusItem(
                getAnswerfulItem("plotter", plotterOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(userInput).toEqual({"plotter 1": [7]});
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });
});
