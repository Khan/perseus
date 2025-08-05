import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {success} from "../result";

import {
    parseInteractiveGraphWidget,
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
        const onAxisResult = parse(
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
                    correct: {
                        type: "linear",
                    },
                    labelLocation: "onAxis",
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(onAxisResult).toEqual(
            success({
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
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    labelLocation: "onAxis",
                    lockedFigures: [],
                },
            }),
        );
    });

    it("parses alongEdge labelLocation correctly", () => {
        const alongEdgeResult = parse(
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
                    correct: {
                        type: "linear",
                    },
                    labelLocation: "alongEdge",
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(alongEdgeResult).toEqual(
            success({
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
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    labelLocation: "alongEdge",
                    lockedFigures: [],
                },
            }),
        );
    });

    it("parses empty strings as onAxis", () => {
        const emptyLabelLocationResult = parse(
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
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    labelLocation: "",
                },
            },
            parseInteractiveGraphWidget,
        );

        expect(emptyLabelLocationResult).toEqual(
            success({
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
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    labelLocation: "onAxis",
                    lockedFigures: [],
                },
            }),
        );
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

    it("parses when labelLocation is not provided", () => {
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
                    correct: {
                        type: "linear",
                    },
                    lockedFigures: [],
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
                    correct: {
                        type: "linear",
                    },
                    graph: {
                        type: "linear",
                    },
                    lockedFigures: [],
                },
            }),
        );
    });
});
