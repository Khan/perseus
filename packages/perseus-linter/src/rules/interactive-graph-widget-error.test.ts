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
    it("warns when locked line has length 0", () => {
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
    });

    it("warns when locked polygon has all coordinates be the same", () => {
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
                message:
                    "Locked polygon cannot have all coordinates be the same.",
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("warns when locked ellipse has negative radius", () => {
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
    });

    it("warns when locked ellipse has zero radius", () => {
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
    });

    it("warns when unlimited polygon is open", () => {
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
    });

    it("warns when showPointLabels is true but pointLabels is missing (correct graph)", () => {
        expectWarning(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                showPointLabels: true,
                            }),
                        }),
                    }),
                },
            },
            {
                message:
                    "showPointLabels is true but pointLabels is missing. Provide a label for at least one point.",
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("warns when showPointLabels is true but every pointLabels entry is empty", () => {
        expectWarning(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: 3,
                                showPointLabels: true,
                                pointLabels: ["", "", ""],
                            }),
                        }),
                    }),
                },
            },
            {
                message:
                    "showPointLabels is true but every pointLabels entry is empty. Provide a label for at least one point.",
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("warns when showPointLabels is true on the starting (`graph`) graph too", () => {
        expectWarning(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            graph: generateIGPolygonGraph({
                                showPointLabels: true,
                            }),
                        }),
                    }),
                },
            },
            {
                message:
                    "showPointLabels is true but pointLabels is missing. Provide a label for at least one point.",
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("passes when showPointLabels is true and pointLabels is fully provided", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: 3,
                                showPointLabels: true,
                                pointLabels: ["A", "B", "C"],
                            }),
                        }),
                    }),
                },
            },
        );
    });

    it("passes when at least one pointLabels entry is non-empty (sparse array)", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: 3,
                                showPointLabels: true,
                                pointLabels: ["A", "", "C"],
                            }),
                        }),
                    }),
                },
            },
        );
    });

    it("warns when pointLabels is shorter than the expected number of points", () => {
        expectWarning(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: 3,
                                showPointLabels: true,
                                pointLabels: ["A", "C"],
                            }),
                        }),
                    }),
                },
            },
            {
                message:
                    'pointLabels has 2 entries but this graph type expects 3. Use empty strings ("") to skip labels for specific points, e.g. ["A", "", "C"].',
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("warns when pointLabels is longer than the expected number of points", () => {
        expectWarning(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: 3,
                                showPointLabels: true,
                                pointLabels: ["A", "B", "C", "D"],
                            }),
                        }),
                    }),
                },
            },
            {
                message:
                    'pointLabels has 4 entries but this graph type expects 3. Use empty strings ("") to skip labels for specific points, e.g. ["A", "", "C"].',
                severity: Rule.Severity.ERROR,
            },
        );
    });

    it("passes on an unlimited polygon (length check skipped when numSides is unlimited)", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                numSides: "unlimited",
                                // `coords` required so we don't trip the
                                // unrelated "Polygon must be closed" rule.
                                coords: [
                                    [0, 0],
                                    [1, 0],
                                    [0, 1],
                                ],
                                showPointLabels: true,
                                pointLabels: ["A", "B"],
                            }),
                        }),
                    }),
                },
            },
        );
    });

    it("passes when showPointLabels is false (no requirement on pointLabels)", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            correct: generateIGPolygonGraph({
                                showPointLabels: false,
                            }),
                        }),
                    }),
                },
            },
        );
    });

    it("passes when showPointLabels is absent on the `graph` field", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            graph: generateIGPolygonGraph({
                                pointLabels: ["A", "B", "C"],
                            }),
                        }),
                    }),
                },
            },
        );
    });

    it('passes when graph type is "none" even with showPointLabels true via a cast (defense-in-depth backstop)', () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            // The schema disallows showPointLabels on `none`, so we
                            // cast to assert the defensive guard fires when the
                            // backstop is asked to look at this shape.
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-syntax
                            correct: {
                                type: "none",
                                showPointLabels: true,
                            } as any,
                        }),
                    }),
                },
            },
        );
    });

    it('passes when graph type is "vector" (same rationale as "none")', () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            // The schema disallows showPointLabels on `vector`, so we
                            // cast to assert the defensive guard fires when the
                            // backstop is asked to look at this shape.
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-syntax
                            correct: {
                                type: "vector",
                                showPointLabels: true,
                            } as any,
                        }),
                    }),
                },
            },
        );
    });

    it("passes when no errors are detected", () => {
        expectPass(
            interactiveGraphWidgetErrorRule,
            "[[☃ interactive-graph 1]]",
            {
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
            },
        );
    });
});
