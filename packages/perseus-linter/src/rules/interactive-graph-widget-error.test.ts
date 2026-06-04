import {
    generateIGLockedEllipse,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGPolygonGraph,
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
} from "@khanacademy/perseus-core";

import {expectPass, expectWarning} from "../__tests__/test-utils";
import Rule from "../rule";

import interactiveGraphWidgetErrorRule from "./interactive-graph-widget-error";

describe("interactive-graph-widget-error", () => {
    // Error when locked line has length 0
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        lockedFigures: [
                            generateIGLockedLine({
                                points: [
                                    generateIGLockedPoint({coord: [0, 0]}),
                                    generateIGLockedPoint({coord: [0, 0]}),
                                ],
                            }),
                        ],
                    }),
                }),
            },
        },
        {
            message: "Locked line cannot have length 0.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when locked polygon has all coordinates be the same
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        lockedFigures: [
                            generateIGLockedPolygon({
                                points: [
                                    [0, 0],
                                    [0, 0],
                                    [0, 0],
                                ],
                            }),
                        ],
                    }),
                }),
            },
        },
        {
            message: "Locked polygon cannot have all coordinates be the same.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when locked ellipse has negative radius
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        lockedFigures: [
                            generateIGLockedEllipse({radius: [-1, -1]}),
                        ],
                    }),
                }),
            },
        },
        {
            message: "Locked ellipse must have positive radius values.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when locked ellipse has zero radius
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        lockedFigures: [
                            generateIGLockedEllipse({radius: [0, 0]}),
                        ],
                    }),
                }),
            },
        },
        {
            message: "Locked ellipse must have positive radius values.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when unlimited polygon is open
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        correct: generateIGPolygonGraph({
                            numSides: "unlimited",
                            coords: undefined,
                        }),
                    }),
                }),
            },
        },
        {
            message: "Polygon must be closed.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when showLabels is true but pointLabels is missing
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        correct: generateIGPolygonGraph({
                            showLabels: true,
                        }),
                    }),
                }),
            },
        },
        {
            message:
                "showLabels is true but pointLabels is missing. Provide a label for every point.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when showLabels is true but pointLabels has an empty entry
    expectWarning(
        interactiveGraphWidgetErrorRule,
        "[[☃ interactive-graph 1]]",
        {
            widgets: {
                "interactive-graph 1": generateInteractiveGraphWidget({
                    options: generateInteractiveGraphOptions({
                        correct: generateIGPolygonGraph({
                            showLabels: true,
                            pointLabels: ["A", "", "C"],
                        }),
                    }),
                }),
            },
        },
        {
            message:
                "showLabels is true but pointLabels has empty entries. Provide a label for every point.",
            severity: Rule.Severity.ERROR,
        },
    );

    // Pass when showLabels is true and pointLabels is fully provided
    expectPass(interactiveGraphWidgetErrorRule, "[[☃ interactive-graph 1]]", {
        widgets: {
            "interactive-graph 1": generateInteractiveGraphWidget({
                options: generateInteractiveGraphOptions({
                    correct: generateIGPolygonGraph({
                        showLabels: true,
                        pointLabels: ["A", "B", "C"],
                    }),
                }),
            }),
        },
    });

    // Pass when showLabels is false (no requirement on pointLabels)
    expectPass(interactiveGraphWidgetErrorRule, "[[☃ interactive-graph 1]]", {
        widgets: {
            "interactive-graph 1": generateInteractiveGraphWidget({
                options: generateInteractiveGraphOptions({
                    correct: generateIGPolygonGraph({
                        showLabels: false,
                    }),
                }),
            }),
        },
    });

    // Pass when no errors are detected
    expectPass(interactiveGraphWidgetErrorRule, "[[☃ interactive-graph 1]]", {
        widgets: {
            "interactive-graph 1": generateInteractiveGraphWidget({
                options: generateInteractiveGraphOptions({
                    correct: generateIGPolygonGraph({
                        numSides: "unlimited",
                        coords: [
                            [0, 0],
                            [2, 0],
                            [1, 1],
                        ],
                    }),
                    lockedFigures: [
                        generateIGLockedLine({
                            points: [
                                generateIGLockedPoint({coord: [0, 0]}),
                                generateIGLockedPoint({coord: [2, 3]}),
                            ],
                        }),
                        generateIGLockedPolygon({
                            points: [
                                [0, 0],
                                [0, 2],
                                [1, 1],
                            ],
                        }),
                        generateIGLockedEllipse({radius: [2, 2]}),
                    ],
                }),
            }),
        },
    });
});
