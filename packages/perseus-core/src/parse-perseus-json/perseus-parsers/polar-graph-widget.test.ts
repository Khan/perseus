import {anyFailure} from "../general-purpose-parsers/parser.testutils";
import {parse} from "../parse";
import {success} from "../result";

import {parsePolarGraphWidget} from "./polar-graph-widget";

const validWidget = {
    type: "polar-graph",
    graded: true,
    version: {major: 0, minor: 0},
    options: {
        maxRadius: 5,
        radiusStep: 1,
        angleStepDegrees: 15,
        angleUnit: "degrees",
        graph: {type: "point", numPoints: 1},
        correct: {type: "point", numPoints: 1, coords: [[3, 0]]},
        lockedFigures: [],
        lockedLabels: [],
    },
};

describe("parsePolarGraphWidget", () => {
    it("accepts a point graph with its answer", () => {
        // Arrange, Act
        const result = parse(validWidget, parsePolarGraphWidget);

        // Assert
        expect(result).toEqual(success(validWidget));
    });

    it("accepts answerless data with no correct field", () => {
        // Arrange, Act
        const {correct: _, ...options} = validWidget.options;

        const result = parse({...validWidget, options}, parsePolarGraphWidget);

        // Assert
        expect(result).toEqual(success({...validWidget, options}));
    });

    it("rejects an angle unit it does not know", () => {
        // Arrange, Act
        const result = parse(
            {
                ...validWidget,
                options: {...validWidget.options, angleUnit: "gradians"},
            },
            parsePolarGraphWidget,
        );

        // Assert
        expect(result).toEqual(anyFailure);
    });

    it("rejects a graph sub-type it does not know", () => {
        // Arrange, Act
        const result = parse(
            {
                ...validWidget,
                options: {...validWidget.options, graph: {type: "spiral"}},
            },
            parsePolarGraphWidget,
        );

        // Assert
        expect(result).toEqual(anyFailure);
    });
});

describe("parsePolarGraphWidget sub-types", () => {
    function withGraph(graph: unknown, correct: unknown = graph) {
        return {
            ...validWidget,
            options: {...validWidget.options, graph, correct},
        };
    }

    it.each([
        ["ray", {type: "ray", coords: [[3, 0]]}],
        [
            "angle",
            {
                type: "angle",
                showAngles: true,
                match: "congruent",
                coords: [
                    [3, 0],
                    [0, 3],
                ],
            },
        ],
        ["circle", {type: "circle", coords: [[3, 0]]}],
        [
            "limacon",
            {
                type: "limacon",
                coords: [
                    [4, 0],
                    [0, 0],
                ],
            },
        ],
        ["rose", {type: "rose", k: 3, coords: [[4, 0]]}],
        [
            "fixed-count rose",
            {type: "rose", k: 3, fixedK: true, coords: [[4, 0]]},
        ],
        ["lemniscate", {type: "lemniscate", coords: [[3, 0]]}],
    ])("accepts a %s graph", (_name, graph) => {
        const widget = withGraph(graph);

        expect(parse(widget, parsePolarGraphWidget)).toEqual(success(widget));
    });

    it("rejects a limaçon without exactly two control points", () => {
        // Arrange, Act
        const widget = withGraph({type: "limacon", coords: [[4, 0]]});

        // Assert
        expect(parse(widget, parsePolarGraphWidget)).toEqual(anyFailure);
    });

    it("rejects an angle with an unknown match mode", () => {
        // Arrange, Act
        const widget = withGraph({
            type: "angle",
            match: "similar",
            coords: [
                [3, 0],
                [0, 3],
            ],
        });

        // Assert
        expect(parse(widget, parsePolarGraphWidget)).toEqual(anyFailure);
    });
});

describe("parsePolarGraphWidget locked figures", () => {
    const lockedCircle = {
        figure: {type: "circle", coords: [[3, 0]]},
        color: "purple",
        strokeStyle: "none",
        weight: "thick",
        filled: true,
        fillStyle: "translucent",
        labels: [
            {
                type: "label",
                coord: [3, 1],
                text: "$r = 3$",
                color: "purple",
                size: "medium",
            },
        ],
        ariaLabel: "The circle r = 3",
    };

    it("accepts locked figures with style, labels and aria label", () => {
        // Arrange
        const widget = {
            ...validWidget,
            options: {
                ...validWidget.options,
                lockedFigures: [lockedCircle],
                lockedLabels: [
                    {
                        type: "label",
                        coord: [0, 5],
                        text: "90°",
                        color: "grayH",
                        size: "small",
                    },
                ],
            },
        };

        // Act, Assert
        expect(parse(widget, parsePolarGraphWidget)).toEqual(success(widget));
    });

    it("rejects a locked figure colour outside the palette", () => {
        // Arrange
        const widget = {
            ...validWidget,
            options: {
                ...validWidget.options,
                lockedFigures: [{...lockedCircle, color: "teal"}],
            },
        };

        // Act, Assert
        expect(parse(widget, parsePolarGraphWidget)).toEqual(anyFailure);
    });
});
