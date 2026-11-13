import {
    generatePlotterOptions,
    generatePlotterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";

import {renderQuestion} from "../../__testutils__/render-question";
import {
    getAnswerfulItem,
    getAnswerlessItem,
} from "../../util/scoring.testutils";

import {dotPlotter} from "./plotter.testdata";

import type {
    PerseusPlotterWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

describe("plotter widget", () => {
    // Regression (LEMS-3251) make sure the dot plotter doesn't crash
    it("should render dot plotters", async () => {
        renderQuestion(dotPlotter);
        // Wait for plotter's card resizing to settle. RTL logs an error if
        // the resize happens outside an act() call.
        await act(() => Promise.resolve());

        expect(screen.getByText("Average Temp")).toBeInTheDocument();
    });

    it("should send analytics event when widget is rendered", async () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(dotPlotter, {dependencies});
        // Wait for plotter's card resizing to settle. RTL logs an error if
        // the resize happens outside an act() call.
        await act(() => Promise.resolve());

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

    describe("disabled state", () => {
        function generateQuestion(
            type: PerseusPlotterWidgetOptions["type"],
            isStatic: boolean,
            values: number[] = [1, 2, 3],
        ): PerseusRenderer {
            return generateTestPerseusRenderer({
                content: "[[☃ plotter 1]]",
                widgets: {
                    "plotter 1": generatePlotterWidget({
                        static: isStatic,
                        options: generatePlotterOptions({
                            type,
                            categories: ["A", "B", "C"],
                            // Static widgets render with the correct answer
                            // as their user input, so we set both to the
                            // same values.
                            starting: values,
                            correct: values,
                            maxY: 5,
                            scaleY: 1,
                        }),
                    }),
                },
            });
        }

        function getMouseTargets(container: HTMLElement, kind: string) {
            // Graphie's mouse targets are bare SVG elements with no
            // accessible role, so Testing Library queries can't find them.
            // eslint-disable-next-line testing-library/no-node-access
            return container.querySelectorAll(
                `[data-interactive-kind-for-testing='${kind}']`,
            );
        }

        // Plotter draws each plot type differently on desktop and mobile, so
        // every type is tested on both. Each row lists a kind of Graphie
        // mouse target that makes the plot interactive.
        const plotTypes = [
            // Desktop bars are dragged by a line segment across the top;
            // mobile bars by a point.
            {type: "bar", isMobile: false, targetKind: "movable-line"},
            {type: "bar", isMobile: true, targetKind: "movable-point"},
            {type: "histogram", isMobile: false, targetKind: "movable-line"},
            {type: "histogram", isMobile: true, targetKind: "movable-point"},
            // Line plots have draggable points joined by lines that
            // highlight on hover.
            {type: "line", isMobile: false, targetKind: "movable-point"},
            {type: "line", isMobile: false, targetKind: "movable-line"},
            {type: "line", isMobile: true, targetKind: "movable-point"},
            {type: "line", isMobile: true, targetKind: "movable-line"},
            // Tiled plots are set by clicking or tapping a tile.
            {type: "dotplot", isMobile: false, targetKind: "plotter-tile"},
            {type: "dotplot", isMobile: true, targetKind: "plotter-tile"},
            {type: "pic", isMobile: false, targetKind: "plotter-tile"},
            {type: "pic", isMobile: true, targetKind: "plotter-tile"},
        ] as const;

        describe.each(plotTypes)(
            "$type plot (isMobile: $isMobile, $targetKind)",
            ({type, isMobile, targetKind}) => {
                it("renders mouse targets when interactive", async () => {
                    // Arrange, Act
                    const {container} = renderQuestion(
                        generateQuestion(type, false),
                        {apiOptions: {isMobile, readOnly: false}},
                    );
                    // Wait for plotter's card resizing to settle.
                    await act(() => Promise.resolve());

                    // Assert
                    expect(
                        getMouseTargets(container, targetKind).length,
                    ).toBeGreaterThan(0);
                }, 10_000 /* increase timeout */);

                it.each([
                    {name: "static", isStatic: true, readOnly: false},
                    {name: "read-only", isStatic: false, readOnly: true},
                ])(
                    "does not render mouse targets when $name",
                    async ({isStatic, readOnly}) => {
                        // Arrange, Act
                        const {container} = renderQuestion(
                            generateQuestion(type, isStatic),
                            {apiOptions: {isMobile, readOnly}},
                        );
                        // Wait for plotter's card resizing to settle.
                        await act(() => Promise.resolve());

                        // Assert
                        expect(
                            getMouseTargets(container, targetKind),
                        ).toHaveLength(0);
                    },
                    10_000 /* increase timeout */,
                );
            },
        );

        // Mobile plots show instructions over the graph. (Desktop plots
        // never show them.) Tiled plots only show theirs while empty.
        const mobilePrompts = [
            {
                type: "bar",
                text: "Drag handles to make graph",
                values: [1, 2, 3],
            },
            {
                type: "line",
                text: "Drag handles to make graph",
                values: [1, 2, 3],
            },
            {type: "dotplot", text: "Tap to add points", values: [0, 0, 0]},
            {type: "pic", text: "Tap to add points", values: [0, 0, 0]},
        ] as const;

        describe.each(mobilePrompts)(
            "$type plot on mobile",
            ({type, text, values}) => {
                it(`shows "${text}" when interactive`, async () => {
                    // Arrange, Act
                    renderQuestion(generateQuestion(type, false, [...values]), {
                        apiOptions: {isMobile: true, readOnly: false},
                    });
                    // Wait for plotter's card resizing to settle.
                    await act(() => Promise.resolve());

                    // Assert
                    expect(screen.getByText(text)).toBeInTheDocument();
                }, 10_000 /* increase timeout */);

                it.each([
                    {name: "static", isStatic: true, readOnly: false},
                    {name: "read-only", isStatic: false, readOnly: true},
                ])(
                    `does not show "${text}" when $name`,
                    async ({isStatic, readOnly}) => {
                        // Arrange, Act
                        renderQuestion(
                            generateQuestion(type, isStatic, [...values]),
                            {apiOptions: {isMobile: true, readOnly}},
                        );
                        // Wait for plotter's card resizing to settle.
                        await act(() => Promise.resolve());

                        // Assert
                        expect(
                            screen.queryByText(text),
                        ).not.toBeInTheDocument();
                    },
                    10_000 /* increase timeout */,
                );
            },
        );
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

        it("can given an invalid score", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);
            // Wait for plotter's card resizing to settle. RTL logs an error if
            // the resize happens outside an act() call.
            await act(() => Promise.resolve());

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

        it("can be answered correctly", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);
            // Wait for plotter's card resizing to settle. RTL logs an error if
            // the resize happens outside an act() call.
            await act(() => Promise.resolve());

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

        it("can be scored incorrectly", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);
            // Wait for plotter's card resizing to settle. RTL logs an error if
            // the resize happens outside an act() call.
            await act(() => Promise.resolve());

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
