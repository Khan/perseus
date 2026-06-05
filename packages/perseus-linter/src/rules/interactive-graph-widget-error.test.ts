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
                                    {coord: [0, 0], showAngle: false},
                                    {coord: [0, 0], showAngle: false},
                                    {coord: [0, 0], showAngle: false},
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
                                {coord: [0, 0], showAngle: false},
                                {coord: [0, 2], showAngle: false},
                                {coord: [1, 1], showAngle: false},
                            ],
                        }),
                        generateIGLockedEllipse({radius: [2, 2]}),
                    ],
                }),
            }),
        },
    });
});
