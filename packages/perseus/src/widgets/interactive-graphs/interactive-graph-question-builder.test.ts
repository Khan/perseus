import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

describe("InteractiveGraphQuestionBuilder", () => {
    it("builds a default graph question", () => {
        const question: PerseusRenderer =
            interactiveGraphQuestionBuilder().build();

        expect(question.content).toBe("[[☃ interactive-graph 1]]");
    });

    it("sets the content", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withContent("the content [[☃ interactive-graph 1]]")
            .build();

        expect(question.content).toBe("the content [[☃ interactive-graph 1]]");
    });

    it("sets the background image", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withBackgroundImage(
                "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
                425,
                425,
            )
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.backgroundImage).toStrictEqual({
            url: "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
            width: 425,
            height: 425,
        });
    });

    it("sets the background image with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withBackgroundImage(
                "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
                425,
                425,
                {
                    scale: 1,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                },
            )
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.backgroundImage).toStrictEqual({
            url: "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
            width: 425,
            height: 425,
            scale: 1,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        });
    });

    it("sets the grid step", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withGridStep(7, 8)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.gridStep).toEqual([7, 8]);
    });

    it("sets the axis labels", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withAxisLabels("the x label", "the y label")
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.labels).toEqual(["the x label", "the y label"]);
    });

    it("sets the axis labelLocation", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withAxisLabels("the x label", "the y label")
            .withLabelLocation("alongEdge")
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.labelLocation).toEqual("alongEdge");
    });

    it("sets the background markings", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withMarkings("grid")
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.markings).toBe("grid");
    });

    it("sets the ranges", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withXRange(-1, 2)
            .withYRange(3, 4)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.range).toEqual([
            [-1, 2],
            [3, 4],
        ]);
    });

    it("sets the snap step", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSnapStep(5, 6)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.snapStep).toEqual([5, 6]);
    });

    it("sets the axis tick step", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withTickStep(7, 8)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.step).toEqual([7, 8]);
    });

    it("shows the protractor", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withProtractor()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options.showProtractor).toBe(true);
    });

    it("creates a default segment graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSegments()
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 1,
                },
                correct: {
                    type: "segment",
                    numSegments: 1,
                },
            }),
        );
    });

    it("creates a segment graph with numSegments option", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSegments({
                numSegments: 2,
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 2,
                },
                correct: {
                    type: "segment",
                    numSegments: 2,
                },
            }),
        );
    });

    it("creates a segment graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSegments({
                coords: [
                    [
                        [-10, 7],
                        [2, 5],
                    ],
                ],
                startCoords: [
                    [
                        [0, 0],
                        [2, 2],
                    ],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 1,
                    startCoords: [
                        [
                            [0, 0],
                            [2, 2],
                        ],
                    ],
                },
                correct: {
                    type: "segment",
                    numSegments: 1,
                    coords: [
                        [
                            [-10, 7],
                            [2, 5],
                        ],
                    ],
                },
            }),
        );
    });

    it("creates a 'none' type graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withNoInteractiveFigure()
            .build();

        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "none"},
                correct: {type: "none"},
            }),
        );
    });

    it("creates a linear graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinear()
            .build();

        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "linear"},
                correct: {
                    type: "linear",
                },
            }),
        );
    });

    it("creates a linear graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinear({
                coords: [
                    [0, 0],
                    [1, 1],
                ],
                startCoords: [
                    [3, 0],
                    [3, 3],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "linear",
                    startCoords: [
                        [3, 0],
                        [3, 3],
                    ],
                },
                correct: {
                    type: "linear",
                    coords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
            }),
        );
    });

    it("creates a linear system graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinearSystem()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "linear-system"},
                correct: {
                    type: "linear-system",
                },
            }),
        );
    });

    it("creates a linear system graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinearSystem({
                coords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                    [
                        [2, 2],
                        [3, 3],
                    ],
                ],
                startCoords: [
                    [
                        [-3, 0],
                        [-3, 3],
                    ],
                    [
                        [3, 0],
                        [3, 3],
                    ],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "linear-system",
                    startCoords: [
                        [
                            [-3, 0],
                            [-3, 3],
                        ],
                        [
                            [3, 0],
                            [3, 3],
                        ],
                    ],
                },
                correct: {
                    type: "linear-system",
                    coords: [
                        [
                            [0, 0],
                            [1, 1],
                        ],
                        [
                            [2, 2],
                            [3, 3],
                        ],
                    ],
                },
            }),
        );
    });

    it("creates a ray graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withRay()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "ray"},
                correct: {
                    type: "ray",
                },
            }),
        );
    });

    it("creates a ray graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withRay({
                coords: [
                    [0, 0],
                    [1, 1],
                ],
                startCoords: [
                    [3, 0],
                    [3, 3],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "ray",
                    startCoords: [
                        [3, 0],
                        [3, 3],
                    ],
                },
                correct: {
                    type: "ray",
                    coords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
            }),
        );
    });

    it("creates a circle graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withCircle()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "circle"},
                correct: {type: "circle", radius: 2, center: [0, 0]},
            }),
        );
    });

    it("creates a circle graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withCircle({
                center: [-1, -1],
                radius: 3,
                startCoords: {
                    center: [9, 9],
                    radius: 5,
                },
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "circle",
                    startCoords: {center: [9, 9], radius: 5},
                },
                correct: {type: "circle", radius: 3, center: [-1, -1]},
            }),
        );
    });

    it("creates a quadratic graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withQuadratic()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "quadratic"},
                correct: {
                    type: "quadratic",
                },
            }),
        );
    });

    it("creates a quadratic graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withQuadratic({
                coords: [
                    [2, 2],
                    [3, 3],
                    [4, 4],
                ],
                startCoords: [
                    [-1, -1],
                    [0, 0],
                    [1, -1],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "quadratic",
                    startCoords: [
                        [-1, -1],
                        [0, 0],
                        [1, -1],
                    ],
                },
                correct: {
                    type: "quadratic",
                    coords: [
                        [2, 2],
                        [3, 3],
                        [4, 4],
                    ],
                },
            }),
        );
    });

    it("creates a sinusoid graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSinusoid()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "sinusoid"},
                correct: {
                    type: "sinusoid",
                },
            }),
        );
    });

    it("creates a sinusoid graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSinusoid({
                coords: [
                    [1, 1],
                    [2, 2],
                ],
                startCoords: [
                    [0, 0],
                    [1, -1],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "sinusoid",
                    startCoords: [
                        [0, 0],
                        [1, -1],
                    ],
                },
                correct: {
                    type: "sinusoid",
                    coords: [
                        [1, 1],
                        [2, 2],
                    ],
                },
            }),
        );
    });

    it("creates a polygon graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withPolygon("grid")
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: expect.objectContaining({
                    type: "polygon",
                    snapTo: "grid",
                }),
                correct: expect.objectContaining({
                    type: "polygon",
                    numSides: 3,
                    showAngles: false,
                    showSides: false,
                    snapTo: "grid",
                }),
            }),
        );
    });

    it("creates a polygon graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withPolygon("angles", {
                match: "approx",
                numSides: 4,
                showAngles: true,
                showSides: true,
                coords: [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "polygon",
                    numSides: 4,
                    showAngles: true,
                    showSides: true,
                    snapTo: "angles",
                },
                correct: {
                    type: "polygon",
                    match: "approx",
                    numSides: 4,
                    showAngles: true,
                    showSides: true,
                    snapTo: "angles",
                    coords: [
                        [0, 0],
                        [1, 0],
                        [1, 1],
                        [0, 1],
                    ],
                },
            }),
        );
    });

    it("creates a point graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withPoints("unlimited")
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "point", numPoints: "unlimited"},
                correct: {
                    type: "point",
                    numPoints: "unlimited",
                },
            }),
        );
    });

    it("creates a point graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withPoints(2, {
                coords: [
                    [1, 1],
                    [2, 2],
                ],
                startCoords: [
                    [3, 3],
                    [4, 4],
                ],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "point",
                    numPoints: 2,
                    startCoords: [
                        [3, 3],
                        [4, 4],
                    ],
                },
                correct: {
                    type: "point",
                    numPoints: 2,
                    coords: [
                        [1, 1],
                        [2, 2],
                    ],
                },
            }),
        );
    });

    it("creates an angle graph", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withAngle()
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "angle"},
                correct: {
                    type: "angle",
                },
            }),
        );
    });

    it("creates an angle graph with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withAngle({
                coords: [
                    [0, 0],
                    [1, 1],
                    [2, 2],
                ],
                startCoords: [
                    [3, 3],
                    [4, 4],
                    [5, 5],
                ],
                showAngles: true,
                allowReflexAngles: true,
                angleOffsetDeg: 10,
                snapDegrees: 5,
                match: "congruent",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "angle",
                    startCoords: [
                        [3, 3],
                        [4, 4],
                        [5, 5],
                    ],
                    showAngles: true,
                    allowReflexAngles: true,
                    angleOffsetDeg: 10,
                    snapDegrees: 5,
                    match: "congruent",
                },
                correct: {
                    type: "angle",
                    coords: [
                        [0, 0],
                        [1, 1],
                        [2, 2],
                    ],
                    showAngles: true,
                    allowReflexAngles: true,
                    angleOffsetDeg: 10,
                    snapDegrees: 5,
                    match: "congruent",
                },
            }),
        );
    });

    it("adds a locked point", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 5)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "point",
                coord: [3, 5],
                color: "grayH",
                filled: true,
                labels: [],
            },
        ]);
    });

    it("adds multiple locked points", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 5)
            .addLockedPointAt(6, 7)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "point",
                coord: [3, 5],
                color: "grayH",
                filled: true,
                labels: [],
            },
            {
                type: "point",
                coord: [6, 7],
                color: "grayH",
                filled: true,
                labels: [],
            },
        ]);
    });

    it("adds a locked point with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 5, {
                color: "green",
                filled: false,
                labels: [{text: "a label"}],
                ariaLabel: "an aria label",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "point",
                coord: [3, 5],
                color: "green",
                filled: false,
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [3.5, 5],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked point with options and specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 5, {
                color: "green",
                filled: false,
                labels: [{text: "a label", coord: [7, 8], size: "large"}],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "point",
                coord: [3, 5],
                color: "green",
                filled: false,
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [7, 8],
                        color: "green",
                        size: "large",
                    },
                ],
            },
        ]);
    });

    it("adds a locked line", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedLine([1, 2], [3, 4])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "line",
                kind: "line",
                points: [
                    {
                        type: "point",
                        coord: [1, 2],
                        color: "grayH",
                        filled: true,
                        labels: [],
                    },
                    {
                        type: "point",
                        coord: [3, 4],
                        color: "grayH",
                        filled: true,
                        labels: [],
                    },
                ],
                color: "grayH",
                lineStyle: "solid",
                showPoint1: false,
                showPoint2: false,
                labels: [],
            },
        ]);
    });

    it("adds a locked line with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedLine([1, 2], [3, 4], {
                kind: "segment",
                lineStyle: "dashed",
                color: "green",
                filled: [false, false],
                showPoint1: true,
                showPoint2: true,
                labels: [{text: "a label"}],
                ariaLabel: "an aria label",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "line",
                kind: "segment",
                points: [
                    {
                        type: "point",
                        coord: [1, 2],
                        color: "green",
                        filled: false,
                        labels: [],
                    },
                    {
                        type: "point",
                        coord: [3, 4],
                        color: "green",
                        filled: false,
                        labels: [],
                    },
                ],
                color: "green",
                lineStyle: "dashed",
                showPoint1: true,
                showPoint2: true,
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [2, 3],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked line with options and specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedLine([1, 2], [3, 4], {
                kind: "segment",
                lineStyle: "dashed",
                color: "green",
                filled: [false, false],
                showPoint1: true,
                showPoint2: true,
                labels: [{text: "a label", coord: [9, 9], size: "small"}],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "line",
                kind: "segment",
                points: [
                    {
                        type: "point",
                        coord: [1, 2],
                        color: "green",
                        filled: false,
                        labels: [],
                    },
                    {
                        type: "point",
                        coord: [3, 4],
                        color: "green",
                        filled: false,
                        labels: [],
                    },
                ],
                color: "green",
                lineStyle: "dashed",
                showPoint1: true,
                showPoint2: true,
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [9, 9],
                        color: "green",
                        size: "small",
                    },
                ],
            },
        ]);
    });

    it("adds a locked vector", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedVector([1, 2], [3, 4])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "vector",
                points: [
                    [1, 2],
                    [3, 4],
                ],
                color: "grayH",
                labels: [],
            },
        ]);
    });

    it("adds a locked vector with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedVector([1, 2], [3, 4], {
                color: "green",
                labels: [{text: "a label"}],
                ariaLabel: "an aria label",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "vector",
                points: [
                    [1, 2],
                    [3, 4],
                ],
                color: "green",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [2, 3],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked vector with options and specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedVector([1, 2], [3, 4], {
                color: "green",
                labels: [{text: "a label", coord: [9, 9], size: "small"}],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "vector",
                points: [
                    [1, 2],
                    [3, 4],
                ],
                color: "green",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [9, 9],
                        color: "green",
                        size: "small",
                    },
                ],
            },
        ]);
    });

    it("adds a locked ellipse", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedEllipse([1, 2], [3, 3])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "ellipse",
                center: [1, 2],
                radius: [3, 3],
                angle: 0,
                color: "grayH",
                fillStyle: "none",
                strokeStyle: "solid",
                labels: [],
            },
        ]);
    });

    it("adds a locked ellipse with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedEllipse([1, 2], [3, 4], {
                angle: Math.PI / 2,
                color: "green",
                fillStyle: "solid",
                strokeStyle: "dashed",
                labels: [{text: "a label"}],
                ariaLabel: "an aria label",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "ellipse",
                center: [1, 2],
                radius: [3, 4],
                angle: Math.PI / 2,
                color: "green",
                fillStyle: "solid",
                strokeStyle: "dashed",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [1, 2],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked ellipse with specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedEllipse([1, 2], [3, 4], {
                labels: [{text: "a label", coord: [9, 9], size: "small"}],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "ellipse",
                center: [1, 2],
                radius: [3, 4],
                angle: 0,
                color: "grayH",
                fillStyle: "none",
                strokeStyle: "solid",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [9, 9],
                        color: "grayH",
                        size: "small",
                    },
                ],
            },
        ]);
    });

    it("adds a locked polygon", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPolygon([
                [1, 2],
                [3, 4],
                [5, 6],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "polygon",
                points: [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                color: "grayH",
                showVertices: false,
                fillStyle: "none",
                strokeStyle: "solid",
                weight: "medium",
                labels: [],
            },
        ]);
    });

    it("adds a locked polygon with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPolygon(
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                {
                    color: "green",
                    showVertices: true,
                    fillStyle: "translucent",
                    strokeStyle: "dashed",
                    weight: "thin",
                    labels: [{text: "a label"}],
                    ariaLabel: "an aria label",
                },
            )
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "polygon",
                points: [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                color: "green",
                showVertices: true,
                fillStyle: "translucent",
                strokeStyle: "dashed",
                weight: "thin",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [1, 2],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked polygon with specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedPolygon(
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                {
                    labels: [{text: "a label", coord: [9, 9], size: "small"}],
                },
            )
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "polygon",
                points: [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                color: "grayH",
                showVertices: false,
                fillStyle: "none",
                strokeStyle: "solid",
                weight: "medium",
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [9, 9],
                        color: "grayH",
                        size: "small",
                    },
                ],
            },
        ]);
    });

    it("adds a locked function", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedFunction("x^2")
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "function",
                equation: "x^2",
                color: "grayH",
                strokeStyle: "solid",
                directionalAxis: "x",
                domain: [-Infinity, Infinity],
                labels: [],
            },
        ]);
    });

    it("adds a locked function with options and minimal label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedFunction("x^2", {
                color: "green",
                strokeStyle: "dashed",
                directionalAxis: "y",
                domain: [-5, 5],
                labels: [{text: "a label"}],
                ariaLabel: "an aria label",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "function",
                equation: "x^2",
                color: "green",
                strokeStyle: "dashed",
                directionalAxis: "y",
                domain: [-5, 5],
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [0, 0],
                        color: "green",
                        size: "medium",
                    },
                ],
                ariaLabel: "an aria label",
            },
        ]);
    });

    it("adds a locked function with a specific label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedFunction("x^2", {
                labels: [{text: "a label", coord: [9, 9], size: "small"}],
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "function",
                equation: "x^2",
                color: "grayH",
                strokeStyle: "solid",
                directionalAxis: "x",
                domain: [-Infinity, Infinity],
                labels: [
                    {
                        type: "label",
                        text: "a label",
                        coord: [9, 9],
                        color: "grayH",
                        size: "small",
                    },
                ],
            },
        ]);
    });

    it("adds a locked label", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedLabel("the text", [1, 2])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "label",
                text: "the text",
                coord: [1, 2],
                color: "grayH",
                size: "medium",
            },
        ]);
    });

    it("adds a locked label with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedLabel("some other text", [15, 2], {
                color: "green",
                size: "large",
            })
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options.lockedFigures).toEqual([
            {
                type: "label",
                text: "some other text",
                coord: [15, 2],
                color: "green",
                size: "large",
            },
        ]);
    });
});
