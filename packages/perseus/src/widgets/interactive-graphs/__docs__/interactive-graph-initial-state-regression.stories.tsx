import {
    generateIGAbsoluteValueGraph,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGExponentialGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLogarithmGraph,
    generateIGNoneGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
    generateIGTangentGraph,
    generateIGVectorGraph,
    generateInteractiveGraphQuestion,
    generateTestPerseusItem,
    lockedFigureColorNames,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {sinusoidWithPiTicks} from "../interactive-graph.testdata";

import {interactiveGraphRendererDecorator} from "./interactive-graph-renderer-decorator";
import {lockedFiguresWithWeight} from "./utils";

import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";
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

/************** All graph type default states **************/

export const DefaultAbsoluteValueGraph: Story = {
    args: {
        graph: generateIGAbsoluteValueGraph(),
    },
};

export const DefaultExponentialGraph: Story = {
    args: {
        graph: generateIGExponentialGraph(),
    },
};

export const DefaultLinearGraph: Story = {
    args: {
        graph: generateIGLinearGraph(),
    },
};

export const DefaultLogarithmGraph: Story = {
    args: {
        graph: generateIGLogarithmGraph(),
    },
};

export const DefaultQuadraticGraph: Story = {
    args: {
        graph: generateIGQuadraticGraph(),
    },
};

export const DefaultSinusoidGraph: Story = {
    args: {
        graph: generateIGSinusoidGraph(),
    },
};

export const DefaultTangentGraph: Story = {
    args: {
        graph: generateIGTangentGraph(),
    },
};

export const DefaultAngleGraph: Story = {
    args: {
        graph: generateIGAngleGraph(),
    },
};

export const DefaultCircleGraph: Story = {
    args: {
        graph: generateIGCircleGraph(),
    },
};

export const DefaultLinearSystemGraph: Story = {
    args: {
        graph: generateIGLinearSystemGraph(),
    },
};

export const DefaultSegmentGraph: Story = {
    args: {
        graph: generateIGSegmentGraph(),
    },
};

export const DefaultSegmentGraphMultiple: Story = {
    args: {
        graph: generateIGSegmentGraph({numSegments: 2}),
    },
};

export const DefaultPointGraph: Story = {
    args: {
        graph: generateIGPointGraph(),
    },
};

export const DefaultPointGraphUnlimited: Story = {
    args: {
        graph: generateIGPointGraph({numPoints: "unlimited"}),
    },
};

export const DefaultPolygonGraph: Story = {
    args: {
        graph: generateIGPolygonGraph(),
    },
};

export const DefaultPolygonGraphUnlimited: Story = {
    args: {
        graph: generateIGPolygonGraph({numSides: "unlimited"}),
    },
};

export const DefaultRayGraph: Story = {
    args: {
        graph: generateIGRayGraph(),
    },
};

export const DefaultVectorGraph: Story = {
    args: {
        graph: generateIGVectorGraph(),
    },
};

/************** Graph type non-default states **************/

export const AngleGraphWithAnglesAndTooltips: Story = {
    args: {
        correct: generateIGAngleGraph({showAngles: true}),
        showTooltips: true,
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
};

export const CircleGraphRadius10CenterFarRight: Story = {
    args: {
        graph: generateIGCircleGraph({
            startCoords: {center: [10, 0], radius: 10},
        }),
    },
};

export const CircleGraphOverlyingLockedFigures: Story = {
    args: {
        graph: generateIGCircleGraph({
            startCoords: {center: [0, 0], radius: 5},
        }),
        lockedFigures: [
            generateIGLockedPolygon({
                points: [
                    [-6, -6],
                    [6, -6],
                    [6, 6],
                    [-6, 6],
                ],
                color: "green",
                fillStyle: "translucent",
            }),
            generateIGLockedPoint({coord: [0, 0], color: "pink"}),
            generateIGLockedPoint({coord: [4, 4], color: "purple"}),
        ],
    },
};

export const LinearBothPointsAtBottomEdge: Story = {
    args: {
        graph: generateIGLinearGraph({
            startCoords: [
                [-7, -10],
                [7, -10],
            ],
        }),
    },
};

export const LinearBothPointsAtSameSideEdge: Story = {
    args: {
        graph: generateIGLinearGraph({
            startCoords: [
                [-10, -5],
                [-10, 5],
            ],
        }),
    },
};

export const MultipleSegmentsOverlapping: Story = {
    args: {
        graph: generateIGSegmentGraph({
            numSegments: 2,
            startCoords: [
                [
                    [-6, 3],
                    [6, -3],
                ],
                [
                    [-6, -3],
                    [6, 3],
                ],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
};

/** Unlimited points graph seeded with two points (via `startCoords`). */
export const UnlimitedPointGraphWithTwoPoints: Story = {
    args: {
        correct: generateIGPointGraph({
            numPoints: "unlimited",
            coords: [
                [-3, 3],
                [3, -3],
            ],
        }),
        graph: generateIGPointGraph({
            numPoints: "unlimited",
            startCoords: [
                [-3, 3],
                [3, -3],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
};

/** Unlimited polygon - closed (via `startCoords`). */
export const UnlimitedPolygonThreePointsClosed: Story = {
    args: {
        graph: generateIGPolygonGraph({
            numSides: "unlimited",
            startCoords: [
                [2, 2],
                [2, -2],
                [-2, -2],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
};

// Verifies the default graph wrapped in a mobile container.
export const InMobileContainer: Story = {
    decorators: [interactiveGraphRendererDecorator, mobileDecorator],
    args: {},
};

// Verifies a circle graph rendered in a non-square viewport (mobile container).
export const CircleGraphWithNonsquareRange: Story = {
    decorators: [interactiveGraphRendererDecorator, mobileDecorator],
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

/************* Locked figures **************/

// Verifies a locked figure rendered in every available locked figure color.
export const LockedFiguresAllColors: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFigureColorNames.map((color, i) =>
            generateIGLockedLine({
                kind: "segment",
                color,
                weight: "thick",
                points: [
                    generateIGLockedPoint({coord: [-9, 9 - i * 3], color}),
                    generateIGLockedPoint({coord: [9, 9 - i * 3], color}),
                ],
            }),
        ),
    },
};

// Verifies all locked figure types rendered with thin stroke weight, in both
// solid and dashed line styles for every locked figure type.
export const LockedFiguresWithThinWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("thin"),
    },
};

// Verifies all locked figure types rendered with medium stroke weight, in both
// solid and dashed line styles for every locked figure type.
export const LockedFiguresWithMediumWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("medium"),
    },
};

// Verifies all locked figure types rendered with thick stroke weight, in both
// solid and dashed line styles for every locked figure type.
export const LockedFiguresWithThickWeight: Story = {
    args: {
        correct: generateIGNoneGraph(),
        lockedFigures: lockedFiguresWithWeight("thick"),
    },
};

// Verifies points on the graph boundary (corners and edge midpoints) render as
// full circles rather than being clipped in half.
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
    args: {
        graph: generateIGLinearGraph(),
    },
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
