import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, render, screen, waitFor} from "@testing-library/react";
import React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {getAnswerfulItem, getAnswerlessItem} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Plotter} from "./plotter";

import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";

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
            const userInput = renderer.getUserInput();
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

            act(() => plotter.setState({values: [15]}));
            const userInput = renderer.getUserInput();

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

            act(() => plotter.setState({values: [7]})); // mock user entering a value
            const userInput = renderer.getUserInput();

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
