import * as React from "react";

import {Flipbook} from "../../../../../dev/flipbook";
import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearQuestionWithLockedPoints,
    linearSystemQuestion,
    pointQuestion,
    polygonQuestion,
    rayQuestion,
    segmentQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedLineQuestion,
    segmentWithAllLockedLineSegmentVariations,
    sinusoidQuestion,
    segmentWithAllLockedLineVariations,
} from "../__testdata__/interactive-graph.testdata";
import {
    interactiveGraphQuestionBuilder
} from "../interactive-graphs/interactive-graph-question-builder";
import Renderer from "../../renderer";
import {PerseusRenderer} from "@khanacademy/perseus";

export default {
    title: "Perseus/Widgets/Interactive Graph",
};

type StoryArgs = Record<any, any>;

export const SideBySideFlipbook = (args: StoryArgs): React.ReactElement => (
    <Flipbook />
);

export const MafsWithCustomAxisLabels = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withAxisLabels("\\text{Custom $x$ label}", "\\text{Custom $y$ label}")
            .build()} />
);

export const MafsWithFractionalGridStep = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withGridStep(2.571, 3.123)
            .build()} />
);

export const MafsWithFractionalAxisTicks = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withTickStep(1.5, 1.5)
            .build()} />
);

export const MafsWithGridMarkings = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withMarkings("grid")
            .build()} />
);

export const MafsWithNoMarkings = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withMarkings("none")
            .build()} />
);

export const MafsWithSmallRange = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(-2, 2)
            .withYRange(-2, 2)
            .build()} />
);

export const MafsWithLargeRange = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(-50, 50)
            .withYRange(-50, 50)
            .build()} />
);

export const MafsWithYAxisAtLeft = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(0, 20)
            .build()} />
);

export const MafsWithYAxisNearLeft = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(-1, 20)
            .build()} />
);

export const MafsWithYAxisOffLeft = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(1, 20)
            .build()} />
);

export const MafsWithYAxisAtRight = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(-20, 0)
            .build()} />
);

export const MafsWithYAxisOffRight = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withXRange(-20, -1)
            .build()} />
);

export const MafsWithXAxisAtBottom = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withYRange(0, 20)
            .build()} />
);

export const MafsWithXAxisNearBottom = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withYRange(-1, 20)
            .build()} />
);

export const MafsWithXAxisOffBottom = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withYRange(1, 20)
            .build()} />
);

export const MafsWithXAxisAtTop = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withYRange(-20, 0)
            .build()} />
);

export const MafsWithXAxisOffTop = (
    args: StoryArgs,
): React.ReactElement => (
    <MafsQuestionRenderer question={
        interactiveGraphQuestionBuilder()
            .withYRange(-20, -1)
            .build()} />
);


export const Angle = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={angleQuestion} />
);

export const Circle = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={circleQuestion} />
);

export const Linear = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={linearQuestion} />
);

export const LinearWithLockedPoints = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={linearQuestionWithLockedPoints} />
);

export const LinearSystem = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={linearSystemQuestion} />
);

export const Point = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={pointQuestion} />
);

export const Polygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={polygonQuestion} />
);

export const Ray = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={rayQuestion} />
);

export const Segment = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={segmentQuestion} />
);

export const SegmentWithMafsAndLockedPoints = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{
            flags: {
                mafs: {
                    segment: true,
                },
            },
        }}
        question={segmentWithLockedPointsQuestion}
    />
);

export const SegmentWithMafsAndLockedLines = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{
            flags: {
                mafs: {
                    segment: true,
                },
            },
        }}
        question={segmentWithLockedLineQuestion}
    />
);

export const AllLockedLineSegments = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{
            flags: {
                mafs: {
                    segment: true,
                },
            },
        }}
        question={segmentWithAllLockedLineSegmentVariations}
    />
);

export const AllLockedLines = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{
            flags: {
                mafs: {
                    segment: true,
                },
            },
        }}
        question={segmentWithAllLockedLineVariations}
    />
);

export const Sinusoid = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

function MafsQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return <Renderer
        content={question.content}
        widgets={question.widgets}
        images={question.images}
        apiOptions={{
            flags: {
                mafs: {
                    segment: true,
                },
            },
        }}
    />
}

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"
