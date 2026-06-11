import {
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
    generateIGNoneGraph,
    generateIGPolygonGraph,
    generateIGSegmentGraph,
    generateInteractiveGraphQuestion,
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {sinusoidWithPiTicks} from "../interactive-graph.testdata";

import {interactiveGraphRendererDecorator} from "./interactive-graph-renderer-decorator";

import type {
    LockedFigure,
    PerseusInteractiveGraphWidgetOptions,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusInteractiveGraphWidgetOptions> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Interactive Graph widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [
        // Add margin so we can look at individual story canvases for
        // graphs that have axis ticks off the graph.
        (Story) => (
            <View style={{marginInlineStart: 32}}>
                <Story />
            </View>
        ),
        interactiveGraphRendererDecorator,
    ],
};
export default meta;

type Story = StoryObj<typeof meta>;

function MobileContainerDecorator(Story) {
    return (
        <div className="framework-perseus perseus-mobile">
            <Story />
        </div>
    );
}

// Verifies the default graph rendering with TeX-flavored axis labels.
export const CustomAxisLabels: Story = {
    args: {
        labels: ["\\text{Custom $x$ label}", "\\text{Custom $y$ label}"],
    },
};

// Verifies grid lines drawn at fractional intervals.
export const FractionalGridStep: Story = {
    args: {
        gridStep: [2.571, 3.123],
    },
};

// Verifies axis tick labels rendered at fractional positions.
export const FractionalAxisTicks: Story = {
    args: {
        step: [1.5, 1.5],
    },
};

// Verifies the "axes" markings variant — axis lines/ticks/labels but no grid.
export const AxesMarkings: Story = {
    args: {
        markings: "axes",
    },
};

// Verifies the "grid" markings variant — grid lines but no axis labels.
export const GridMarkings: Story = {
    args: {
        markings: "grid",
    },
};

// Verifies the "none" markings variant — no axes, ticks, or grid.
export const NoMarkings: Story = {
    args: {
        markings: "none",
    },
};

// Verifies axis tick density on a small range (-2 to 2).
export const SmallRange: Story = {
    args: {
        range: [
            [-2, 2],
            [-2, 2],
        ],
    },
};

// Verifies axis tick density on a large range (-50 to 50).
export const LargeRange: Story = {
    args: {
        range: [
            [-50, 50],
            [-50, 50],
        ],
    },
};

// Verifies y-axis positioning when xMin is exactly 0 (axis flush with left edge).
export const YAxisAtLeft: Story = {
    args: {
        range: [
            [0, 20],
            [-10, 10],
        ],
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [1, 1]}),
                    generateIGLockedPoint({coord: [5, 2]}),
                ],
            }),
        ],
    },
};

// Verifies y-axis positioning when xMin is slightly negative (axis near left edge).
export const YAxisNearLeft: Story = {
    args: {
        range: [
            [-1, 20],
            [-10, 10],
        ],
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [1, 1]}),
                    generateIGLockedPoint({coord: [5, 2]}),
                ],
            }),
        ],
    },
};

// Verifies y-axis positioning when xMin is moderately negative.
export const YAxisJustOverLeft: Story = {
    args: {
        range: [
            [-3, 20],
            [-10, 10],
        ],
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [1, 1]}),
                    generateIGLockedPoint({coord: [5, 2]}),
                ],
            }),
        ],
    },
};

// Verifies the y-axis is hidden when xMin is positive (axis off the left edge).
export const YAxisOffLeft: Story = {
    args: {
        range: [
            [1, 20],
            [-10, 10],
        ],
    },
};

// Verifies the y-axis is hidden when xMin is well above 0.
export const YAxisOffFarLeft: Story = {
    args: {
        range: [
            [6, 20],
            [-10, 10],
        ],
    },
};

// Verifies y-axis flush with the right edge when xMax is 0.
export const YAxisAtRight: Story = {
    args: {
        range: [
            [-20, 0],
            [-10, 10],
        ],
    },
};

// Verifies the y-axis is hidden when xMax is slightly negative.
export const YAxisOffRight: Story = {
    args: {
        range: [
            [-20, -1],
            [-10, 10],
        ],
    },
};

// Verifies the y-axis is hidden when xMax is well below 0.
export const YAxisOffFarRight: Story = {
    args: {
        range: [
            [-20, -6],
            [-10, 10],
        ],
    },
};

// Verifies x-axis flush with the bottom edge when yMin is exactly 0.
export const XAxisAtBottom: Story = {
    args: {
        range: [
            [-10, 10],
            [0, 20],
        ],
    },
};

// Verifies x-axis positioning when yMin is slightly negative.
export const XAxisNearBottom: Story = {
    args: {
        range: [
            [-10, 10],
            [-1, 20],
        ],
    },
};

// Verifies the x-axis is hidden when yMin is positive.
export const XAxisOffBottom: Story = {
    args: {
        range: [
            [-10, 10],
            [1, 20],
        ],
    },
};

// Verifies x-axis positioning when yMin is moderately negative.
export const XAxisJustOverBottom: Story = {
    args: {
        range: [
            [-10, 10],
            [-3, 20],
        ],
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [-3, 2]}),
                    generateIGLockedPoint({coord: [5, 16]}),
                ],
            }),
        ],
    },
};

// Verifies x-axis flush with the top edge when yMax is exactly 0.
export const XAxisAtTop: Story = {
    args: {
        range: [
            [-10, 10],
            [-20, 0],
        ],
    },
};

// Verifies the x-axis is hidden when yMax is slightly negative.
export const XAxisOffTop: Story = {
    args: {
        range: [
            [-10, 10],
            [-20, -1],
        ],
    },
};

// Verifies axis labels rendered alongside the graph edge.
export const LabelsAlongEdge: Story = {
    args: {
        range: [
            [-10, 10],
            [-10, 10],
        ],
        labels: ["Video Game Hours per Week", "Reaction Time (milliseconds)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels when both axes start at 0.
export const LabelsAlongEdgeAtLeft: Story = {
    args: {
        range: [
            [0, 10],
            [0, 10],
        ],
        labels: ["Video Game Hours per Week", "Reaction Time (milliseconds)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels with both ranges starting just past 0.
export const LabelsAlongEdgeJustOverLeft: Story = {
    args: {
        range: [
            [-1, 10],
            [-1, 10],
        ],
        labels: ["Video Game Hours per Week", "Reaction Time (milliseconds)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels at very small ranges with high tick density.
export const LabelsAlongEdgeAtRight: Story = {
    args: {
        range: [
            [0, 0.01],
            [0, 0.01],
        ],
        step: [0.001, 0.001],
        gridStep: [0.001, 0.001],
        labels: ["Video Game Hours per Week", "Reaction Time (milliseconds)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels at non-symmetric ranges close to zero.
export const LabelsAlongEdgeWithCloseToZeroXMin: Story = {
    args: {
        range: [
            [-0.03, 0.84],
            [-2.8, 63],
        ],
        step: [0.2, 10],
        gridStep: [0.05, 5],
        snapStep: [0.025, 2],
        labels: ["Time (seconds)", "Distance (meters)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels at the same proportions but multiplied by 1000.
export const LabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000: Story = {
    args: {
        range: [
            [-30, 840],
            [-2.8, 63],
        ],
        step: [200, 10],
        gridStep: [50, 5],
        snapStep: [25, 2],
        labels: ["Time (seconds)", "Distance (meters)"],
        labelLocation: "alongEdge",
    },
};

// Verifies alongEdge labels at a tightly zoomed range.
export const LabelsAlongEdgeZoomed: Story = {
    args: {
        range: [
            [0, 0.5],
            [0, 0.5],
        ],
        step: [0.1, 0.1],
        gridStep: [0.1, 0.1],
        labels: ["Video Game Hours per Week", "Reaction Time (milliseconds)"],
        labelLocation: "alongEdge",
    },
};

// Verifies the default graph wrapped in a mobile container.
export const InMobileContainer: Story = {
    decorators: [interactiveGraphRendererDecorator, MobileContainerDecorator],
    args: {},
};

// Verifies a segment graph with multiple segments rendered in the interactive blue color.
export const MultipleSegments: Story = {
    args: {
        correct: generateIGSegmentGraph({numSegments: 3}),
    },
};

// Verifies a circle graph rendered in a non-square viewport (mobile container).
export const CircleGraphWithNonsquareRange: Story = {
    decorators: [interactiveGraphRendererDecorator, MobileContainerDecorator],
    args: {
        correct: generateIGCircleGraph(),
        range: [
            [-10, 10],
            [-5, 5],
        ],
    },
};

// Verifies a line graph rendered in a non-square viewport.
export const LineGraphWithNonsquareRange: Story = {
    args: {
        range: [
            [-5, 5],
            [-10, 10],
        ],
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [-3, -3]}),
                    generateIGLockedPoint({coord: [3, 3]}),
                ],
            }),
        ],
    },
};

// Verifies multiple locked points using `lockedFigureColors` and the
// `semanticColor.core.background.base.default` background fill.
export const LockedPoints: Story = {
    args: {
        lockedFigures: [
            generateIGLockedPoint({coord: [3, 2]}),
            generateIGLockedPoint({coord: [-1, 1]}),
            generateIGLockedPoint({coord: [0, -4]}),
        ],
    },
};

// Verifies locked points sitting exactly on the graph boundary render as full
// circles rather than being clipped in half. Uses a first-quadrant range (like
// the reported bug) so the axes sit on the bottom/left edges, and places points
// at each edge midpoint and each corner. Locked points are rendered in an
// unclipped layer (see mafs-graph.tsx) precisely so boundary points like these
// aren't cut off. (LEMS-4263)
export const LockedPointsAtGraphEdges: Story = {
    args: {
        range: [
            [0, 10],
            [0, 10],
        ],
        lockedFigures: [
            // Corners
            generateIGLockedPoint({coord: [0, 0]}),
            generateIGLockedPoint({coord: [10, 0]}),
            generateIGLockedPoint({coord: [0, 10]}),
            generateIGLockedPoint({coord: [10, 10]}),
            // Edge midpoints
            generateIGLockedPoint({coord: [5, 10]}),
            generateIGLockedPoint({coord: [5, 0]}),
            generateIGLockedPoint({coord: [0, 5]}),
            generateIGLockedPoint({coord: [10, 5]}),
        ],
    },
};

// Verifies the reported bug scenario (LEMS-4263): a graph whose ranges start at
// 0, with a locked point at the origin. The origin point sits on both the left
// and bottom edges and previously rendered as a quarter-circle when clipped.
export const LockedPointAtOrigin: Story = {
    args: {
        range: [
            [0, 8],
            [0, 80],
        ],
        step: [1, 10],
        gridStep: [1, 10],
        labels: ["time (s)", "distance (m)"],
        labelLocation: "alongEdge",
        lockedFigures: [
            generateIGLockedPoint({coord: [0, 0], color: "red", filled: true}),
            generateIGLockedPoint({coord: [2, 18], color: "red", filled: true}),
            generateIGLockedPoint({coord: [4, 43], color: "red", filled: true}),
        ],
    },
};

// Verifies a locked line connecting two locked points.
export const LockedLine: Story = {
    args: {
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [-1, 1]}),
                    generateIGLockedPoint({coord: [2, 3]}),
                ],
            }),
        ],
    },
};

// Verifies the protractor measurement tool (uses `--mafs-blue` from protractor.css).
export const Protractor: Story = {
    args: {
        correct: generateIGAngleGraph(),
        showProtractor: true,
    },
};

// Verifies axis tick labels rendered with multiples of pi using KaTeX font.
export const PiTicks: Story = {
    parameters: {
        question: sinusoidWithPiTicks,
    },
    args: {},
};

// Verifies the widget rendering when the answer-side data has been stripped
// (answerless rendering — covers the path used when a learner is mid-attempt).
export const AnswerlessData: Story = {
    parameters: {
        question: (() => {
            const question = generateInteractiveGraphQuestion();
            const answerfulItem = generateTestPerseusItem({question});
            const answerlessItem = splitPerseusItem(answerfulItem);
            return answerlessItem.question;
        })(),
    },
    args: {},
};

/* Locked figure weight regression tests */

function lockedFiguresWithWeight(
    weight: "thin" | "medium" | "thick",
): LockedFigure[] {
    return [
        generateIGLockedLine({
            kind: "segment",
            weight,
            points: [
                generateIGLockedPoint({coord: [2, 2]}),
                generateIGLockedPoint({coord: [9, 9]}),
            ],
        }),
        generateIGLockedLine({
            kind: "ray",
            weight,
            points: [
                generateIGLockedPoint({coord: [2, 1]}),
                generateIGLockedPoint({coord: [9, 8]}),
            ],
        }),
        generateIGLockedLine({
            kind: "line",
            weight,
            points: [
                generateIGLockedPoint({coord: [2, 0]}),
                generateIGLockedPoint({coord: [9, 7]}),
            ],
        }),
        generateIGLockedVector({
            points: [
                [4, -7],
                [7, -4],
            ],
            weight,
            color: "green",
        }),
        generateIGLockedEllipse({
            center: [-5, 5],
            radius: [1, 1],
            weight,
            color: "blue",
        }),
        generateIGLockedPolygon({
            points: [
                [-7.5, -3.5],
                [-6.5, -2.5],
                [-5.5, -3.5],
                [-6.5, -4.5],
            ],
            weight,
            color: "pink",
        }),
        generateIGLockedFunction({equation: "x^2", weight, color: "red"}),
    ];
}

// Verifies all locked figure types rendered with thin stroke weight.
export const LockedFiguresWithThinWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("thin"),
    },
};

// Verifies all locked figure types rendered with medium stroke weight.
export const LockedFiguresWithMediumWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("medium"),
    },
};

// Verifies all locked figure types rendered with thick stroke weight.
export const LockedFiguresWithThickWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("thick"),
    },
};

// Verifies the xMin axis arrow (uses --mafs-fg arrow color).
export const ShowXMinArrow: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: true, xMax: false, yMin: false, yMax: false},
    },
};

// Verifies the xMax axis arrow.
export const ShowXMaxArrow: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: false, xMax: true, yMin: false, yMax: false},
    },
};

// Verifies the yMin axis arrow.
export const ShowYMinArrow: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: false, xMax: false, yMin: true, yMax: false},
    },
};

// Verifies the yMax axis arrow.
export const ShowYMaxArrow: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: false, xMax: false, yMin: false, yMax: true},
    },
};

// Verifies all four axis arrows together.
export const ShowAllArrows: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: true, xMax: true, yMin: true, yMax: true},
    },
};

// Verifies axis rendering with no arrows.
export const ShowNoArrows: Story = {
    args: {
        correct: generateIGNoneGraph(),
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: false, xMax: false, yMin: false, yMax: false},
    },
};

// Verifies an ungraded interactive-graph widget.
export const Ungraded: Story = {
    parameters: {
        graded: false,
    },
    args: {},
};

// Verifies the static graph state — when `static` is true, interactive
// elements use `--static-gray` instead of `--mafs-blue`.
export const StaticGraph: Story = {
    parameters: {
        isStatic: true,
    },
    args: {
        correct: generateIGPolygonGraph({
            coords: [
                [-3, -2],
                [3, -2],
                [0, 4],
            ],
        }),
    },
};

// Verifies locked label rendering — covers the `rgba(255, 255, 255, 0.8)`
// background color used behind locked text labels and the `font.size` token.
export const LockedLabel: Story = {
    args: {
        lockedFigures: [
            generateIGLockedLabel({
                coord: [0, 0],
                text: "Origin",
                color: "blue",
                size: "medium",
            }),
            generateIGLockedLabel({
                coord: [3, -3],
                text: "y = x^2",
                color: "green",
                size: "small",
            }),
            generateIGLockedLabel({
                coord: [-5, -3],
                text: "Large label",
                color: "red",
                size: "large",
            }),
        ],
    },
};
