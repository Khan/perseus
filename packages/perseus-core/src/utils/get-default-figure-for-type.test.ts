import {getDefaultFigureForType} from "./get-default-figure-for-type";

describe("getDefaultFigureForType", () => {
    test("should return a point with default values", () => {
        const figure = getDefaultFigureForType("point");
        expect(figure).toEqual({
            type: "point",
            coord: [0, 0],
            color: "grayH",
            filled: true,
            labels: [],
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
                    labels: [],
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "grayH",
                    filled: true,
                    labels: [],
                },
            ],
            color: "grayH",
            lineStyle: "solid",
            showPoint1: false,
            showPoint2: false,
            weight: "medium",
            labels: [],
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
            weight: "medium",
            labels: [],
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
            weight: "medium",
            labels: [],
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
            weight: "medium",
            labels: [],
        });
    });

    test("should return a 'function' with default values", () => {
        const figure = getDefaultFigureForType("function");
        expect(figure).toEqual({
            type: "function",
            color: "grayH",
            strokeStyle: "solid",
            weight: "medium",
            equation: "x^2",
            directionalAxis: "x",
            domain: [-Infinity, Infinity],
            labels: [],
        });
    });

    test("should return a 'label' with default values", () => {
        const figure = getDefaultFigureForType("label");
        expect(figure).toEqual({
            type: "label",
            coord: [0, 0],
            text: "label",
            color: "grayH",
            size: "medium",
        });
    });
});
