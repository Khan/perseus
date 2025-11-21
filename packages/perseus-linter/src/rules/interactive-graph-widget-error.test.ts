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
                "interactive-graph 1": {
                    options: {
                        lockedFigures: [
                            {
                                type: "line",
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
                                        coord: [0, 0],
                                        color: "grayH",
                                        filled: true,
                                        labels: [],
                                    },
                                ],
                            },
                        ],
                    },
                },
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
                "interactive-graph 1": {
                    options: {
                        lockedFigures: [
                            {
                                type: "polygon",
                                points: [
                                    [0, 0],
                                    [0, 0],
                                    [0, 0],
                                ],
                            },
                        ],
                    },
                },
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
                "interactive-graph 1": {
                    options: {
                        lockedFigures: [
                            {
                                type: "ellipse",
                                center: [0, 0],
                                radius: [-1, -1],
                                color: "grayH",
                                fillStyle: "none",
                                strokeStyle: "solid",
                                weight: "medium",
                                labels: [],
                            },
                        ],
                    },
                },
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
                "interactive-graph 1": {
                    options: {
                        lockedFigures: [
                            {
                                type: "ellipse",
                                center: [0, 0],
                                radius: [0, 0],
                                color: "grayH",
                                fillStyle: "none",
                                strokeStyle: "solid",
                                weight: "medium",
                                labels: [],
                            },
                        ],
                    },
                },
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
                "interactive-graph 1": {
                    options: {
                        correct: {
                            type: "polygon",
                            numSides: "unlimited",
                            coords: undefined,
                        },
                    },
                },
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
            "interactive-graph 1": {
                options: {},
            },
        },
    });
});
