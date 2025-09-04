import {describe, beforeEach, it} from "@jest/globals";
import {
    generateTestPerseusItem,
    lockedFigureColors,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Plot} from "mafs";
import * as React from "react";
import invariant from "tiny-invariant";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {getDefaultFigureForType} from "../../../../perseus-editor/src/widgets/interactive-graph-editor/locked-figures/util";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";
import {sinusoidQuestion} from "../grapher/grapher.testdata";

import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";
import {
    angleQuestion,
    angleQuestionWithDefaultCorrect,
    circleQuestion,
    circleQuestionWithDefaultCorrect,
    finitePointQuestion,
    graphWithLabeledEllipse,
    graphWithLabeledFunction,
    graphWithLabeledLine,
    graphWithLabeledPoint,
    graphWithLabeledPolygon,
    graphWithLabeledVector,
    interactiveGraphWithAriaLabel,
    linearQuestion,
    linearQuestionWithDefaultCorrect,
    linearSystemQuestion,
    linearSystemQuestionWithDefaultCorrect,
    noneQuestion,
    pointQuestion,
    pointQuestionWithDefaultCorrect,
    polygonQuestion,
    polygonQuestionDefaultCorrect,
    quadraticQuestion,
    quadraticQuestionWithDefaultCorrect,
    questionsAndAnswers,
    rayQuestion,
    rayQuestionWithDefaultCorrect,
    segmentQuestion,
    segmentQuestionDefaultCorrect,
    segmentWithLockedEllipses,
    segmentWithLockedEllipseWhite,
    segmentWithLockedFunction,
    segmentWithLockedLabels,
    segmentWithLockedLineQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedPointsWithColorQuestion,
    segmentWithLockedPolygons,
    segmentWithLockedPolygonWhite,
    segmentWithLockedVectors,
    sinusoidQuestionWithDefaultCorrect,
    sinusoidWithPiTicks,
    unlimitedPointQuestion,
    unlimitedPolygonQuestion,
} from "./interactive-graph.testdata";

import type {Coord} from "../../interactive2/types";
import type {APIOptions} from "../../types";
import type {
    StrokeWeight,
    PerseusGraphType,
    PerseusRenderer,
    ShowAxisArrows,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const commonInstructions =
    "Use the Tab key to move through the interactive elements in the graph. When an interactive element has focus, use Control + Shift + Arrows to move it.";
const unlimitedInstructions =
    "Press Shift + Enter to interact with the graph. Use the Tab key to move through the interactive elements in the graph and access the graph Action Bar. When an interactive element has focus, use Control + Shift + Arrows to move it or use the Delete key to remove it from the graph. Use the buttons in the Action Bar to add or adjust elements within the graph.";

const blankOptions: APIOptions = Object.freeze(ApiOptions.defaults);

describe("Interactive Graph", function () {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve("{}"),
                ok: true,
            }),
        ) as jest.Mock;
    });

    describe.each(questionsAndAnswers)(
        "question",
        (
            question: PerseusRenderer,
            correct: ReadonlyArray<Coord>,
            incorrect: ReadonlyArray<Coord>,
        ) => {
            it("Should accept the right answer", async () => {
                // Arrange
                const userInput: UserInputMap = {
                    "interactive-graph 1": {
                        type: question.widgets["interactive-graph 1"].options
                            .graph.type,
                        coords: [...correct],
                    } as any,
                };

                const {renderer} = renderQuestion(
                    question,
                    blankOptions,
                    undefined,
                    userInput,
                );

                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            });

            it("Should render blank predictably", async () => {
                const {container} = renderQuestion(question, blankOptions);
                expect(container).toMatchSnapshot("first render");
            });

            it("Should render user input predictably", async () => {
                const userInput: UserInputMap = {
                    "interactive-graph 1": {
                        type: question.widgets["interactive-graph 1"].options
                            .graph.type,
                        coords: [...correct],
                    } as any,
                };
                const {container} = renderQuestion(
                    question,
                    blankOptions,
                    undefined,
                    userInput,
                );
                expect(container).toMatchSnapshot("with user input");
            });

            it("should reject no interaction", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveInvalidInput();
            });

            it("should reject an incorrect answer", async () => {
                // Arrange
                const userInput: UserInputMap = {
                    "interactive-graph 1": {
                        type: question.widgets["interactive-graph 1"].options
                            .graph.type,
                        coords: [...incorrect],
                    } as any,
                };

                const {renderer} = renderQuestion(
                    question,
                    blankOptions,
                    undefined,
                    userInput,
                );

                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredIncorrectly();
            });
        },
    );

    describe("A none-type graph", () => {
        it("renders predictably", () => {
            const question = interactiveGraphQuestionBuilder()
                .withNoInteractiveFigure()
                .build();
            const {container} = renderQuestion(question, blankOptions);

            expect(container).toMatchSnapshot("first render");
        });

        it("treats no interaction as a correct answer", async () => {
            const question = interactiveGraphQuestionBuilder()
                .withNoInteractiveFigure()
                .build();
            const {renderer} = renderQuestion(question, blankOptions);
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(question, userInput);

            expect(score).toHaveBeenAnsweredCorrectly({
                shouldHavePoints: false,
            });
        });
    });

    const graphQuestionRenderers: {
        [K in PerseusGraphType["type"][number]]: PerseusRenderer;
    } = {
        angle: angleQuestion,
        segment: segmentQuestion,
        linear: linearQuestion,
        "linear-system": linearSystemQuestion,
        ray: rayQuestion,
        polygon: polygonQuestion,
        point: pointQuestion,
        circle: circleQuestion,
        quadratic: quadraticQuestion,
        sinusoid: sinusoidQuestion,
        "unlimited-point": pointQuestion,
        "unlimited-polygon": polygonQuestion,
    };

    const graphQuestionRenderersCorrect: {
        [K in PerseusGraphType["type"][number]]: PerseusRenderer;
    } = {
        angle: angleQuestionWithDefaultCorrect,
        segment: segmentQuestionDefaultCorrect,
        linear: linearQuestionWithDefaultCorrect,
        "linear-system": linearSystemQuestionWithDefaultCorrect,
        ray: rayQuestionWithDefaultCorrect,
        polygon: polygonQuestionDefaultCorrect,
        point: pointQuestionWithDefaultCorrect,
        circle: circleQuestionWithDefaultCorrect,
        quadratic: quadraticQuestionWithDefaultCorrect,
        sinusoid: sinusoidQuestionWithDefaultCorrect,
        "unlimited-point": pointQuestionWithDefaultCorrect,
        "unlimited-polygon": polygonQuestionDefaultCorrect,
    };

    describe.each(Object.entries(graphQuestionRenderers))(
        "graph type %s",
        (_type, question) => {
            it("should render", () => {
                renderQuestion(question, blankOptions);
            });

            it("should render when the correct answer is not present", () => {
                // As part of implementing server-side scoring (Q1 2025) we are
                // removing answers from the widget data that's initially sent
                // to the frontend. This test ensures that interactive graphs
                // can render when the answers have been stripped out of the
                // data.
                const answerfulItem = generateTestPerseusItem({question});
                const answerlessItem = splitPerseusItem(answerfulItem);

                renderQuestion(answerlessItem.question, blankOptions);
            });

            it("should reject when has not been interacted with", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                const score = scorePerseusItemTesting(
                    question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveInvalidInput();
            });
        },
    );

    describe.each(Object.entries(graphQuestionRenderersCorrect))(
        "graph type %s: default correct",
        (_type, question) => {
            it("should render", () => {
                renderQuestion(question, blankOptions);
            });

            // TODO(jeremy): This test is disabled because it fails
            // sporadically (especially on slower/lower-end computers, like
            // CI). Will work on a fix after the React 18 release.
            it.skip("rejects incorrect answer", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowright}");

                // Assert
                await waitFor(
                    () => {
                        const score = scorePerseusItemTesting(
                            question,
                            renderer.getUserInputMap(),
                        );
                        expect(score).toHaveBeenAnsweredIncorrectly();
                    },
                    {timeout: 5000},
                );
            });

            // TODO(jeremy): This test is disabled because it fails
            // sporadically (especially on slower/lower-end computers, like
            // CI). Will work on a fix after the React 18 release.
            it.skip("accepts correct answer", async () => {
                const {renderer} = renderQuestion(question, blankOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(
                    () => {
                        const score = scorePerseusItemTesting(
                            question,
                            renderer.getUserInputMap(),
                        );
                        expect(score).toHaveBeenAnsweredCorrectly();
                    },
                    {timeout: 5000},
                );
            });

            it("is marked invalid when readOnly set to true", async () => {
                const {renderer} = renderQuestion(question, {
                    ...blankOptions,
                    readOnly: true,
                });

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(
                    () => {
                        const score = scorePerseusItemTesting(
                            question,
                            renderer.getUserInputMap(),
                        );
                        expect(score).toHaveInvalidInput();
                    },
                    {timeout: 5000},
                );
            });
        },
    );

    describe("locked layer", () => {
        it("should render locked points", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPointsQuestion,
                blankOptions,
            );

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll(
                // Filter out the interactive points' circles
                "circle:not([class*='movable-point'])",
            );

            // Act

            // Assert
            expect(points).toHaveLength(2);
        });

        it("should render locked points with styles", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPointsQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll(
                "circle:not([class*='movable-point'])",
            );

            // Assert
            expect(points[0]).toHaveStyle({
                fill: lockedFigureColors.grayH,
                stroke: lockedFigureColors.grayH,
            });
            expect(points[1]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.grayH,
            });
        });
    });

    describe("tabbing forward on a segment graph", () => {
        it("focuses the first endpoint of a segment first", async () => {
            const {container} = renderQuestion(segmentQuestion, blankOptions);

            await userEvent.tab();
            await userEvent.tab();

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const movablePoints = container.querySelectorAll(
                "[data-testid=movable-point__focusable-handle]",
            );
            expect(movablePoints[0]).toHaveFocus();
        });

        it("focuses the whole segment third", async () => {
            const {container} = renderQuestion(segmentQuestion, blankOptions);

            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const movableLine = container.querySelector(
                "[data-testid=movable-line]",
            );
            expect(movableLine).toHaveFocus();
        });

        it("focuses the second point third", async () => {
            const {container} = renderQuestion(segmentQuestion, blankOptions);

            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const movablePoints = container.querySelectorAll(
                "[data-testid=movable-point__focusable-handle]",
            );
            expect(movablePoints[1]).toHaveFocus();
        });
    });

    describe("tabbing backward on a segment graph", () => {
        it("moves focus from the last point to the whole segment", async () => {
            const {container} = renderQuestion(segmentQuestion, blankOptions);

            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab({shift: true});

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const movableLine = container.querySelector(
                "[data-testid=movable-line]",
            );
            expect(movableLine).toHaveFocus();
        });

        it("moves focus from the whole segment to the first point", async () => {
            const {container} = renderQuestion(segmentQuestion, blankOptions);

            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab();
            await userEvent.tab({shift: true});

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const movablePoints = container.querySelectorAll(
                "[data-testid=movable-point__focusable-handle]",
            );
            expect(movablePoints[0]).toHaveFocus();
        });
    });

    describe("locked layer", () => {
        it("should render locked points", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPointsQuestion,
                blankOptions,
            );

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll(
                // Filter out the interactive points' circles
                "circle:not([class*='movable-point'])",
            );

            // Act

            // Assert
            expect(points).toHaveLength(2);
        });

        it("should render locked points with styles when color is not specified", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPointsQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll(
                "circle:not([class*='movable-point'])",
            );

            // Assert
            expect(points[0]).toHaveStyle({
                fill: lockedFigureColors.grayH,
                stroke: lockedFigureColors.grayH,
            });
            expect(points[1]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.grayH,
            });
        });

        it("should render locked points with styles when color is specified", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPointsWithColorQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const points = container.querySelectorAll(
                "circle:not([class*='movable-point'])",
            );

            // Assert
            expect(points[0]).toHaveStyle({
                fill: lockedFigureColors.green,
                stroke: lockedFigureColors.green,
            });
            expect(points[1]).toHaveStyle({
                fill: lockedFigureColors.green,
                stroke: lockedFigureColors.green,
            });
        });

        it("should render locked point with aria label when one is provided", () => {
            // Arrange
            const lockedPointWithAriaLabelQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedPointAt(0, 0, {
                        ariaLabel: "Point A",
                    })
                    .build();
            const {container} = renderQuestion(
                lockedPointWithAriaLabelQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-point");

            // Assert
            expect(point).toHaveAttribute("aria-label", "Point A");
        });

        it("should render locked points without aria label by default", () => {
            // Arrange
            const simpleLockedPointQuestion = interactiveGraphQuestionBuilder()
                .addLockedPointAt(0, 0)
                .build();
            const {container} = renderQuestion(
                simpleLockedPointQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-point");

            // Assert
            expect(point).not.toHaveAttribute("aria-label");
        });

        it("should render locked lines", () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedLineQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const lines = container.querySelectorAll(".locked-line");
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const rays = container.querySelectorAll(".locked-ray");

            // Assert
            expect(lines).toHaveLength(2);
            expect(rays).toHaveLength(1);
        });

        it("should render locked lines with styles", () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedLineQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const lines = container.querySelectorAll(".locked-line line");
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const ray = container.querySelector(".locked-ray g");

            // Assert
            expect(lines).toHaveLength(2);
            expect(lines[0]).toHaveStyle({stroke: lockedFigureColors.green});
            expect(lines[1]).toHaveStyle({stroke: lockedFigureColors.grayH});
            expect(ray).toHaveStyle({stroke: lockedFigureColors.pink});
        });

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] satisfies {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "Line (kind: line) should render with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .withMarkings("none")
                        .addLockedLine([0, 0], [0, 1], {
                            weight,
                            kind: "line",
                        })
                        .build(),
                    blankOptions,
                );

                // Act
                const lines =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(`.locked-line line`);

                const arrowheads =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(
                        `.interactive-graph-arrowhead path`,
                    );

                // Assert
                expect(lines).toHaveLength(1);
                expect(arrowheads).toHaveLength(2);
                expect(lines[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}`,
                );
                expect(arrowheads[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}px`,
                );
                expect(arrowheads[1]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}px`,
                );
            },
        );

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] satisfies {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "Line (kind: segment) should render with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .withMarkings("none")
                        .addLockedLine([0, 0], [0, 1], {
                            weight,
                            kind: "segment",
                        })
                        .build(),
                    blankOptions,
                );

                // Act
                const lines =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(`.locked-line line`);

                // Assert
                expect(lines).toHaveLength(1);
                expect(lines[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}`,
                );
            },
        );

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] satisfies {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "Line (kind: ray) should render with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .addLockedLine([0, 0], [0, 1], {
                            weight,
                            kind: "ray",
                        })
                        .build(),
                    blankOptions,
                );

                // Act
                const lines =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(`.locked-ray > g`);

                // Assert
                expect(lines).toHaveLength(1);
                expect(lines[0]).toHaveStyle({
                    "stroke-width": expectedStrokeWidth,
                });
            },
        );

        it("should render locked lines with shown points", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedLineQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const linePoints = container.querySelectorAll(
                ".locked-line circle",
            );
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const rayPoints = container.querySelectorAll(".locked-ray circle");

            // Assert
            expect(linePoints).toHaveLength(4);
            // Two points for each line
            expect(linePoints[0]).toHaveStyle({
                fill: lockedFigureColors.green,
                stroke: lockedFigureColors.green,
            });
            expect(linePoints[1]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.green,
            });
            expect(linePoints[2]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.grayH,
            });
            expect(linePoints[3]).toHaveStyle({
                fill: lockedFigureColors.grayH,
                stroke: lockedFigureColors.grayH,
            });
            expect(rayPoints[0]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.pink,
            });
        });

        it("should render locked line with aria label when one is provided", () => {
            // Arrange
            const lockedLineWithAriaLabelQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedLine([0, 0], [2, 2], {
                        ariaLabel: "Line A",
                    })
                    .build();
            const {container} = renderQuestion(
                lockedLineWithAriaLabelQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-line");

            // Assert
            expect(point).toHaveAttribute("aria-label", "Line A");
        });

        it("should render locked line without aria label by default", () => {
            // Arrange
            const simpleLockedLinequestion = interactiveGraphQuestionBuilder()
                .addLockedLine([0, 0], [2, 2])
                .build();
            const {container} = renderQuestion(
                simpleLockedLinequestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-line");

            // Assert
            expect(point).not.toHaveAttribute("aria-label");
        });

        it("should render locked vectors", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedVectors,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const vectors = container.querySelectorAll(".locked-vector");

            // Assert
            expect(vectors).toHaveLength(2);
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            let vector = vectors[0].children[0];
            expect(vector).toHaveStyle({
                "stroke-width": "2",
                stroke: lockedFigureColors["grayH"],
            });
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            let arrowheads = vector.querySelectorAll(
                ".interactive-graph-arrowhead",
            );
            expect(arrowheads).toHaveLength(1);
            // Arrowhead should be at the end (tip) of the vector, and rotated
            expect(arrowheads[0]).toHaveAttribute(
                "transform",
                "translate(40 -40) rotate(-45)",
            );

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            vector = vectors[1].children[0];
            expect(vector).toHaveStyle({
                "stroke-width": "2",
                stroke: lockedFigureColors["green"],
            });
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            arrowheads = vector.querySelectorAll(
                ".interactive-graph-arrowhead",
            );
            expect(arrowheads).toHaveLength(1);
            expect(arrowheads[0]).toHaveAttribute(
                "transform",
                "translate(-40 -80) rotate(-153.43494882292202)",
            );
        });

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] satisfies {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "Vector should render with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .withMarkings("none")
                        .addLockedVector([0, 0], [0, 1], {
                            weight,
                        })
                        .build(),
                    blankOptions,
                );

                // Act
                const lines =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(`.locked-vector > g`);

                const arrowheads =
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelectorAll(
                        `.interactive-graph-arrowhead path`,
                    );

                // Assert
                expect(lines).toHaveLength(1);
                expect(arrowheads).toHaveLength(1);
                expect(lines[0]).toHaveStyle({
                    "stroke-width": expectedStrokeWidth,
                });
                expect(arrowheads[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}px`,
                );
            },
        );

        it("should render locked vector with aria label when one is provided", () => {
            // Arrange
            const lockedVectorWithAriaLabelQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedVector([0, 0], [2, 2], {
                        ariaLabel: "Vector A",
                    })
                    .build();
            const {container} = renderQuestion(
                lockedVectorWithAriaLabelQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-vector");

            // Assert
            expect(point).toHaveAttribute("aria-label", "Vector A");
        });

        it("should render locked vector without aria label by default", () => {
            // Arrange
            const simpleLockedVectorquestion = interactiveGraphQuestionBuilder()
                .addLockedVector([0, 0], [2, 2])
                .build();
            const {container} = renderQuestion(
                simpleLockedVectorquestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-vector");

            // Assert
            expect(point).not.toHaveAttribute("aria-label");
        });

        it("should render locked ellipses", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedEllipses,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const circles = container.querySelectorAll("ellipse");

            // Assert
            expect(circles).toHaveLength(3);
            expect(circles[0]).toHaveStyle({
                "fill-opacity": "0",
                stroke: lockedFigureColors["grayH"],
            });
            expect(circles[1]).toHaveStyle({
                "fill-opacity": "1",
                stroke: lockedFigureColors["green"],
            });
            expect(circles[2]).toHaveStyle({
                "fill-opacity": "0.4",
                stroke: lockedFigureColors["green"],
            });
        });

        it("should render locked ellipses with white fill", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedEllipseWhite,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const circles = container.querySelectorAll("ellipse");
            const whiteCircle = circles[0];
            const translucentCircle = circles[1];

            // Assert
            expect(whiteCircle).toHaveStyle({
                "fill-opacity": 1,
                fill: wbColor.white,
                stroke: lockedFigureColors["green"],
            });
            expect(translucentCircle).toHaveStyle({
                "fill-opacity": "0.4",
                fill: lockedFigureColors["pink"],
                stroke: lockedFigureColors["pink"],
            });
        });

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] satisfies {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "Locked ellipse should render with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .withMarkings("none")
                        .addLockedEllipse([0, 0], [1, 1], {
                            weight,
                        })
                        .build(),
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const circles = container.querySelectorAll("ellipse");

                // Assert
                expect(circles).toHaveLength(1);
                expect(circles[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}`,
                );
            },
        );

        it("should render locked ellipse with aria label when one is provided", () => {
            // Arrange
            const lockedEllipseWithAriaLabelQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedEllipse([0, 0], [2, 2], {
                        ariaLabel: "Ellipse A",
                    })
                    .build();
            const {container} = renderQuestion(
                lockedEllipseWithAriaLabelQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-ellipse");

            // Assert
            expect(point).toHaveAttribute("aria-label", "Ellipse A");
        });

        it("should render locked ellipse without aria label by default", () => {
            // Arrange
            const simpleLockedEllipsequestion =
                interactiveGraphQuestionBuilder()
                    .addLockedEllipse([0, 0], [2, 2])
                    .build();
            const {container} = renderQuestion(
                simpleLockedEllipsequestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const point = container.querySelector(".locked-ellipse");

            // Assert
            expect(point).not.toHaveAttribute("aria-label");
        });

        it("should render locked polygons with style", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPolygons,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const polygons = container.querySelectorAll(
                ".locked-polygon polygon",
            );

            // Assert
            expect(polygons).toHaveLength(3);
            expect(polygons[0]).toHaveStyle({
                "fill-opacity": "0",
                stroke: lockedFigureColors["grayH"],
            });
            expect(polygons[1]).toHaveStyle({
                "fill-opacity": "0.4",
                stroke: lockedFigureColors["green"],
            });
            expect(polygons[2]).toHaveStyle({
                "fill-opacity": "1",
                stroke: lockedFigureColors["purple"],
            });
        });

        it.each([
            {weight: "thin", expectedStrokeWidth: 1},
            {weight: "medium", expectedStrokeWidth: 2},
            {weight: "thick", expectedStrokeWidth: 4},
        ] as {
            weight: StrokeWeight;
            expectedStrokeWidth: number;
        }[])(
            "should render locked polygons with specific weight",
            ({weight, expectedStrokeWidth}) => {
                // Arrange
                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .addLockedPolygon(
                            [
                                [0, 0],
                                [0, 1],
                                [1, 1],
                            ],
                            {weight: weight},
                        )
                        .build(),
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const polygons = container.querySelectorAll(
                    ".locked-polygon polygon",
                );

                // Assert
                expect(polygons).toHaveLength(1);
                expect(polygons[0]).toHaveAttribute(
                    "stroke-width",
                    `${expectedStrokeWidth}`,
                );
            },
        );

        it("should render locked polygons with white fill", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPolygonWhite,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const polygons = container.querySelectorAll(
                ".locked-polygon polygon",
            );
            const whitePolygon = polygons[0];
            const translucentPolygon = polygons[1];

            // Assert
            expect(whitePolygon).toHaveStyle({
                "fill-opacity": 1,
                fill: wbColor.white,
                stroke: lockedFigureColors["green"],
            });
            expect(translucentPolygon).toHaveStyle({
                "fill-opacity": "0.4",
                fill: lockedFigureColors["pink"],
                stroke: lockedFigureColors["pink"],
            });
        });

        it("should render vertices of locked polygons with showVertices", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedPolygons,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const polygonVertices = container.querySelectorAll(
                ".locked-polygon circle",
            );

            // Assert
            // There should be 4 vertices on the square polygon
            expect(polygonVertices).toHaveLength(4);

            // The square polygon is green
            expect(polygonVertices[0]).toHaveStyle({
                fill: lockedFigureColors["green"],
            });
            expect(polygonVertices[1]).toHaveStyle({
                fill: lockedFigureColors["green"],
            });
            expect(polygonVertices[2]).toHaveStyle({
                fill: lockedFigureColors["green"],
            });
            expect(polygonVertices[3]).toHaveStyle({
                fill: lockedFigureColors["green"],
            });
        });

        it("should render a locked label within a locked polygon", async () => {
            // Arrange
            const {container} = renderQuestion(
                graphWithLabeledPolygon,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("E");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "200px",
                top: "200px",
            });
        });

        it("should render locked polygon with aria label when one is provided", () => {
            // Arrange
            const lockedPolygonWithAriaLabelQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedPolygon(
                        [
                            [0, 0],
                            [0, 1],
                            [1, 1],
                        ],
                        {
                            ariaLabel: "Polygon A",
                        },
                    )
                    .build();
            const {container} = renderQuestion(
                lockedPolygonWithAriaLabelQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const polygon = container.querySelector(".locked-polygon");

            // Assert
            expect(polygon).toHaveAttribute("aria-label", "Polygon A");
        });

        it("should render locked polygon without aria label by default", () => {
            // Arrange
            const simpleLockedPolygonQuestion =
                interactiveGraphQuestionBuilder()
                    .addLockedPolygon([
                        [0, 0],
                        [0, 1],
                        [1, 1],
                    ])
                    .build();
            const {container} = renderQuestion(
                simpleLockedPolygonQuestion,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const polygon = container.querySelector(".locked-polygon");

            // Assert
            expect(polygon).not.toHaveAttribute("aria-label");
        });

        describe("Locked Functions", () => {
            it("should NOT render when an invalid equation is specified", () => {
                // Arrange
                const {container} = renderQuestion(
                    segmentWithLockedFunction("x^"),
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const functionPlots = container.querySelectorAll(
                    ".locked-function path",
                );

                // Assert
                expect(functionPlots).toHaveLength(0);
            });

            it("should render locked function with style", () => {
                // Arrange
                const {container} = renderQuestion(
                    segmentWithLockedFunction("x^2", {
                        color: "green",
                        strokeStyle: "dashed",
                    }),
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const functionPlots = container.querySelectorAll(
                    ".locked-function path",
                );

                // Assert
                expect(functionPlots).toHaveLength(1);
                expect(functionPlots[0]).toHaveStyle({
                    "stroke-dasharray": "var(--mafs-line-stroke-dash-style)",
                    stroke: lockedFigureColors["green"],
                });
            });

            it("plots the supplied equation on the axis specified", () => {
                // Arrange
                const PlotOfXMock = jest
                    .spyOn(Plot, "OfX")
                    .mockReturnValue(<div>OfX</div>);
                const PlotOfYMock = jest
                    .spyOn(Plot, "OfY")
                    .mockReturnValue(<div>OfY</div>);

                // Act - Render f(x)
                renderQuestion(segmentWithLockedFunction("x^2"), blankOptions);

                // Assert
                expect(PlotOfXMock).toHaveBeenCalledTimes(1);
                expect(PlotOfYMock).toHaveBeenCalledTimes(0);

                // Arrange - reset mocks
                PlotOfXMock.mockClear();

                // Act - Render f(y)
                renderQuestion(
                    segmentWithLockedFunction("x^2", {
                        directionalAxis: "y",
                    }),
                    blankOptions,
                );

                // Assert
                expect(PlotOfXMock).toHaveBeenCalledTimes(0);
                expect(PlotOfYMock).toHaveBeenCalledTimes(1);
            });

            it("plots the equation with any supplied domain", () => {
                // Arrange
                const PlotOfXMock = jest
                    .spyOn(Plot, "OfX")
                    .mockReturnValue(<div>OfX</div>);
                const expectedParameters = {
                    color: "#3B3D45",
                    domain: [-2, 3],
                    style: "solid",
                };

                // Act
                renderQuestion(
                    segmentWithLockedFunction("x^2", {domain: [-2, 3]}),
                    blankOptions,
                );

                // Assert
                expect(PlotOfXMock).toHaveBeenCalledTimes(1);
                expect(PlotOfXMock).toHaveBeenCalledWith(
                    expect.objectContaining(expectedParameters),
                    {},
                );
            });

            it.each([
                {weight: "thin", expectedStrokeWidth: 1},
                {weight: "medium", expectedStrokeWidth: 2},
                {weight: "thick", expectedStrokeWidth: 4},
            ] satisfies {
                weight: StrokeWeight;
                expectedStrokeWidth: number;
            }[])(
                "Locked function should render with specific weight",
                ({weight, expectedStrokeWidth}) => {
                    // Arrange
                    const {container} = renderQuestion(
                        interactiveGraphQuestionBuilder()
                            .withMarkings("none")
                            .addLockedFunction("x^2", {
                                weight,
                            })
                            .build(),
                        blankOptions,
                    );

                    // Act
                    const functions =
                        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                        container.querySelectorAll(`.locked-function > path`);

                    // Assert
                    expect(functions).toHaveLength(1);
                    expect(functions[0]).toHaveAttribute(
                        "stroke-width",
                        `${expectedStrokeWidth}`,
                    );
                },
            );

            it("should render locked function with aria label when one is provided", () => {
                // Arrange
                const lockedFunctionWithAriaLabelQuestion =
                    interactiveGraphQuestionBuilder()
                        .addLockedFunction("x^2", {
                            ariaLabel: "Function A",
                        })
                        .build();
                const {container} = renderQuestion(
                    lockedFunctionWithAriaLabelQuestion,
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const point = container.querySelector(".locked-function");

                // Assert
                expect(point).toHaveAttribute("aria-label", "Function A");
            });

            it("should render locked function without aria label by default", () => {
                // Arrange
                const simpleLockedFunctionquestion =
                    interactiveGraphQuestionBuilder()
                        .addLockedFunction("x^2")
                        .build();
                const {container} = renderQuestion(
                    simpleLockedFunctionquestion,
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const point = container.querySelector(".locked-function");

                // Assert
                expect(point).not.toHaveAttribute("aria-label");
            });
        });

        it("should render locked labels", async () => {
            // Arrange
            const {container} = renderQuestion(
                segmentWithLockedLabels,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");

            // Assert
            expect(labels).toHaveLength(3);

            // content
            expect(labels[0]).toHaveTextContent("\\text{small $\\frac{1}{2}$}");
            expect(labels[1]).toHaveTextContent("\\text{medium $E_0 = mc^2$}");
            expect(labels[2]).toHaveTextContent("\\text{large $\\sqrt{2a}$}");

            // styles
            expect(labels[0]).toHaveStyle({
                color: lockedFigureColors["pink"],
                fontSize: "var(--wb-font-size-small)",
                left: "80px",
                top: "160px",
            });
            expect(labels[1]).toHaveStyle({
                color: lockedFigureColors["blue"],
                fontSize: "var(--wb-font-size-medium)",
                left: "220px",
                top: "160px",
            });
            expect(labels[2]).toHaveStyle({
                color: lockedFigureColors["green"],
                fontSize: "var(--wb-font-size-large)",
                left: "140px",
                top: "240px",
            });
        });

        it("should render a locked label within a locked point", async () => {
            // Arrange
            const {container} = renderQuestion(
                graphWithLabeledPoint,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("A");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "210px",
                top: "200px",
            });
        });

        it("should render a locked label within a locked line", async () => {
            const {container} = renderQuestion(
                graphWithLabeledLine,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("B");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "150px",
                top: "280px",
            });
        });

        it("should render a locked label within a locked point within a locked line", async () => {
            const question = {...graphWithLabeledLine};
            invariant(
                question.widgets["interactive-graph 1"].options.lockedFigures[0]
                    ?.type === "line",
            );
            question.widgets[
                "interactive-graph 1"
            ].options.lockedFigures[0].points = [
                {
                    ...getDefaultFigureForType("point"),
                    labels: [
                        {...getDefaultFigureForType("label"), text: "point A"},
                    ],
                },
                {
                    ...getDefaultFigureForType("point"),
                    labels: [
                        {...getDefaultFigureForType("label"), text: "point B"},
                    ],
                },
            ];
            const {container} = renderQuestion(
                graphWithLabeledLine,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const lineLabel = labels[0];
            const point1Label = labels[1];
            const point2Label = labels[2];

            // Assert
            expect(labels).toHaveLength(3);
            expect(lineLabel).toHaveTextContent("B");
            expect(point1Label).toHaveTextContent("point A");
            expect(point2Label).toHaveTextContent("point B");
        });

        it("should render a locked label within a locked vector", async () => {
            // Arrange
            const {container} = renderQuestion(
                graphWithLabeledVector,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("C");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "280px",
                top: "180px",
            });
        });

        it("should render a locked label within a locked ellipse", async () => {
            // Arrange
            const {container} = renderQuestion(
                graphWithLabeledEllipse,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("D");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "200px",
                top: "200px",
            });
        });

        it("should render a locked label within a locked function", async () => {
            // Arrange
            const {container} = renderQuestion(
                graphWithLabeledFunction,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const labels = container.querySelectorAll(".locked-label");
            const label = labels[0];

            // Assert
            expect(labels).toHaveLength(1);
            expect(label).toHaveTextContent("F");
            expect(label).toHaveStyle({
                color: lockedFigureColors["grayH"],
                fontSize: "var(--wb-font-size-medium)",
                left: "200px",
                top: "200px",
            });
        });

        it("should have an aria-label and description if they are provided", async () => {
            // Arrange
            const {container} = renderQuestion(
                interactiveGraphWithAriaLabel,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const graph = container.querySelector(".mafs-graph");

            // Assert
            expect(graph).toHaveAttribute("aria-label", "Segment Graph Title");
            // The aria-describedby attribute is set to the description
            // element's ID. This ID is unique to the graph instance, so
            // we can't predict it in this test.
            expect(graph).toHaveAttribute("aria-describedby");
        });

        it("should not have an aria-label or description if they are not provided", async () => {
            // Arrange
            const {container} = renderQuestion(noneQuestion, blankOptions);

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const graph = container.querySelector(".mafs-graph");

            // Assert
            expect(graph).not.toHaveAttribute("aria-label");
            expect(graph).not.toHaveAttribute("aria-describedby");
        });
    });

    describe("interactive graph screen reader", () => {
        const limitedGraphQuestionRenderers: {
            [K in PerseusGraphType["type"][number]]: PerseusRenderer;
        } = {
            angle: angleQuestion,
            segment: segmentQuestion,
            linear: linearQuestion,
            "linear-system": linearSystemQuestion,
            ray: rayQuestion,
            polygon: polygonQuestion,
            point: finitePointQuestion,
            circle: circleQuestion,
            quadratic: quadraticQuestion,
            // TODO(LEMS-2484): Uncomment this when sinusoid graph has
            // screen reader support is finished.
            // sinusoid: sinusoidQuestion,
        };
        const unlimitedGraphQuestionRenderers: {
            [K in PerseusGraphType["type"][number]]: PerseusRenderer;
        } = {
            "unlimited-point": unlimitedPointQuestion,
            "unlimited-polygon": unlimitedPolygonQuestion,
        };

        it.each(Object.entries(limitedGraphQuestionRenderers))(
            "graph type %s has SR instructions for interacting with the graph",
            (_type, question) => {
                const {container} = renderQuestion(question, blankOptions);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const graph = container.querySelector(".mafs-graph");

                expect(graph).toHaveTextContent(commonInstructions);
            },
        );

        it.each(Object.entries(unlimitedGraphQuestionRenderers))(
            "graph type %s has SR instructions for interacting with the graph",
            (_type, question) => {
                const {container} = renderQuestion(question, blankOptions);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const graph = container.querySelector(".mafs-graph");

                expect(graph).toHaveTextContent(unlimitedInstructions);
            },
        );

        it("none graph type should not include instructions for interacting with the graph", () => {
            const {container} = renderQuestion(noneQuestion, blankOptions);

            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const graph = container.querySelector(".mafs-graph");

            expect(graph).not.toHaveTextContent(commonInstructions);
            expect(graph).not.toHaveTextContent(unlimitedInstructions);
        });
    });

    describe("axis labels", () => {
        test("should render x axis labels as multiples of pi if the tick step is a multiple of pi", () => {
            // Arrange
            const {container} = renderQuestion(
                sinusoidWithPiTicks,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const xAxisLabels = container.querySelectorAll(
                ".x-axis-ticks > .tick",
            );

            // Assert
            // The first label is π
            expect(xAxisLabels[0]).toHaveTextContent("π");

            // There are four more labels in the positive direction
            for (let i = 0; i < 4; i++) {
                expect(xAxisLabels[i + 1]).toHaveTextContent(`${i + 2}π`);
            }

            // First label in the negative direction is -π
            expect(xAxisLabels[5]).toHaveTextContent("-π");

            // There are four more labels in the negative direction
            for (let i = 0; i < 4; i++) {
                expect(xAxisLabels[i + 6]).toHaveTextContent(`-${i + 2}π`);
            }
        });

        test("should render y axis labels as multiples of pi if the tick step is a multiple of pi", () => {
            // Arrange
            const {container} = renderQuestion(
                sinusoidWithPiTicks,
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const yAxisLabels = container.querySelectorAll(
                ".y-axis-ticks > .tick",
            );

            // Assert
            // The first label is 2π
            expect(yAxisLabels[0]).toHaveTextContent("2π");

            // There are three more labels in the positive direction,
            // increasing by 2π each time.
            for (let i = 1; i < 4; i++) {
                expect(yAxisLabels[i]).toHaveTextContent(`${2 + 2 * i}π`);
            }

            // First label in the negative direction is empty
            // to make room for the x axis labels (in place of -2π).
            expect(yAxisLabels[4]).toHaveTextContent("");

            // There are three more labels in the negative direction,
            // decreasing by 2π each time.
            for (let i = 1; i < 4; i++) {
                expect(yAxisLabels[i + 4]).toHaveTextContent(`-${2 + 2 * i}π`);
            }
        });
    });

    describe("axis arrows", () => {
        it("should render all four axis arrows by default", () => {
            // Arrange
            const {container} = renderQuestion(
                interactiveGraphQuestionBuilder()
                    .withNoInteractiveFigure()
                    .build(),
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const axisArrows = container.querySelectorAll(
                ".interactive-graph-arrowhead",
            );

            // Assert
            expect(axisArrows).toHaveLength(4);
        });

        it("should render none four axis arrows by default when specified", () => {
            // Arrange
            const {container} = renderQuestion(
                interactiveGraphQuestionBuilder()
                    .withNoInteractiveFigure()
                    .withShowAxisArrows({
                        xMin: false,
                        xMax: false,
                        yMin: false,
                        yMax: false,
                    })
                    .build(),
                blankOptions,
            );

            // Act
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const axisArrows = container.querySelectorAll(
                ".interactive-graph-arrowhead",
            );

            // Assert
            expect(axisArrows).toHaveLength(0);
        });

        it.each([
            {
                arrowSide: "xMin",
                transform: "translate(-200 0) rotate(180)",
            }, // x min, points left
            {
                arrowSide: "xMax",
                transform: "translate(200 0) rotate(0)",
            }, // x max, points right
            {
                arrowSide: "yMin",
                transform: "translate(0 200) rotate(90)",
            }, // y min, points down
            {
                arrowSide: "yMax",
                transform: "translate(0 -200) rotate(270)",
            }, // y max, points up
        ] satisfies {
            arrowSide: "xMin" | "xMax" | "yMin" | "yMax";
            transform: string;
        }[])(
            "should render the correct axis arrow when showAxisArrows is set",
            ({arrowSide, transform}) => {
                // Arrange
                const showAxisArrows: ShowAxisArrows = {
                    xMin: false,
                    xMax: false,
                    yMin: false,
                    yMax: false,
                };
                showAxisArrows[arrowSide] = true;

                const {container} = renderQuestion(
                    interactiveGraphQuestionBuilder()
                        .withNoInteractiveFigure()
                        .withShowAxisArrows(showAxisArrows)
                        .build(),
                    blankOptions,
                );

                // Act
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const axisArrows = container.querySelectorAll(
                    ".interactive-graph-arrowhead",
                );

                // Assert
                expect(axisArrows).toHaveLength(1);
                expect(axisArrows[0]).toHaveAttribute("transform", transform);
            },
        );
    });
});
