import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

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
    absoluteValueWithCustomLabelsQuestion,
    angleWithCustomLabelsQuestion,
    circleWithCustomLabelsQuestion,
    exponentialQuestion,
    exponentialWithCustomLabelsQuestion,
    logarithmQuestion,
    logarithmWithCustomLabelsQuestion,
    quadraticWithCustomLabelsQuestion,
    sinusoidQuestion,
    sinusoidWithCustomLabelsQuestion,
    tangentQuestion,
    tangentWithCustomLabelsQuestion,
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
    selectableLockedFiguresQuestion,
    selectableLockedTriangleQuestion,
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

/**
 * An angle whose vertex and two side points are named "B", "A", and "C"
 * via `pointLabels`. The schema array is indexed by `coords`:
 * `[endingSide, vertex, startingSide]`. Overrides the default "Point 1,
 * vertex …" / "Point 2, ending side …" / "Point 3, starting side …"
 * announcements so JAWS reads the prompt's letter names instead.
 */
export const AngleWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: angleWithCustomLabelsQuestion,
        }),
    },
};

export const Circle: Story = {
    args: {
        item: generateTestPerseusItem({question: circleQuestion}),
    },
};

/**
 * A circle whose radius point is named "R" via `pointLabels`. Schema
 * `string[]` for circle is interpreted as `[radiusPointLabel]` — only
 * the radius point (a `MovablePoint`) is labelable. The center is a
 * `MovableCircle` whose announcement describes the whole shape and is
 * intentionally not overridden.
 */
export const CircleWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: circleWithCustomLabelsQuestion,
        }),
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

/**
 * An exponential graph whose two curve points are named "A" and "B" via
 * `pointLabels`, so JAWS announces "Point A / B at …" instead of the
 * default "Point 1 / 2 at …". The asymptote handle's announcement is
 * unaffected — `pointLabels` only covers the curve's control points.
 */
export const ExponentialWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: exponentialWithCustomLabelsQuestion,
        }),
    },
};

export const Sinusoid: Story = {
    args: {
        item: generateTestPerseusItem({question: sinusoidQuestion}),
    },
};

/**
 * A sinusoid whose midline intersection and extremum are named "A" and "B"
 * via `pointLabels`. Overrides the default "Midline intersection at …" /
 * "Maximum point at …" semantic labels so the SR announcement matches the
 * prompt's naming convention.
 */
export const SinusoidWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: sinusoidWithCustomLabelsQuestion,
        }),
    },
};

export const Logarithm: Story = {
    args: {
        item: generateTestPerseusItem({question: logarithmQuestion}),
    },
};

/**
 * A logarithm whose two curve points are named "A" and "B" via
 * `pointLabels`, so JAWS announces "Point A / B at …" instead of the
 * default "Point 1 / 2 at …". The vertical asymptote handle's
 * announcement is unaffected.
 */
export const LogarithmWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: logarithmWithCustomLabelsQuestion,
        }),
    },
};

export const Tangent: Story = {
    args: {
        item: generateTestPerseusItem({question: tangentQuestion}),
    },
};

/**
 * A tangent whose inflection point and control point are named "A" and "B"
 * via `pointLabels`. Overrides the default "Inflection point" / "Control
 * point" semantic labels.
 */
export const TangentWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: tangentWithCustomLabelsQuestion,
        }),
    },
};

/**
 * A quadratic whose three control points are named "A", "B", "C" via
 * `pointLabels`. Overrides the default "Point N on parabola …" labels so
 * the SR announcement matches the prompt's naming convention.
 */
export const QuadraticWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: quadraticWithCustomLabelsQuestion,
        }),
    },
};

export const AbsoluteValue: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
    },
};

/**
 * An absolute value graph whose vertex and arm point are named "V" and
 * "A" via `pointLabels`. Overrides the default "Vertex point at …" /
 * "Point on arm at …" semantic labels so the SR announcement matches
 * the prompt's naming convention.
 */
export const AbsoluteValueWithCustomLabels: Story = {
    args: {
        item: generateTestPerseusItem({
            question: absoluteValueWithCustomLabelsQuestion,
        }),
    },
};

export const LockedPoints: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedPointsQuestion,
        }),
    },
};

export const SelectableLockedFigures: Story = {
    args: {
        item: generateTestPerseusItem({
            question: selectableLockedFiguresQuestion,
        }),
        apiOptions: {
            ...defaultApiOptions,
            selectionCallback: (index) => {
                // TODO: Remove after selectable locked figure prototype debugging.
                // eslint-disable-next-line no-console
                console.log("selectionCallback", index);
            },
        },
    },
};

export const SelectableLockedTriangle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: selectableLockedTriangleQuestion,
        }),
        apiOptions: {
            ...defaultApiOptions,
            selectionCallback: (index) => {
                // TODO: Remove after selectable locked figure prototype debugging.
                // eslint-disable-next-line no-console
                console.log("selectionCallback", index);
            },
        },
    },
};

/**
 * The host (some external surface — a side panel, transcript, hint, control,
 * etc.) can "spotlight" a locked figure by setting
 * `apiOptions.spotlightedLockedFigureIndex`. This is host-driven and has no
 * user interaction: the named figure is simply called out.
 *
 * Things to try with the buttons below (which stand in for the host):
 * - Spotlight the gray point or gray segment: those are NOT user-selectable,
 *   yet the host can still call them out — spotlight is independent of
 *   selectability.
 * - Spotlight a figure, then click that same figure to select it: the
 *   spotlight disappears because selection takes precedence on a shared figure.
 * - Spotlight one figure and select a different one: both indicators show.
 */
export const SpotlightedLockedFigure: Story = {
    render: function Render() {
        const [spotlightedLockedFigureIndex, setSpotlightedLockedFigureIndex] =
            React.useState<number | null>(2);

        const choices: ReadonlyArray<{label: string; index: number | null}> = [
            {label: "Spotlight: none", index: null},
            {label: "Point 0 — green (selectable)", index: 0},
            {label: "Point 2 — gray (not selectable)", index: 2},
            {label: "Segment 4 — purple (selectable)", index: 4},
            {label: "Segment 5 — gray (not selectable)", index: 5},
        ];

        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                    }}
                >
                    {choices.map(({label, index}) => (
                        <Button
                            key={label}
                            kind={
                                spotlightedLockedFigureIndex === index
                                    ? "primary"
                                    : "secondary"
                            }
                            size="small"
                            onClick={() =>
                                setSpotlightedLockedFigureIndex(index)
                            }
                        >
                            {label}
                        </Button>
                    ))}
                </View>
                <ServerItemRendererWithDebugUI
                    item={generateTestPerseusItem({
                        question: selectableLockedFiguresQuestion,
                    })}
                    apiOptions={{
                        ...defaultApiOptions,
                        spotlightedLockedFigureIndex,
                        selectionCallback: (index) => {
                            // TODO: Remove after spotlight prototype debugging.
                            // eslint-disable-next-line no-console
                            console.log("selectionCallback", index);
                        },
                    }}
                />
            </View>
        );
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
