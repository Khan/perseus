import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ApiOptions} from "../../../perseus-api";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    linearSystemWithCustomLabelsQuestion,
    linearWithCustomLabelsQuestion,
    pointQuestion,
    pointWithCustomLabelQuestion,
    pointWithDefaultLabelQuestion,
    polygonQuestion,
    polygonWithCustomLabelsQuestion,
    rayQuestion,
    rayWithCustomLabelsQuestion,
    segmentQuestion,
    segmentWithCustomLabelsQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedLineQuestion,
    segmentWithAllLockedLineSegmentVariations,
    segmentWithAllLockedLineVariations,
    segmentWithAllLockedRayVariations,
    absoluteValueQuestion,
    exponentialQuestion,
    logarithmQuestion,
    sinusoidQuestion,
    tangentQuestion,
    vectorQuestion,
    segmentWithLockedEllipses,
    segmentWithLockedVectors,
    segmentWithLockedPolygons,
    staticGraphQuestion,
    staticGraphQuestionWithAnotherWidget,
    segmentWithLockedLabels,
    unlimitedPolygonQuestion,
    floatingPointIssueQuestion,
    ungradedQuestion,
    noTicks,
} from "../interactive-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta = {
    title: "Widgets/Interactive Graph",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to interact with mathematical graphs,\
                    supporting the creation and manipulation of various graph elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Angle: Story = {
    args: {
        item: generateTestPerseusItem({question: angleQuestion}),
    },
};

export const Circle: Story = {
    args: {
        item: generateTestPerseusItem({question: circleQuestion}),
    },
};

export const Linear: Story = {
    args: {
        item: generateTestPerseusItem({question: linearQuestion}),
    },
};

/**
 * A linear graph whose two endpoints are named "A" and "B" via `pointLabels`,
 * so JAWS announces "Point A at …" / "Point B at …" instead of the default
 * "Point 1 at …" / "Point 2 at …".
 */
export const LinearWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearWithCustomLabelsQuestion,
        }),
    },
};

export const LinearSystem: Story = {
    args: {
        item: generateTestPerseusItem({question: linearSystemQuestion}),
    },
};

/**
 * A linear system whose four interactive endpoints are named "A", "B", "C",
 * "D" via `pointLabels` (flat across both lines), so JAWS announces "Point
 * A / B / C / D at …" instead of the default "Point N on line N at …".
 */
export const LinearSystemWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearSystemWithCustomLabelsQuestion,
        }),
    },
};

export const Point: Story = {
    args: {
        item: generateTestPerseusItem({question: pointQuestion}),
    },
};

/**
 * A point graph whose interactive point uses a custom screen-reader label ("T")
 * via `pointLabels`, so the announcement matches the question prompt ("Plot point T …")
 * instead of the generic "Point 1 …".
 */
export const PointWithCustomLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: pointWithCustomLabelQuestion,
        }),
    },
};

/**
 * The same reference question as `PointWithCustomLabel`, but
 * with `pointLabels` omitted so the interactive point falls back to the
 * legacy numeric default — JAWS announces "Point 1 at …" even though
 * the prompt asks for point "T". Kept as a before/after comparison
 * against `PointWithCustomLabel`.
 */
export const PointWithDefaultLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: pointWithDefaultLabelQuestion,
        }),
    },
};

export const Polygon: Story = {
    args: {
        item: generateTestPerseusItem({question: polygonQuestion}),
    },
};

/**
 * A polygon graph whose vertices use custom screen-reader
 * labels ("A", "B", "C") via `pointLabels`, so the announcements
 * match the question prompt instead of the generic "Point 1/2/3 …".
 * Open with the Storybook a11y addon (or VoiceOver / JAWS) to verify
 * each vertex announces "Point A / B / C at …".
 */
export const PolygonWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: polygonWithCustomLabelsQuestion,
        }),
    },
};

export const UnlimitedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({question: unlimitedPolygonQuestion}),
    },
};

export const Ray: Story = {
    args: {
        item: generateTestPerseusItem({question: rayQuestion}),
    },
};

/**
 * A ray whose endpoint and through point are named "A" and "B" via
 * `pointLabels`. The default semantic "Endpoint at …" / "Through point at …"
 * labels are overridden so the SR announcement matches the prompt's
 * naming convention.
 */
export const RayWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: rayWithCustomLabelsQuestion,
        }),
    },
};

export const Vector: Story = {
    args: {
        item: generateTestPerseusItem({question: vectorQuestion}),
    },
};

export const Segment: Story = {
    args: {
        item: generateTestPerseusItem({question: segmentQuestion}),
    },
};

/**
 * A segment graph with two segments whose endpoints are named "A", "B",
 * "C", "D" via `pointLabels` (flat across all segments), so JAWS announces
 * "Point A / B / C / D at …" instead of the per-segment "Endpoint N on
 * segment N at …" defaults.
 */
export const SegmentWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithCustomLabelsQuestion,
        }),
    },
};

export const Exponential: Story = {
    args: {
        item: generateTestPerseusItem({question: exponentialQuestion}),
    },
};

export const Sinusoid: Story = {
    args: {
        item: generateTestPerseusItem({question: sinusoidQuestion}),
    },
};

export const Logarithm: Story = {
    args: {
        item: generateTestPerseusItem({question: logarithmQuestion}),
    },
};

export const Tangent: Story = {
    args: {
        item: generateTestPerseusItem({question: tangentQuestion}),
    },
};

export const AbsoluteValue: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
    },
};

export const LockedPoints: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedPointsQuestion,
        }),
    },
};

export const LockedLines: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedLineQuestion,
        }),
    },
};

export const AllLockedLineSegmentStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedLineSegmentVariations,
        }),
    },
};

export const AllLockedLineStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedLineVariations,
        }),
    },
};

export const AllLockedRayStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedRayVariations,
        }),
    },
};

export const LockedVector: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedVectors,
        }),
    },
};

export const LockedEllipse: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedEllipses,
        }),
    },
};

export const LockedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedPolygons,
        }),
    },
};

export const LockedLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedLabels,
        }),
    },
};

/**
 * Read only mode appears after a question is answered.
 */
export const PolygonReadOnly: Story = {
    args: {
        item: generateTestPerseusItem({
            question: polygonQuestion,
        }),
        apiOptions: {...defaultApiOptions, readOnly: true},
    },
};

/**
 * Content authors can specify if they want a graph to be static, which
 * makes the graph non-interactive. This is generally used for hints.
 */
export const StaticGraph: Story = {
    args: {
        item: generateTestPerseusItem({
            question: staticGraphQuestion,
        }),
    },
};

export const StaticGraphWithAnotherWidget: Story = {
    args: {
        item: generateTestPerseusItem({
            question: staticGraphQuestionWithAnotherWidget(),
        }),
    },
};

export const TooltipsWithFloatingPointIssues: Story = {
    args: {
        item: generateTestPerseusItem({
            question: floatingPointIssueQuestion,
        }),
    },
};

export const AnswerlessAngle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: angleQuestion,
        }),
    },
};

export const AnswerlessCircle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: circleQuestion,
        }),
    },
};

export const AnswerlessLinear: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearQuestion,
        }),
    },
};

export const AnswerlessLinearSystem: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearSystemQuestion,
        }),
    },
};

export const AnswerlessPoint: Story = {
    args: {
        item: generateTestPerseusItem({
            question: pointQuestion,
        }),
    },
};

export const AnswerlessPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: polygonQuestion,
        }),
    },
};

export const AnswerlessUnlimitedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: unlimitedPolygonQuestion,
        }),
    },
};

export const AnswerlessRay: Story = {
    args: {
        item: generateTestPerseusItem({
            question: rayQuestion,
        }),
    },
};

export const AnswerlessSegment: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentQuestion,
        }),
    },
};

export const AnswerlessSinusoid: Story = {
    args: {
        item: generateTestPerseusItem({
            question: sinusoidQuestion,
        }),
    },
};

export const Ungraded: Story = {
    args: {
        item: generateTestPerseusItem({
            question: ungradedQuestion,
        }),
    },
};

export const NoTicks: Story = {
    args: {
        item: generateTestPerseusItem({
            question: noTicks,
        }),
    },
};
