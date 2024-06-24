import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";

import type {PerseusRenderer} from "../../perseus-types";

describe("InteractiveGraphQuestionBuilder", () => {
    it("builds a default graph question", () => {
        const question: PerseusRenderer =
            interactiveGraphQuestionBuilder().build();

        expect(question.content).toBe("[[☃ interactive-graph 1]]");
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

    it("creates a default segment graph with a specified number of segments", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withNumSegments(3)
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 3,
                },
                correct: {
                    type: "segment",
                    numSegments: 3,
                    coords: [
                        expect.anything(),
                        expect.anything(),
                        expect.anything(),
                    ],
                },
            }),
        );
    });

    it("creates a segment graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSegments([
                [
                    [0, 0],
                    [2, 2],
                ],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 1,
                    coords: [
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
                            [-7, 7],
                            [2, 5],
                        ],
                    ],
                },
            }),
        );
    });

    it("creates a graph with multiple segments with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSegments([
                [
                    [0, 0],
                    [2, 2],
                ],
                [
                    [3, 3],
                    [5, 5],
                ],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];

        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "segment",
                    numSegments: 2,
                    coords: [
                        [
                            [0, 0],
                            [2, 2],
                        ],
                        [
                            [3, 3],
                            [5, 5],
                        ],
                    ],
                },
                correct: {
                    type: "segment",
                    numSegments: 2,
                    coords: [
                        [
                            [-7, 7],
                            [2, 5],
                        ],
                        [
                            [-7, 7],
                            [2, 5],
                        ],
                    ],
                },
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
                    coords: [
                        [-10, -5],
                        [10, 5],
                    ],
                },
            }),
        );
    });

    it("creates a linear graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinear([
                [3, 0],
                [3, 3],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "linear",
                    coords: [
                        [3, 0],
                        [3, 3],
                    ],
                },
                correct: {
                    type: "linear",
                    coords: [
                        [-10, -5],
                        [10, 5],
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
                    coords: [
                        [
                            [-10, -5],
                            [10, 5],
                        ],
                        [
                            [-10, 5],
                            [10, -5],
                        ],
                    ],
                },
            }),
        );
    });

    it("creates a linear system graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withLinearSystem([
                [
                    [-3, 0],
                    [-3, 3],
                ],
                [
                    [3, 0],
                    [3, 3],
                ],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "linear-system",
                    coords: [
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
                            [-10, -5],
                            [10, 5],
                        ],
                        [
                            [-10, 5],
                            [10, -5],
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
                    coords: [
                        [-10, -5],
                        [10, 5],
                    ],
                },
            }),
        );
    });

    it("creates a ray graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withRay([
                [3, 0],
                [3, 3],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "ray",
                    coords: [
                        [3, 0],
                        [3, 3],
                    ],
                },
                correct: {
                    type: "ray",
                    coords: [
                        [-10, -5],
                        [10, 5],
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
                correct: {type: "circle", radius: 5, center: [0, 0]},
            }),
        );
    });

    it("creates a circle graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withCircle([9, 9])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {type: "circle", center: [9, 9], radius: 5},
                correct: {type: "circle", radius: 5, center: [0, 0]},
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
                    coords: [
                        [-10, 5],
                        [10, 5],
                        [0, -5],
                    ],
                },
            }),
        );
    });

    it("creates a quadratic graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withQuadratic([
                [-1, -1],
                [0, 0],
                [1, -1],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "quadratic",
                    coords: [
                        [-1, -1],
                        [0, 0],
                        [1, -1],
                    ],
                },
                correct: {
                    type: "quadratic",
                    coords: [
                        [-10, 5],
                        [10, 5],
                        [0, -5],
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
                    coords: [
                        [-10, 5],
                        [10, 5],
                    ],
                },
            }),
        );
    });

    it("creates a sinusoid graph with start coords", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withSinusoid([
                [0, 0],
                [1, -1],
            ])
            .build();
        const graph = question.widgets["interactive-graph 1"];
        expect(graph.options).toEqual(
            expect.objectContaining({
                graph: {
                    type: "sinusoid",
                    coords: [
                        [0, 0],
                        [1, -1],
                    ],
                },
                correct: {
                    type: "sinusoid",
                    coords: [
                        [-10, 5],
                        [10, 5],
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
                graph: {type: "polygon", snapTo: "grid"},
                correct: {
                    type: "polygon",
                    numSides: 4,
                    showAngles: true,
                    showSides: true,
                    snapTo: "grid",
                    coords: [
                        [-1, 2],
                        [3, 4],
                        [1, -2],
                        [-3, 0],
                    ],
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
                color: "green",
                filled: true,
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
                color: "green",
                filled: true,
            },
            {
                type: "point",
                coord: [6, 7],
                color: "green",
                filled: true,
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
                        color: "green",
                        filled: true,
                    },
                    {
                        type: "point",
                        coord: [3, 4],
                        color: "green",
                        filled: true,
                    },
                ],
                color: "green",
                lineStyle: "solid",
                showPoint1: true,
                showPoint2: true,
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
            },
        ]);
    });

    it("adds a locked vector with a specified color", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedVector([1, 2], [3, 4], "green")
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
            },
        ]);
    });

    it("adds a locked ellipse with options", () => {
        const question: PerseusRenderer = interactiveGraphQuestionBuilder()
            .addLockedEllipse([1, 2], [3, 4], {
                angle: Math.PI / 2,
                color: "green",
                fillStyle: "solid",
                strokeStyle: "dashed",
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
            },
        ]);
    });

    it("adds a locked polygon with options", () => {
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
            },
        ]);
    });
});
