import {
    degreeToRadian,
    getDefaultFigureForType,
    radianToDegree,
    getDefaultGraphStartCoords,
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
});
