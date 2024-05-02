import {describe, beforeEach, it} from "@jest/globals";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {clone} from "../../../../../testing/object-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {lockedFigureColors} from "../../perseus-types";
import {
    circleQuestion,
    circleQuestionWithDefaultCorrect,
    linearQuestion,
    linearQuestionWithDefaultCorrect,
    linearSystemQuestion,
    linearSystemQuestionWithDefaultCorrect,
    pointQuestion,
    pointQuestionWithDefaultCorrect,
    polygonQuestion,
    polygonQuestionDefaultCorrect,
    questionsAndAnswers,
    rayQuestion,
    rayQuestionWithDefaultCorrect,
    segmentQuestion,
    segmentQuestionDefaultCorrect,
    segmentWithLockedLineQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedPointsWithColorQuestion,
} from "../__testdata__/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";

import {renderQuestion} from "./renderQuestion";

import type {Coord} from "../../interactive2/types";
import type {PerseusRenderer} from "../../perseus-types";
import type Renderer from "../../renderer";
import type {APIOptions} from "../../types";
import type {mafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";
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
            it("Should accept the right answer", () => {
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
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = correct),
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
            });

            it("Shoud render predictably", () => {
                // Arrange
                const {renderer, container} = renderQuestion(
                    question,
                    blankOptions,
                );
                expect(container).toMatchSnapshot("first render");

                // Act
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = correct),
                );

                // Assert
                expect(container).toMatchSnapshot("after interaction");
            });

            it("should reject no interaction", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                // no action

                // Assert
                expect(renderer).toHaveInvalidInput();
            });

            it("should reject an incorrect answer", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = incorrect),
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredIncorrectly();
            });
        },
    );
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
        segment: segmentQuestion,
        linear: linearQuestion,
        "linear-system": linearSystemQuestion,
        ray: rayQuestion,
        polygon: polygonQuestion,
        point: pointQuestion,
        circle: circleQuestion,
    };

    const graphQuestionRenderersCorrect: {
        [K in (typeof mafsSupportedGraphTypes)[number]]: PerseusRenderer;
    } = {
        segment: segmentQuestionDefaultCorrect,
        linear: linearQuestionWithDefaultCorrect,
        "linear-system": linearSystemQuestionWithDefaultCorrect,
        ray: rayQuestionWithDefaultCorrect,
        polygon: polygonQuestionDefaultCorrect,
        point: pointQuestionWithDefaultCorrect,
        circle: circleQuestionWithDefaultCorrect,
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

            it("rejects incorrect answer", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard( "{arrowup}{arrowright}");

                // Assert
                await waitFor(() => {
                    expect(renderer).toHaveBeenAnsweredIncorrectly();
                });
            });

            it("accepts correct answer", async () => {
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(() => {
                    expect(renderer).toHaveBeenAnsweredCorrectly();
                });
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

        test("should render locked points with styles", async () => {
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
                fill: lockedFigureColors.green,
                stroke: lockedFigureColors.green,
            });
            expect(points[1]).toHaveStyle({
                fill: wbColor.white,
                stroke: lockedFigureColors.green,
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

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "[data-testid=movable-point__focusable-handle]",
        );
        expect(movablePoints[0]).toHaveFocus();
    });

    it("focuses the whole segment second", async () => {
        const {container} = renderQuestion(segmentQuestion, {
            flags: {mafs: {segment: true}},
        });

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

    test("should render locked points with styles when color is not specified", async () => {
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
            fill: lockedFigureColors.green,
            stroke: lockedFigureColors.green,
        });
        expect(points[1]).toHaveStyle({
            fill: wbColor.white,
            stroke: lockedFigureColors.green,
        });
    });

    test("should render locked points with styles when color is specified", async () => {
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

    test("should render locked lines", () => {
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

    test("should render locked lines with styles", () => {
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

    test("should render locked lines with shown points", async () => {
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
});

describe("snapshots", () => {
    test("should render correctly", () => {
        const {container} = renderQuestion(segmentQuestionDefaultCorrect, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        expect(container).toMatchSnapshot();
    });

    test("should render correctly with locked points", () => {
        const {container} = renderQuestion(segmentWithLockedPointsQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        expect(container).toMatchSnapshot();
    });

    test("should render correctly with locked lines", () => {
        const {container} = renderQuestion(segmentWithLockedLineQuestion, {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });

        expect(container).toMatchSnapshot();
    });
});
