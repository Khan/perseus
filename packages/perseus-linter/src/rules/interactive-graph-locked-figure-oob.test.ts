import {
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
} from "@khanacademy/perseus-core";

import {expectPass, expectWarning} from "../__tests__/test-utils";
import Rule from "../rule";

import interactiveGraphLockedFigureOobRule from "./interactive-graph-locked-figure-oob";

import type {GraphRange, LockedFigure} from "@khanacademy/perseus-core";

function graphContext(lockedFigures: LockedFigure[], range: GraphRange) {
    return {
        widgets: {
            "interactive-graph 1": generateInteractiveGraphWidget({
                options: generateInteractiveGraphOptions({
                    range,
                    lockedFigures,
                }),
            }),
        },
    };
}

function expectFigureWarning(
    lockedFigures: LockedFigure[],
    range: GraphRange,
    messages: string[],
) {
    expectWarning(
        interactiveGraphLockedFigureOobRule,
        "[[☃ interactive-graph 1]]",
        graphContext(lockedFigures, range),
        {messages, severity: Rule.Severity.WARNING},
    );
}

function expectFigurePass(lockedFigures: LockedFigure[], range: GraphRange) {
    expectPass(
        interactiveGraphLockedFigureOobRule,
        "[[☃ interactive-graph 1]]",
        graphContext(lockedFigures, range),
    );
}

describe("interactive-graph-locked-figure-oob", () => {
    describe("point", () => {
        it("warns when the point is outside the graph bounds", () => {
            expectFigureWarning(
                [generateIGLockedPoint({coord: [11, 0]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                ["Locked point is outside the graph bounds."],
            );
        });

        it("passes when the point is inside the graph bounds", () => {
            expectFigurePass(
                [generateIGLockedPoint({coord: [3, -4]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });

        it("passes when the point is on the edge of the graph bounds", () => {
            expectFigurePass(
                [generateIGLockedPoint({coord: [10, -10]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    describe("line", () => {
        it("warns when both points of a line are outside the graph bounds", () => {
            expectFigureWarning(
                [
                    generateIGLockedLine({
                        kind: "line",
                        points: [
                            generateIGLockedPoint({coord: [-11, -11]}),
                            generateIGLockedPoint({coord: [11, -11]}),
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked line are outside the graph bounds.",
                ],
            );
        });

        it("warns when both points of a ray are outside the graph bounds", () => {
            expectFigureWarning(
                [
                    generateIGLockedLine({
                        kind: "ray",
                        points: [
                            generateIGLockedPoint({coord: [20, 0]}),
                            generateIGLockedPoint({coord: [30, 0]}),
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked ray are outside the graph bounds.",
                ],
            );
        });

        it("warns when both points of a segment are outside the graph bounds", () => {
            expectFigureWarning(
                [
                    generateIGLockedLine({
                        kind: "segment",
                        points: [
                            generateIGLockedPoint({coord: [0, 20]}),
                            generateIGLockedPoint({coord: [0, 30]}),
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked segment are outside the graph bounds.",
                ],
            );
        });

        it("passes when only one point of a line is outside the graph bounds", () => {
            expectFigurePass(
                [
                    generateIGLockedLine({
                        kind: "line",
                        points: [
                            generateIGLockedPoint({coord: [0, 0]}),
                            generateIGLockedPoint({coord: [20, 20]}),
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    describe("vector", () => {
        it("warns when the tail and tip are outside the graph bounds", () => {
            expectFigureWarning(
                [
                    generateIGLockedVector({
                        points: [
                            [11, 11],
                            [12, 12],
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked vector are outside the graph bounds.",
                ],
            );
        });

        it("passes when the tip is inside the graph bounds", () => {
            expectFigurePass(
                [
                    generateIGLockedVector({
                        points: [
                            [11, 11],
                            [5, 5],
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });

        it("passes when the tail is inside the graph bounds", () => {
            expectFigurePass(
                [
                    generateIGLockedVector({
                        points: [
                            [5, 5],
                            [11, 11],
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    describe("polygon", () => {
        it("warns when every vertex is outside the graph bounds", () => {
            expectFigureWarning(
                [
                    generateIGLockedPolygon({
                        points: [
                            [11, 11],
                            [12, 11],
                            [12, 12],
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked polygon are outside the graph bounds.",
                ],
            );
        });

        it("passes when some vertices are inside the graph bounds", () => {
            expectFigurePass(
                [
                    generateIGLockedPolygon({
                        points: [
                            [11, 11],
                            [12, 11],
                            [0, 0],
                        ],
                    }),
                ],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    describe("ellipse", () => {
        it("warns when a circle's center and edge are outside the graph bounds", () => {
            expectFigureWarning(
                [generateIGLockedEllipse({center: [15, 0], radius: [2, 2]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked circle are outside the graph bounds.",
                ],
            );
        });

        it("warns when an ellipse's center and vertices are outside the graph bounds", () => {
            expectFigureWarning(
                [generateIGLockedEllipse({center: [15, 0], radius: [2, 1]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                [
                    "All defining points for locked ellipse are outside the graph bounds.",
                ],
            );
        });

        it("passes when a circle's center is outside but its edge reaches into the graph", () => {
            expectFigurePass(
                [generateIGLockedEllipse({center: [12, 0], radius: [3, 3]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    it("does not warn for locked functions, even when they're off the graph", () => {
        expectFigurePass(
            [
                generateIGLockedFunction({
                    equation: "x",
                    directionalAxis: "x",
                    domain: [20, 30],
                }),
            ],
            [
                [-10, 10],
                [-10, 10],
            ],
        );
    });

    describe("label", () => {
        it("warns when the label is outside the graph bounds", () => {
            expectFigureWarning(
                [generateIGLockedLabel({coord: [0, -11]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
                ["Locked label is outside the graph bounds."],
            );
        });

        it("passes when the label is inside the graph bounds", () => {
            expectFigurePass(
                [generateIGLockedLabel({coord: [0, 9]})],
                [
                    [-10, 10],
                    [-10, 10],
                ],
            );
        });
    });

    it("reports each off-graph figure separately", () => {
        expectFigureWarning(
            [
                generateIGLockedPoint({coord: [11, 0]}),
                generateIGLockedLabel({coord: [13, 0]}),
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [11, 11]}),
                        generateIGLockedPoint({coord: [-11, -11]}),
                    ],
                }),
            ],
            [
                [-10, 10],
                [-10, 10],
            ],
            [
                "Locked point is outside the graph bounds.",
                "Locked label is outside the graph bounds.",
                "All defining points for locked line are outside the graph bounds.",
            ],
        );
    });

    it("passes when there are no locked figures", () => {
        expectFigurePass(
            [],
            [
                [-10, 10],
                [-10, 10],
            ],
        );
    });
});
