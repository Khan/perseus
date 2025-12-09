import {
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
    generateIGNoneGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
} from "./interactive-graph-widget-generator";

it("builds an interactive graph widget with all props", () => {
    // Arrange, Act
    const widget = generateInteractiveGraphWidget({
        graded: false,
        version: {major: 1, minor: 0},
        static: true,
        alignment: "block",
        options: {
            correct: {type: "none"},
            graph: {type: "none"},
            labelLocation: "alongEdge",
            labels: ["$a$", "$b$"],
            markings: "grid",
            range: [
                [-100, 100],
                [-100, 100],
            ],
            showAxisArrows: {
                xMin: false,
                xMax: false,
                yMin: false,
                yMax: false,
            },
            showProtractor: true,
            showTooltips: true,
            step: [2, 2],
            lockedFigures: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
        },
    });

    // Assert
    expect(widget).toEqual({
        type: "interactive-graph",
        graded: false,
        version: {major: 1, minor: 0},
        static: true,
        alignment: "block",
        options: {
            correct: {type: "none"},
            graph: {type: "none"},
            labelLocation: "alongEdge",
            labels: ["$a$", "$b$"],
            markings: "grid",
            range: [
                [-100, 100],
                [-100, 100],
            ],
            showAxisArrows: {
                xMin: false,
                xMax: false,
                yMin: false,
                yMax: false,
            },
            showProtractor: true,
            showTooltips: true,
            step: [2, 2],
            lockedFigures: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
        },
    });
});

describe("generateInteractiveGraphOptions", () => {
    it("builds a default interactive graph options object", () => {
        // Arrange, Act
        const options = generateInteractiveGraphOptions();

        // Assert
        expect(options).toEqual({
            correct: {
                type: "linear",
                coords: null,
            },
            graph: {
                type: "linear",
            },
            backgroundImage: {
                url: null,
            },
            labelLocation: "onAxis",
            labels: ["$x$", "$y$"],
            markings: "graph",
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: true, xMax: true, yMin: true, yMax: true},
            showProtractor: false,
            showTooltips: false,
            step: [1, 1],
            lockedFigures: [],
        });
    });

    it("builds an interactive graph options object with all props", () => {
        // Arrange, Act
        const options = generateInteractiveGraphOptions({
            correct: {type: "none"},
            graph: {type: "none"},
            backgroundImage: {
                url: "https://example.com/image.png",
            },
            labelLocation: "alongEdge",
            labels: ["$a$", "$b$"],
            markings: "grid",
            range: [
                [-100, 100],
                [-100, 100],
            ],
            showAxisArrows: {
                xMin: false,
                xMax: false,
                yMin: false,
                yMax: false,
            },
            showProtractor: true,
            showTooltips: true,
            step: [2, 2],
            lockedFigures: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
        });

        // Assert
        expect(options).toEqual({
            correct: {type: "none"},
            graph: {type: "none"},
            backgroundImage: {
                url: "https://example.com/image.png",
            },
            labelLocation: "alongEdge",
            labels: ["$a$", "$b$"],
            markings: "grid",
            range: [
                [-100, 100],
                [-100, 100],
            ],
            showAxisArrows: {
                xMin: false,
                xMax: false,
                yMin: false,
                yMax: false,
            },
            showProtractor: true,
            showTooltips: true,
            step: [2, 2],
            lockedFigures: [
                {
                    type: "point",
                    coord: [0, 0],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
        });
    });
});

describe("generateInteractiveGraphWidget", () => {
    it("builds a default interactive graph widget", () => {
        // Arrange, Act
        const widget = generateInteractiveGraphWidget();

        // Assert
        expect(widget).toEqual({
            type: "interactive-graph",
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            alignment: "default",
            options: {
                correct: {
                    type: "linear",
                    coords: null,
                },
                graph: {
                    type: "linear",
                },
                backgroundImage: {
                    url: null,
                },
                labelLocation: "onAxis",
                labels: ["$x$", "$y$"],
                markings: "graph",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                showAxisArrows: {
                    xMin: true,
                    xMax: true,
                    yMin: true,
                    yMax: true,
                },
                showProtractor: false,
                showTooltips: false,
                step: [1, 1],
                lockedFigures: [],
            },
        });
    });
});

describe("generateIGAngleGraph", () => {
    it("builds a default angle graph", () => {
        // Arrange, Act
        const angleGraph = generateIGAngleGraph();

        // Assert
        expect(angleGraph).toEqual({
            type: "angle",
        });
    });

    it("builds an angle graph with all props", () => {
        // Arrange, Act
        const angleGraph = generateIGAngleGraph({
            coords: [
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            startCoords: [
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            showAngles: true,
            allowReflexAngles: true,
            angleOffsetDeg: 10,
            snapDegrees: 5,
            match: "congruent",
        });

        // Assert
        expect(angleGraph).toEqual({
            type: "angle",
            coords: [
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            startCoords: [
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            showAngles: true,
            allowReflexAngles: true,
            angleOffsetDeg: 10,
            snapDegrees: 5,
            match: "congruent",
        });
    });
});

describe("generateIGCircleGraph", () => {
    it("builds a default circle graph", () => {
        // Arrange, Act
        const circleGraph = generateIGCircleGraph();

        // Assert
        expect(circleGraph).toEqual({
            type: "circle",
        });
    });

    it("builds a circle graph with all props", () => {
        // Arrange, Act
        const circleGraph = generateIGCircleGraph({
            center: [0, 0],
            radius: 10,
            startCoords: {
                center: [0, 0],
                radius: 10,
            },
        });

        // Assert
        expect(circleGraph).toEqual({
            type: "circle",
            center: [0, 0],
            radius: 10,
            startCoords: {center: [0, 0], radius: 10},
        });
    });
});

describe("generateIGLinearGraph", () => {
    it("builds a default linear graph", () => {
        // Arrange, Act
        const linearGraph = generateIGLinearGraph();

        // Assert
        expect(linearGraph).toEqual({
            type: "linear",
        });
    });

    it("builds a linear graph with all props", () => {
        // Arrange, Act
        const linearGraph = generateIGLinearGraph({
            coords: [
                [0, 0],
                [1, 1],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
            ],
        });

        // Assert
        expect(linearGraph).toEqual({
            type: "linear",
            coords: [
                [0, 0],
                [1, 1],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
            ],
        });
    });
});

describe("generateIGLinearSystemGraph", () => {
    it("builds a default linear system graph", () => {
        // Arrange, Act
        const linearSystemGraph = generateIGLinearSystemGraph();

        // Assert
        expect(linearSystemGraph).toEqual({
            type: "linear-system",
        });
    });

    it("builds a linear system graph with all props", () => {
        // Arrange, Act
        const linearSystemGraph = generateIGLinearSystemGraph({
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
                    [0, 0],
                    [1, 1],
                ],
                [
                    [2, 2],
                    [3, 3],
                ],
            ],
        });

        // Assert
        expect(linearSystemGraph).toEqual({
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
            startCoords: [
                [
                    [0, 0],
                    [1, 1],
                ],
                [
                    [2, 2],
                    [3, 3],
                ],
            ],
        });
    });
});

describe("generateIGNoneGraph", () => {
    // The none type graph has no other props to test
    it("builds a default none graph", () => {
        // Arrange, Act
        const noneGraph = generateIGNoneGraph();

        // Assert
        expect(noneGraph).toEqual({
            type: "none",
        });
    });
});

describe("generateIGPointGraph", () => {
    it("builds a default point graph", () => {
        // Arrange, Act
        const pointGraph = generateIGPointGraph();

        // Assert
        expect(pointGraph).toEqual({
            type: "point",
        });
    });

    it("builds a point graph with all props", () => {
        // Arrange, Act
        const pointGraph = generateIGPointGraph({
            coords: [[2, 2]],
            startCoords: [[0, 0]],
            numPoints: 1,
        });

        // Assert
        expect(pointGraph).toEqual({
            type: "point",
            coords: [[2, 2]],
            startCoords: [[0, 0]],
            numPoints: 1,
        });
    });
});

describe("generateIGPolygonGraph", () => {
    it("builds a default polygon graph", () => {
        // Arrange, Act
        const polygonGraph = generateIGPolygonGraph();

        // Assert
        expect(polygonGraph).toEqual({
            type: "polygon",
        });
    });

    it("builds a polygon graph with all props", () => {
        // Arrange, Act
        const polygonGraph = generateIGPolygonGraph({
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            numSides: 3,
            showAngles: true,
            showSides: true,
            snapTo: "angles",
            match: "similar",
        });

        // Assert
        expect(polygonGraph).toEqual({
            type: "polygon",
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            numSides: 3,
            showAngles: true,
            showSides: true,
            snapTo: "angles",
            match: "similar",
        });
    });
});

describe("generateIGQuadraticGraph", () => {
    it("builds a default quadratic graph", () => {
        // Arrange, Act
        const quadraticGraph = generateIGQuadraticGraph();

        // Assert
        expect(quadraticGraph).toEqual({
            type: "quadratic",
        });
    });

    it("builds a quadratic graph with all props", () => {
        // Arrange, Act
        const quadraticGraph = generateIGQuadraticGraph({
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        });

        // Assert
        expect(quadraticGraph).toEqual({
            type: "quadratic",
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        });
    });
});

describe("generateIGRayGraph", () => {
    it("builds a default ray graph", () => {
        // Arrange, Act
        const rayGraph = generateIGRayGraph();

        // Assert
        expect(rayGraph).toEqual({
            type: "ray",
        });
    });

    it("builds a ray graph with all props", () => {
        // Arrange, Act
        const rayGraph = generateIGRayGraph({
            coords: [
                [0, 0],
                [1, 1],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
            ],
        });

        // Assert
        expect(rayGraph).toEqual({
            type: "ray",
            coords: [
                [0, 0],
                [1, 1],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
            ],
        });
    });
});

describe("generateIGSegmentGraph", () => {
    it("builds a default segment graph", () => {
        // Arrange, Act
        const segmentGraph = generateIGSegmentGraph();

        // Assert
        expect(segmentGraph).toEqual({
            type: "segment",
        });
    });

    it("builds a segment graph with all props", () => {
        // Arrange, Act
        const segmentGraph = generateIGSegmentGraph({
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
            startCoords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
            numSegments: 1,
        });

        // Assert
        expect(segmentGraph).toEqual({
            type: "segment",
            coords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
            startCoords: [
                [
                    [0, 0],
                    [1, 1],
                ],
            ],
            numSegments: 1,
        });
    });
});

describe("generateIGSinusoidGraph", () => {
    it("builds a default sinusoid graph", () => {
        // Arrange, Act
        const sinusoidGraph = generateIGSinusoidGraph();

        // Assert
        expect(sinusoidGraph).toEqual({
            type: "sinusoid",
        });
    });

    it("builds a sinusoid graph with all props", () => {
        // Arrange, Act
        const sinusoidGraph = generateIGSinusoidGraph({
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        });

        // Assert
        expect(sinusoidGraph).toEqual({
            type: "sinusoid",
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            startCoords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        });
    });
});

describe("generateIGLockedPoint", () => {
    it("builds a default locked point", () => {
        // Arrange, Act
        const lockedPoint = generateIGLockedPoint();

        // Assert
        expect(lockedPoint).toEqual({
            type: "point",
            coord: [0, 0],
            color: "grayH",
            filled: true,
            labels: [],
        });
    });

    it("builds a locked point with all props", () => {
        // Arrange, Act
        const lockedPoint = generateIGLockedPoint({
            coord: [0, 0],
            color: "blue",
            filled: false,
            labels: [
                {
                    type: "label",
                    coord: [0, 0],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Point A",
        });

        // Assert
        expect(lockedPoint).toEqual({
            type: "point",
            coord: [0, 0],
            color: "blue",
            filled: false,
            labels: [
                {
                    type: "label",
                    coord: [0, 0],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Point A",
        });
    });
});

describe("generateIGLockedLine", () => {
    it("builds a default locked line", () => {
        // Arrange, Act
        const lockedLine = generateIGLockedLine();

        // Assert
        expect(lockedLine).toEqual({
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

    it("builds a locked line with all props", () => {
        // Arrange, Act
        const lockedLine = generateIGLockedLine({
            kind: "ray",
            points: [
                {
                    type: "point",
                    coord: [1, 1],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
            color: "blue",
            lineStyle: "solid",
            showPoint1: true,
            showPoint2: true,
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Line A",
        });

        // Assert
        expect(lockedLine).toEqual({
            type: "line",
            kind: "ray",
            points: [
                {
                    type: "point",
                    coord: [1, 1],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
                {
                    type: "point",
                    coord: [2, 2],
                    color: "blue",
                    filled: true,
                    labels: [],
                },
            ],
            color: "blue",
            lineStyle: "solid",
            showPoint1: true,
            showPoint2: true,
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Line A",
        });
    });
});

describe("generateIGLockedVector", () => {
    it("builds a default locked vector", () => {
        // Arrange, Act
        const lockedVector = generateIGLockedVector();

        // Assert
        expect(lockedVector).toEqual({
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

    it("builds a locked vector with all props", () => {
        // Arrange, Act
        const lockedVector = generateIGLockedVector({
            points: [
                [1, 1],
                [2, 2],
            ],
            color: "blue",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Vector A",
        });

        // Assert
        expect(lockedVector).toEqual({
            type: "vector",
            points: [
                [1, 1],
                [2, 2],
            ],
            color: "blue",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Vector A",
        });
    });
});

describe("generateIGLockedEllipse", () => {
    it("builds a default locked ellipse", () => {
        // Arrange, Act
        const lockedEllipse = generateIGLockedEllipse();

        // Assert
        expect(lockedEllipse).toEqual({
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

    it("builds a locked ellipse with all props", () => {
        // Arrange, Act
        const lockedEllipse = generateIGLockedEllipse({
            center: [0, 0],
            radius: [1, 1],
            angle: 0,
            color: "blue",
            fillStyle: "solid",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Ellipse A",
        });

        // Assert
        expect(lockedEllipse).toEqual({
            type: "ellipse",
            center: [0, 0],
            radius: [1, 1],
            angle: 0,
            color: "blue",
            fillStyle: "solid",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Ellipse A",
        });
    });
});

describe("generateIGLockedPolygon", () => {
    it("builds a default locked polygon", () => {
        // Arrange, Act
        const lockedPolygon = generateIGLockedPolygon();

        // Assert
        expect(lockedPolygon).toEqual({
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

    it("builds a locked polygon with all props", () => {
        // Arrange, Act
        const lockedPolygon = generateIGLockedPolygon({
            points: [
                [1, 1],
                [2, 2],
                [3, 3],
            ],
            color: "blue",
            showVertices: true,
            fillStyle: "solid",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Polygon A",
        });

        // Assert
        expect(lockedPolygon).toEqual({
            type: "polygon",
            points: [
                [1, 1],
                [2, 2],
                [3, 3],
            ],
            color: "blue",
            showVertices: true,
            fillStyle: "solid",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Polygon A",
        });
    });
});

describe("generateIGLockedFunction", () => {
    it("builds a default locked function", () => {
        // Arrange, Act
        const lockedFunction = generateIGLockedFunction();

        // Assert
        expect(lockedFunction).toEqual({
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

    it("builds a locked function with all props", () => {
        // Arrange, Act
        const lockedFunction = generateIGLockedFunction({
            equation: "x^2",
            directionalAxis: "y",
            domain: [-10, 10],
            color: "blue",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Function A",
        });

        // Assert
        expect(lockedFunction).toEqual({
            type: "function",
            equation: "x^2",
            directionalAxis: "y",
            domain: [-10, 10],
            color: "blue",
            strokeStyle: "dashed",
            weight: "medium",
            labels: [
                {
                    type: "label",
                    coord: [2, 2],
                    color: "blue",
                    size: "medium",
                    text: "A",
                },
            ],
            ariaLabel: "Function A",
        });
    });
});

describe("generateIGLockedLabel", () => {
    it("builds a default locked label", () => {
        // Arrange, Act
        const lockedLabel = generateIGLockedLabel();

        // Assert
        expect(lockedLabel).toEqual({
            type: "label",
            coord: [0, 0],
            text: "label",
            color: "grayH",
            size: "medium",
        });
    });

    it("builds a locked label with all props", () => {
        // Arrange, Act
        const lockedLabel = generateIGLockedLabel({
            coord: [2, 2],
            text: "A",
            color: "blue",
            size: "medium",
        });

        // Assert
        expect(lockedLabel).toEqual({
            type: "label",
            coord: [2, 2],
            text: "A",
            color: "blue",
            size: "medium",
        });
    });
});
