import {render, screen, waitFor} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {getAnswerfulItem, getAnswerlessItem} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Plotter} from "./plotter";

import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

describe("plotter widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should show drag text when not static", async () => {
        // Arrange and Act
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={false}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        expect(
            await screen.findByText("Drag handles to make graph"),
        ).toBeInTheDocument();
    });

    it("should not show drag text when static", async () => {
        // Arrange and Act
        render(
            // @ts-expect-error - TS2769 - test works, but I can't figure out how to make the types happy
            <Plotter
                static={true}
                trackInteraction={() => {}}
                onChange={() => {}}
                apiOptions={{
                    ...ApiOptions.defaults,
                    isMobile: true,
                }}
                starting={[0]}
            />,
        );

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByText("Drag handles to make graph"),
            ).not.toBeInTheDocument();
        });
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
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
            expect(
                getAnswerlessItem("plotter", plotterOptions).question.widgets[
                    "plotter 1"
                ].options.correct,
            ).toBeUndefined();
        });

        test.each([
            ["answerless", getAnswerlessItem("plotter", plotterOptions)],
            ["answerful", getAnswerfulItem("plotter", plotterOptions)],
        ])("renders correctly with widget options: %p", async (_, item) => {
            // Arrange / Act
            renderQuestion(item.question);

            // Assert
            expect(await screen.findByText("School grade")).toBeInTheDocument();
            expect(
                await screen.findByText("Number of absent students"),
            ).toBeInTheDocument();
        });

        test.each([
            ["answerless", getAnswerlessItem("plotter", plotterOptions)],
            ["answerful", getAnswerfulItem("plotter", plotterOptions)],
        ])(
            "no interaction results in invalid score for widget option: %p",
            async (_, item) => {
                const {renderer} = renderQuestion(item.question);

                const userInput = renderer.getUserInputMap();

                expect(userInput).toEqual({"plotter 1": [0]});

                const score = scorePerseusItem(
                    getAnswerfulItem("plotter", plotterOptions).question,
                    userInput,
                    "en",
                );

                // Assert
                expect(score).toHaveInvalidInput();
            },
        );

        const plotterOptionsCorrectSameAsStarting: PerseusPlotterWidgetOptions =
            {
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
                starting: [15],
                type: "bar",
            };

        test.each([
            [
                "answerless",
                getAnswerlessItem(
                    "plotter",
                    plotterOptionsCorrectSameAsStarting,
                ),
            ],
            [
                "answerful",
                getAnswerfulItem(
                    "plotter",
                    plotterOptionsCorrectSameAsStarting,
                ),
            ],
        ])(
            "consistent experience for getting user input between item types with widget option: %p",
            async (_, item) => {
                const {renderer} = renderQuestion(item.question);

                const userInput = renderer.getUserInputMap();

                expect(userInput).toEqual({"plotter 1": [15]});

                const score = scorePerseusItem(
                    getAnswerfulItem("plotter", plotterOptions).question,
                    userInput,
                    "en",
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            },
        );
    });
});
