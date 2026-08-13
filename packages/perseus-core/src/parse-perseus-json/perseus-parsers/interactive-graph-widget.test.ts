import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {success} from "../result";

import {
    parseInteractiveGraphWidget,
    parseLabelLocation,
    parseLockedFigure,
    parseLockedFunctionDomain,
} from "./interactive-graph-widget";

describe("parseLockedFunctionDomain", () => {
    it("preserves finite numbers", () => {
        const result = parse([-7, 42], parseLockedFunctionDomain);
        expect(result).toEqual(success([-7, 42]));
    });

    it("rejects arrays with too many elements", () => {
        const result = parse([1, 2, 3], parseLockedFunctionDomain);
        expect(result).toEqual(anyFailure);
    });

    it("rejects arrays with too few elements", () => {
        const result = parse([1], parseLockedFunctionDomain);
        expect(result).toEqual(anyFailure);
    });

    it("defaults undefined to an unbounded domain [-Infinity, Infinity]", () => {
        const result = parse(undefined, parseLockedFunctionDomain);
        expect(result).toEqual(success([-Infinity, Infinity]));
    });

    it("defaults null to an unbounded domain [-Infinity, Infinity]", () => {
        const result = parse(null, parseLockedFunctionDomain);
        expect(result).toEqual(success([-Infinity, Infinity]));
    });

    it("converts a null minimum value to -Infinity", () => {
        const result = parse([null, 0], parseLockedFunctionDomain);
        expect(result).toEqual(success([-Infinity, 0]));
    });

    it("converts a null maximum value to Infinity", () => {
        const result = parse([0, null], parseLockedFunctionDomain);
        expect(result).toEqual(success([0, Infinity]));
    });

    it("defaults the min and max if both are null", () => {
        const result = parse([null, null], parseLockedFunctionDomain);
        expect(result).toEqual(success([-Infinity, Infinity]));
    });
});

describe("parseInteractiveGraphWidget", () => {
    it("parses onAxis labelLocation correctly", () => {
        const onAxisResult = parse("onAxis", parseLabelLocation);

        expect(onAxisResult).toEqual(success("onAxis"));
    });

    it("defaults text, color and size on a locked label when they are missing", () => {
        const result = parse(
            {
                type: "label",
                coord: [0, 0],
                text: undefined,
                color: undefined,
                size: undefined,
            },
            parseLockedFigure,
        );
        expect(result).toEqual(
            success({
                type: "label",
                coord: [0, 0],
                text: "",
                color: "grayH",
                size: "medium",
            }),
        );
    });

    it("parses alongEdge labelLocation correctly", () => {
        const alongEdgeResult = parse("alongEdge", parseLabelLocation);

        expect(alongEdgeResult).toEqual(success("alongEdge"));
    });

    it("parses empty strings as onAxis", () => {
        const emptyLabelLocationResult = parse("", parseLabelLocation);

        expect(emptyLabelLocationResult).toEqual(success("onAxis"));
    });

    it("rejects invalid labelLocation values", () => {
        const invalidResult = parse(
            {
                type: "interactive-graph",
                options: {
                    step: [1, 1],
                    markings: "grid",
                    showProtractor: false,
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    correct: {
                        type: "linear",
                    },
                    labelLocation: "invalid",
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(invalidResult).toEqual(anyFailure);
    });

    it("defaults labelLocation to onAxis", () => {
        const result = parse(undefined, parseLabelLocation);

        expect(result).toEqual(success("onAxis"));
    });

    it("parses the deprecated 'orange' color on locked figures to 'gold'", () => {
        const result = parse(
            {
                type: "point",
                coord: [0, 0],
                color: "orange",
                filled: true,
            },
            parseLockedFigure,
        );

        expect(result).toEqual(
            success({
                type: "point",
                coord: [0, 0],
                color: "gold",
                filled: true,
                labels: [],
            }),
        );
    });

    it("parses a fill-only ('none' stroke) locked polygon", () => {
        const result = parse(
            {
                type: "interactive-graph",
                options: {
                    step: [1, 1],
                    markings: "grid",
                    showProtractor: false,
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
                    showAxisTicks: {x: true, y: true},
                    correct: {
                        type: "linear",
                    },
                    lockedFigures: [
                        {
                            type: "polygon",
                            points: [
                                [0, 0],
                                [1, 0],
                                [1, 1],
                            ],
                            color: "blue",
                            showVertices: false,
                            fillStyle: "translucent",
                            strokeStyle: "none",
                            weight: "thin",
                        },
                    ],
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(result).toEqual(
            success({
                type: "interactive-graph",
                options: {
                    step: [1, 1],
                    markings: "grid",
                    showProtractor: false,
                    showTooltips: false,
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
                    showAxisTicks: {x: true, y: true},
                    labelLocation: "onAxis",
                    labels: ["$x$", "$y$"],
                    backgroundImage: {url: null},
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    lockedFigures: [
                        {
                            type: "polygon",
                            points: [
                                [0, 0],
                                [1, 0],
                                [1, 1],
                            ],
                            color: "blue",
                            showVertices: false,
                            fillStyle: "translucent",
                            strokeStyle: "none",
                            weight: "thin",
                            labels: [],
                        },
                    ],
                },
            }),
        );
    });

    it("rejects unrecognized color names on locked figures", () => {
        const result = parse(
            {
                type: "interactive-graph",
                options: {
                    step: [1, 1],
                    markings: "grid",
                    showProtractor: false,
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
                    showAxisTicks: {x: true, y: true},
                    correct: {
                        type: "linear",
                    },
                    lockedFigures: [
                        {
                            type: "point",
                            coord: [0, 0],
                            color: "chartreuse",
                            filled: true,
                        },
                    ],
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(result).toEqual(anyFailure);
    });
});
