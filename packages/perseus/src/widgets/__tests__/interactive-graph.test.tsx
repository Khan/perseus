import {describe, beforeEach, it} from "@jest/globals";
import * as KAS from "@khanacademy/kas";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Plot} from "mafs";
import * as React from "react";

import {lockedFigureColors} from "../../perseus-types";
import {sinusoidQuestion} from "../__testdata__/grapher.testdata";
import {
    angleQuestion,
    angleQuestionWithDefaultCorrect,
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
    quadraticQuestion,
    quadraticQuestionWithDefaultCorrect,
    rayQuestion,
    rayQuestionWithDefaultCorrect,
    segmentQuestion,
    segmentQuestionDefaultCorrect,
    segmentWithLockedEllipses,
    segmentWithLockedFunction,
    segmentWithLockedLineQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedPointsWithColorQuestion,
    segmentWithLockedPolygons,
    segmentWithLockedVectors,
    sinusoidQuestionWithDefaultCorrect,
} from "../__testdata__/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";

import {renderQuestion} from "./renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {mafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";
import type {UserEvent} from "@testing-library/user-event";

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
                await userEvent.keyboard("{arrowup}{arrowright}");

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

    it("parses equation only when needed for a locked function", () => {
        const PARSED = "equation needed parsing";
        const PREPARSED = "equation was pre-parsed";
        // Arrange - equation needs parsing
        const KasParseMock = jest
            .spyOn(KAS, "parse")
            .mockReturnValue({expr: {eval: () => PARSED}});
        const PlotMock = jest.spyOn(Plot, "OfX");
        renderQuestion(segmentWithLockedFunction("x^2"), {
            flags: {
                mafs: {
                    segment: true,
                },
            },
        });
        let plotFn = PlotMock.mock.calls[0][0]["y"];

        // Assert
        expect(KasParseMock).toHaveBeenCalledTimes(1);
        expect(plotFn(0)).toEqual(PARSED);

        // Arrange - equation does NOT need parsing
        KasParseMock.mockClear();
        PlotMock.mockClear();
        renderQuestion(
            segmentWithLockedFunction("x^2", {
                equationParsed: {eval: () => PREPARSED},
            }),
            {
                flags: {
                    mafs: {
                        segment: true,
                    },
                },
            },
        );
        plotFn = PlotMock.mock.calls[0][0]["y"];

        // Assert
        expect(KasParseMock).toHaveBeenCalledTimes(0);
        expect(plotFn(0)).toEqual(PREPARSED);
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
        const equationFnMock = jest.fn();

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
                equationParsed: {
                    eval: equationFnMock,
                },
            }),
            apiOptions,
        );

        // Assert
        expect(PlotOfXMock).toHaveBeenCalledTimes(0);
        expect(PlotOfYMock).toHaveBeenCalledTimes(1);
        PlotOfYMock.mock.calls[0][0]["x"](1.21); // Execute the plot function
        expect(equationFnMock).toHaveBeenCalledTimes(1);
        expect(equationFnMock).toHaveBeenCalledWith({y: 1.21});
    });
});
