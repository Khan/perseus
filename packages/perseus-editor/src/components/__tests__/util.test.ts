import {
    degreeToRadian,
    getDefaultFigureForType,
    radianToDegree,
    getDefaultGraphStartCoords,
    getSinusoidEquation,
    getQuadraticEquation,
} from "../util";

import type {PerseusGraphType, Range} from "@khanacademy/perseus";

describe("getDefaultFigureForType", () => {
    test("should return a point with default values", () => {
        const figure = getDefaultFigureForType("point");
        expect(figure).toEqual({
            type: "point",
            coord: [0, 0],
            color: "grayH",
            filled: true,
        });
    });

    test("should return a line with default values", () => {
        const figure = getDefaultFigureForType("line");
        expect(figure).toEqual({
            type: "line",
            kind: "line",
            points: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "grayH",
                    filled: true,
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "grayH",
                    filled: true,
                },
            ],
            color: "grayH",
            lineStyle: "solid",
            showPoint1: false,
            showPoint2: false,
        });
    });

    test("should return a vector with default values", () => {
        const figure = getDefaultFigureForType("vector");
        expect(figure).toEqual({
            type: "vector",
            points: [
                [0, 0],
                [2, 2],
            ],
            color: "grayH",
        });
    });

    test("should return an ellipse with default values", () => {
        const figure = getDefaultFigureForType("ellipse");
        expect(figure).toEqual({
            type: "ellipse",
            center: [0, 0],
            radius: [1, 1],
            angle: 0,
            color: "grayH",
            fillStyle: "none",
            strokeStyle: "solid",
        });
    });

    test("should return a polygon with default values", () => {
        const figure = getDefaultFigureForType("polygon");
        expect(figure).toEqual({
            type: "polygon",
            points: [
                [0, 2],
                [-1, 0],
                [1, 0],
            ],
            color: "grayH",
            showVertices: false,
            fillStyle: "none",
            strokeStyle: "solid",
        });
    });

    test("should return a 'function' with default values", () => {
        const figure = getDefaultFigureForType("function");
        expect(figure).toEqual({
            type: "function",
            color: "grayH",
            strokeStyle: "solid",
            equation: "x^2",
            directionalAxis: "x",
        });
    });
});

describe("degreeToRadian", () => {
    test.each`
        degrees | radians
        ${0}    | ${0}
        ${45}   | ${Math.PI / 4}
        ${90}   | ${Math.PI / 2}
        ${180}  | ${Math.PI}
        ${270}  | ${Math.PI * 1.5}
        ${360}  | ${Math.PI * 2}
        ${-45}  | ${-Math.PI / 4}
        ${-90}  | ${-Math.PI / 2}
    `(
        "should convert $degrees degrees to $radians radians",
        ({degrees, radians}) => {
            expect(degreeToRadian(degrees)).toBe(radians);
        },
    );
});

describe("radianToDegree", () => {
    test.each`
        radians          | degrees
        ${0}             | ${0}
        ${Math.PI / 4}   | ${45}
        ${Math.PI / 2}   | ${90}
        ${Math.PI}       | ${180}
        ${Math.PI * 1.5} | ${270}
        ${Math.PI * 2}   | ${360}
        ${-Math.PI / 4}  | ${-45}
        ${-Math.PI / 2}  | ${-90}
    `(
        "should convert $radians radians to $degrees degrees",
        ({radians, degrees}) => {
            expect(radianToDegree(radians)).toBe(degrees);
        },
    );
});

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
