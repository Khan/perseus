import {describe, beforeEach, it} from "@jest/globals";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {act, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Plot} from "mafs";
import * as React from "react";
import invariant from "tiny-invariant";

import {clone} from "../../../../../testing/object-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../../../../testing/wait";
import {getDefaultFigureForType} from "../../../../perseus-editor/src/widgets/interactive-graph-editor/locked-figures/util";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {lockedFigureColors} from "../../perseus-types";
import {renderQuestion} from "../__testutils__/renderQuestion";
import {sinusoidQuestion} from "../grapher/grapher.testdata";

import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";
import {
    angleQuestion,
    angleQuestionWithDefaultCorrect,
    circleQuestion,
    circleQuestionWithDefaultCorrect,
    graphWithLabeledEllipse,
    graphWithLabeledFunction,
    graphWithLabeledLine,
    graphWithLabeledPoint,
    graphWithLabeledVector,
    interactiveGraphWithAriaLabel,
    linearQuestion,
    linearQuestionWithDefaultCorrect,
    linearSystemQuestion,
    linearSystemQuestionWithDefaultCorrect,
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
} from "./interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "./mafs-supported-graph-types";

import type {mafsSupportedGraphTypes} from "./mafs-supported-graph-types";
import type {Coord} from "../../interactive2/types";
import type {PerseusRenderer} from "../../perseus-types";
import type Renderer from "../../renderer";
import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

const updateWidgetState = (renderer: Renderer, widgetId: string, update) => {
    const state = clone(renderer.getSerializedState());
    update(state[widgetId]);
    renderer.restoreSerializedState(state);
};

const blankOptions: APIOptions = Object.freeze(ApiOptions.defaults);

describe("interactive-graph widget", function () {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
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
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                // NOTE: This isn't acting on the UI as a user would, which is
                // a weakness of these tests. Because this widget is designed for
                // pointer-dragging, jsdom (which doesn't support getBoundingClientRect
                // or other position-based node attributes) is insufficient to model
                // drag & drop behavior.
                // We'll want to use cypress tests or similar to ensure this widget
                // works as expected.
                act(() =>
                    updateWidgetState(
                        renderer,
                        "interactive-graph 1",
                        (state) => (state.graph.coords = correct),
                    ),
                );
                await waitForInitialGraphieRender();

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
            });

            it("Should render predictably", async () => {
                // Arrange
                const {renderer, container} = renderQuestion(
                    question,
                    blankOptions,
                );
                expect(container).toMatchSnapshot("first render");

                // Act
                act(() =>
                    updateWidgetState(
                        renderer,
                        "interactive-graph 1",
                        (state) => (state.graph.coords = correct),
                    ),
                );
                await waitForInitialGraphieRender();

                // Assert
                expect(container).toMatchSnapshot("after interaction");
            });

            it("should reject no interaction", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                await waitForInitialGraphieRender();

                // Assert
                expect(renderer).toHaveInvalidInput();
            });

            it("should reject an incorrect answer", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                act(() =>
                    updateWidgetState(
                        renderer,
                        "interactive-graph 1",
                        (state) => (state.graph.coords = incorrect),
                    ),
                );
                await waitForInitialGraphieRender();

                // Assert
                expect(renderer).toHaveBeenAnsweredIncorrectly();
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

            expect(renderer).toHaveBeenAnsweredCorrectly();
        });
    });
});

describe("a mafs graph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    // Add types to this array as you test them
    const apiOptions = {
        flags: {mafs: trueForAllMafsSupportedGraphTypes},
    };

    const graphQuestionRenderers: {
        [K in (typeof mafsSupportedGraphTypes)[number]]: PerseusRenderer;
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
    };

    const graphQuestionRenderersCorrect: {
        [K in (typeof mafsSupportedGraphTypes)[number]]: PerseusRenderer;
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
    };

    describe.each(Object.entries(graphQuestionRenderers))(
        "graph type %s",
        (_type, question) => {
            it("should render", () => {
                renderQuestion(question, apiOptions);
            });

            it("should reject when has not been interacted with", () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                // Act
                // no action

                // Assert
                expect(renderer).toHaveInvalidInput();
            });
        },
    );

    describe.each(Object.entries(graphQuestionRenderersCorrect))(
        "graph type %s: default correct",
        (_type, question) => {
            it("should render", () => {
                renderQuestion(question, apiOptions);
            });

            // TODO(jeremy): This test is disabled because it fails
            // sporadically (especially on slower/lower-end computers, like
            // CI). Will work on a fix after the React 18 release.
            it.skip("rejects incorrect answer", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowright}");

                // Assert
                await waitFor(
                    () => {
                        expect(renderer).toHaveBeenAnsweredIncorrectly();
                    },
                    {timeout: 5000},
                );
            });

            // TODO(jeremy): This test is disabled because it fails
            // sporadically (especially on slower/lower-end computers, like
            // CI). Will work on a fix after the React 18 release.
            it.skip("accepts correct answer", async () => {
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(
                    () => {
                        expect(renderer).toHaveBeenAnsweredCorrectly();
                    },
                    {timeout: 5000},
                );
            });

            it("is marked invalid when readOnly set to true", async () => {
                const {renderer} = renderQuestion(question, {
                    ...apiOptions,
                    readOnly: true,
                });

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(
                    () => {
                        expect(renderer).toHaveInvalidInput();
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
                apiOptions,
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
                apiOptions,
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
});

describe("tabbing forward on a Mafs segment graph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("focuses the first endpoint of a segment first", async () => {
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

        await userEvent.tab();
        await userEvent.tab();

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "[data-testid=movable-point__focusable-handle]",
        );
        expect(movablePoints[0]).toHaveFocus();
    });

    it("focuses the whole segment third", async () => {
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

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
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

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

describe("tabbing backward on a Mafs segment graph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("moves focus from the last point to the whole segment", async () => {
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

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
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

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
    const apiOptions = {flags: {mafs: {segment: true}}};
    it("should render locked points", async () => {
        // Arrange
        const {container} = renderQuestion(
            segmentWithLockedPointsQuestion,
            apiOptions,
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
            apiOptions,
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
            {
                flags: {
                    mafs: {
                        segment: true,
                    },
                },
            },
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
        const {container} = renderQuestion(lockedPointWithAriaLabelQuestion, {
            flags: {
                mafs: {
                    segment: true,
                    "locked-figures-aria": true,
                },
            },
        });

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
        const {container} = renderQuestion(simpleLockedPointQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-point");

        // Assert
        expect(point).not.toHaveAttribute("aria-label");
    });

    it("should render locked lines", () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedLineQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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
        const {container} = renderQuestion(segmentWithLockedLineQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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

    it("should render locked lines with shown points", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedLineQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const linePoints = container.querySelectorAll(".locked-line circle");
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
        const {container} = renderQuestion(lockedLineWithAriaLabelQuestion, {
            flags: {
                mafs: {
                    segment: true,
                    "locked-figures-aria": true,
                },
            },
        });

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
        const {container} = renderQuestion(simpleLockedLinequestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-line");

        // Assert
        expect(point).not.toHaveAttribute("aria-label");
    });

    it("should render locked vectors", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedVectors, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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
        arrowheads = vector.querySelectorAll(".interactive-graph-arrowhead");
        expect(arrowheads).toHaveLength(1);
        expect(arrowheads[0]).toHaveAttribute(
            "transform",
            "translate(-40 -80) rotate(-153.43494882292202)",
        );
    });

    it("should render locked vector with aria label when one is provided", () => {
        // Arrange
        const lockedVectorWithAriaLabelQuestion =
            interactiveGraphQuestionBuilder()
                .addLockedVector([0, 0], [2, 2], {
                    ariaLabel: "Vector A",
                })
                .build();
        const {container} = renderQuestion(lockedVectorWithAriaLabelQuestion, {
            flags: {
                mafs: {
                    segment: true,
                    "locked-figures-aria": true,
                },
            },
        });

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
        const {container} = renderQuestion(simpleLockedVectorquestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-vector");

        // Assert
        expect(point).not.toHaveAttribute("aria-label");
    });

    it("should render locked ellipses", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedEllipses, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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
        const {container} = renderQuestion(segmentWithLockedEllipseWhite, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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

    it("should render locked ellipse with aria label when one is provided", () => {
        // Arrange
        const lockedEllipseWithAriaLabelQuestion =
            interactiveGraphQuestionBuilder()
                .addLockedEllipse([0, 0], [2, 2], {
                    ariaLabel: "Ellipse A",
                })
                .build();
        const {container} = renderQuestion(lockedEllipseWithAriaLabelQuestion, {
            flags: {
                mafs: {
                    segment: true,
                    "locked-figures-aria": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-ellipse");

        // Assert
        expect(point).toHaveAttribute("aria-label", "Ellipse A");
    });

    it("should render locked ellipse without aria label by default", () => {
        // Arrange
        const simpleLockedEllipsequestion = interactiveGraphQuestionBuilder()
            .addLockedEllipse([0, 0], [2, 2])
            .build();
        const {container} = renderQuestion(simpleLockedEllipsequestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-ellipse");

        // Assert
        expect(point).not.toHaveAttribute("aria-label");
    });

    it("should render locked polygons with style", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedPolygons, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const polygons = container.querySelectorAll(".locked-polygon polygon");

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

    it("should render locked polygons with white fill", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedPolygonWhite, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const polygons = container.querySelectorAll(".locked-polygon polygon");
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
        const {container} = renderQuestion(segmentWithLockedPolygons, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

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

    it("should render locked function with style", () => {
        // Arrange
        const {container} = renderQuestion(
            segmentWithLockedFunction("x^2", {
                color: "green",
                strokeStyle: "dashed",
            }),
            {
                flags: {
                    mafs: {
                        segment: true,
                    },
                },
            },
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
        const apiOptions = {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        };
        const PlotOfXMock = jest
            .spyOn(Plot, "OfX")
            .mockReturnValue(<div>OfX</div>);
        const PlotOfYMock = jest
            .spyOn(Plot, "OfY")
            .mockReturnValue(<div>OfY</div>);

        // Act - Render f(x)
        renderQuestion(segmentWithLockedFunction("x^2"), apiOptions);

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
            apiOptions,
        );

        // Assert
        expect(PlotOfXMock).toHaveBeenCalledTimes(0);
        expect(PlotOfYMock).toHaveBeenCalledTimes(1);
    });

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
            {
                flags: {
                    mafs: {
                        segment: true,
                        "locked-figures-aria": true,
                    },
                },
            },
        );

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-function");

        // Assert
        expect(point).toHaveAttribute("aria-label", "Function A");
    });

    it("should render locked function without aria label by default", () => {
        // Arrange
        const simpleLockedFunctionquestion = interactiveGraphQuestionBuilder()
            .addLockedFunction("x^2")
            .build();
        const {container} = renderQuestion(simpleLockedFunctionquestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const point = container.querySelector(".locked-function");

        // Assert
        expect(point).not.toHaveAttribute("aria-label");
    });

    it("should render locked labels", async () => {
        // Arrange
        const {container} = renderQuestion(segmentWithLockedLabels, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");

        // Assert
        expect(labels).toHaveLength(3);

        // content
        expect(labels[0]).toHaveTextContent("small \\frac{1}{2}");
        expect(labels[1]).toHaveTextContent("medium E_0 = mc^2");
        expect(labels[2]).toHaveTextContent("large \\sqrt{2a}");

        // styles
        expect(labels[0]).toHaveStyle({
            color: lockedFigureColors["pink"],
            fontSize: "14px", // small
            left: "80px",
            top: "160px",
        });
        expect(labels[1]).toHaveStyle({
            color: lockedFigureColors["blue"],
            fontSize: "16px", // medium
            left: "220px",
            top: "160px",
        });
        expect(labels[2]).toHaveStyle({
            color: lockedFigureColors["green"],
            fontSize: "20px", // large
            left: "140px",
            top: "240px",
        });
    });

    it("should render a locked label within a locked point", async () => {
        // Arrange
        const {container} = renderQuestion(graphWithLabeledPoint, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-point-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");
        const label = labels[0];

        // Assert
        expect(labels).toHaveLength(1);
        expect(label).toHaveTextContent("A");
        expect(label).toHaveStyle({
            color: lockedFigureColors["grayH"],
            fontSize: "16px",
            left: "210px",
            top: "200px",
        });
    });

    it("should render a locked label within a locked line", async () => {
        const {container} = renderQuestion(graphWithLabeledLine, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-line-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");
        const label = labels[0];

        // Assert
        expect(labels).toHaveLength(1);
        expect(label).toHaveTextContent("B");
        expect(label).toHaveStyle({
            color: lockedFigureColors["grayH"],
            fontSize: "16px",
            left: "150px",
            top: "280px",
        });
    });

    it("should render a locked label within a locked point within a locked line", async () => {
        const question = {...graphWithLabeledLine};
        invariant(
            question.widgets["interactive-graph 1"].options.lockedFigures?.[0]
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
        const {container} = renderQuestion(graphWithLabeledLine, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-line-labels": true,
                    "locked-point-labels": true,
                },
            },
        });

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
        const {container} = renderQuestion(graphWithLabeledVector, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-vector-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");
        const label = labels[0];

        // Assert
        expect(labels).toHaveLength(1);
        expect(label).toHaveTextContent("C");
        expect(label).toHaveStyle({
            color: lockedFigureColors["grayH"],
            fontSize: "16px",
            left: "280px",
            top: "180px",
        });
    });

    it("should render a locked label within a locked ellipse", async () => {
        // Arrange
        const {container} = renderQuestion(graphWithLabeledEllipse, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-ellipse-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");
        const label = labels[0];

        // Assert
        expect(labels).toHaveLength(1);
        expect(label).toHaveTextContent("D");
        expect(label).toHaveStyle({
            color: lockedFigureColors["grayH"],
            fontSize: "16px",
            left: "200px",
            top: "200px",
        });
    });

    it("should render a locked label within a locked function", async () => {
        // Arrange
        const {container} = renderQuestion(graphWithLabeledFunction, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                    "locked-function-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const labels = container.querySelectorAll(".locked-label");
        const label = labels[0];

        // Assert
        expect(labels).toHaveLength(1);
        expect(label).toHaveTextContent("E");
        expect(label).toHaveStyle({
            color: lockedFigureColors["grayH"],
            fontSize: "16px",
            left: "200px",
            top: "200px",
        });
    });

    it("should have an aria-label and description if they are provided", async () => {
        // Arrange
        const {container} = renderQuestion(interactiveGraphWithAriaLabel, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                },
            },
        });

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
        const {container} = renderQuestion(segmentQuestion, {
            flags: {
                mafs: {
                    segment: true,
                    "interactive-graph-locked-features-labels": true,
                },
            },
        });

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const graph = container.querySelector(".mafs-graph");

        // Assert
        expect(graph).not.toHaveAttribute("aria-label");
        expect(graph).not.toHaveAttribute("aria-describedby");
    });
});
