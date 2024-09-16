import {
    getAngleEquation,
    getDefaultGraphStartCoords,
    getQuadraticEquation,
    getSinusoidEquation,
} from "./util";

import type {PerseusGraphType, Range} from "@khanacademy/perseus";

describe("getDefaultGraphStartCoords", () => {
    test("should get default start coords for a linear graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "linear"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [-5, 5],
            [5, 5],
        ]);
    });

    test("should get default start coords for a ray graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "ray"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [-5, 5],
            [5, 5],
        ]);
    });

    test("should get default start coords for a segment graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "segment"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
        ]);
    });

    test("should get default start coords for a segment graph with multiple segments", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "segment", numSegments: 2};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
            [
                [-5, -5],
                [5, -5],
            ],
        ]);
    });

    test("should get default start coords for a linear system graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "linear-system"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [
                [-5, 5],
                [5, 5],
            ],
            [
                [-5, -5],
                [5, -5],
            ],
        ]);
    });

    test("should get default start coords for a circle graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "circle"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual({center: [0, 0], radius: 2});
    });

    test("should get default start coords for a sinusoid graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "sinusoid"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [0, 0],
            [3, 2],
        ]);
    });

    test("should get default start coords for a quadratic graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "quadratic"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [-5, 5],
            [0, -5],
            [5, 5],
        ]);
    });

    test("should get default start coords for a point graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "point"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([[0, 0]]);
    });

    test("should get default start coords for a point graph with multiple points", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "point", numPoints: 2};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [-5, 0],
            [5, 0],
        ]);
    });

    test("should get default start coords for a polygon graph, triangle (default)", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "polygon"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [3, -2],
            [0, 4],
            [-3, -2],
        ]);
    });

    test("should get default start coords for a polygon graph, square", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "polygon", numSides: 4};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        expect(defaultCoords).toEqual([
            [3, -3],
            [3, 3],
            [-3, 3],
            [-3, -3],
        ]);
    });

    test("should get default start coords for an angle graph", () => {
        // Arrange
        const graph: PerseusGraphType = {type: "angle"};
        const range = [
            [-10, 10],
            [-10, 10],
        ] satisfies [Range, Range];
        const step = [1, 1] satisfies [number, number];

        // Act
        const defaultCoords = getDefaultGraphStartCoords(graph, range, step);

        // Default correct answer is 20 degree angle at (0, 0)
        expect(defaultCoords).toEqual([
            [7, 0],
            [0, 0],
            [6.5778483455013586, 2.394141003279681],
        ]);
    });
});

describe("getSinusoidEquation", () => {
    test.each`
        point1      | point2     | expected
        ${[0, 0]}   | ${[3, 2]}  | ${"y = 2.000sin(0.524x - 0.000) + 0.000"}
        ${[0, 0]}   | ${[1, 0]}  | ${"y = 0.000sin(1.571x - 0.000) + 0.000"}
        ${[0, 0]}   | ${[1, 1]}  | ${"y = 1.000sin(1.571x - 0.000) + 0.000"}
        ${[0, 0]}   | ${[1, -1]} | ${"y = -1.000sin(1.571x - 0.000) + 0.000"}
        ${[0, 0]}   | ${[-1, 0]} | ${"y = 0.000sin(-1.571x - 0.000) + 0.000"}
        ${[-1, 0]}  | ${[1, 1]}  | ${"y = 1.000sin(0.785x - -0.785) + 0.000"}
        ${[0, -1]}  | ${[1, 1]}  | ${"y = 2.000sin(1.571x - 0.000) + -1.000"}
        ${[-9, -9]} | ${[9, 9]}  | ${"y = 18.000sin(0.087x - -0.785) + -9.000"}
        ${[3, -4]}  | ${[6, 7]}  | ${"y = 11.000sin(0.524x - 1.571) + -4.000"}
    `("should return the correct equation", ({point1, point2, expected}) => {
        // Act
        const equation = getSinusoidEquation([point1, point2]);

        expect(equation).toBe(expected);
    });
});

describe("getQuadraticEquation", () => {
    test.each`
        point1     | point2     | point3    | expected
        ${[-5, 5]} | ${[0, -5]} | ${[5, 5]} | ${"y = 0.400x^2 + 0.000x + -5.000"}
        ${[-5, 5]} | ${[0, 5]}  | ${[5, 5]} | ${"y = 0.000x^2 + 0.000x + 5.000"}
        ${[-9, 9]} | ${[-7, 7]} | ${[9, 9]} | ${"y = 0.063x^2 + 0.000x + 3.938"}
        ${[-9, 4]} | ${[-7, 7]} | ${[9, 9]} | ${"y = -0.076x^2 + 0.278x + 12.688"}
        ${[-1, 0]} | ${[0, 1]}  | ${[1, 2]} | ${"y = 0.000x^2 + 1.000x + 1.000"}
    `(
        "should return the correct equation",
        ({point1, point2, point3, expected}) => {
            // Act
            const equation = getQuadraticEquation([point1, point2, point3]);

            expect(equation).toBe(expected);
        },
    );

    test.each`
        point1     | point2      | point3
        ${[-5, 5]} | ${[-5, -5]} | ${[5, 5]}
        ${[-5, 5]} | ${[0, -5]}  | ${[-5, 5]}
        ${[-5, 5]} | ${[0, 5]}   | ${[0, 5]}
    `("should return division by zero error", ({point1, point2, point3}) => {
        // Act
        const equation = getQuadraticEquation([point1, point2, point3]);

        expect(equation).toBe("Division by zero error");
    });
});

describe("getAngleEquation", () => {
    test.each`
        point1      | vertex    | point2                                     | expected
        ${[7, 0]}   | ${[0, 0]} | ${[6.5778483455013586, 2.394141003279681]} | ${"20° angle at (0, 0)"}
        ${[5, 1]}   | ${[1, 1]} | ${[1, 5]}                                  | ${"90° angle at (1, 1)"}
        ${[2, 1]}   | ${[1, 1]} | ${[2, 1]}                                  | ${"0° angle at (1, 1)"}
        ${[2, 1]}   | ${[2, 1]} | ${[2, 1]}                                  | ${"0° angle at (2, 1)"}
        ${[5, 0]}   | ${[0, 0]} | ${[0, 5]}                                  | ${"90° angle at (0, 0)"}
        ${[5, 0]}   | ${[0, 0]} | ${[-5, 5]}                                 | ${"135° angle at (0, 0)"}
        ${[5, 0]}   | ${[0, 0]} | ${[-5, -5]}                                | ${"225° angle at (0, 0)"}
        ${[5, 0]}   | ${[0, 0]} | ${[5, -5]}                                 | ${"315° angle at (0, 0)"}
        ${[0, 5]}   | ${[0, 0]} | ${[5, 0]}                                  | ${"-90° angle at (0, 0)"}
        ${[-5, 5]}  | ${[0, 0]} | ${[5, 0]}                                  | ${"-135° angle at (0, 0)"}
        ${[-5, -5]} | ${[0, 0]} | ${[5, 0]}                                  | ${"-225° angle at (0, 0)"}
        ${[5, -5]}  | ${[0, 0]} | ${[5, 0]}                                  | ${"-315° angle at (0, 0)"}
    `(
        "should return the correct equation",
        ({point1, vertex, point2, expected}) => {
            // Arrange

            // Act
            const equation = getAngleEquation([point1, vertex, point2]);

            // Assert
            expect(equation).toBe(expected);
        },
    );
});
