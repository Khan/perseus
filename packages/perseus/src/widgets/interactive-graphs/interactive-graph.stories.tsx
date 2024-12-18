import * as React from "react";

import {Flipbook} from "../../../../../dev/flipbook";
import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    pointQuestion,
    polygonQuestion,
    rayQuestion,
    segmentQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedLineQuestion,
    segmentWithAllLockedLineSegmentVariations,
    segmentWithAllLockedLineVariations,
    segmentWithAllLockedRayVariations,
    sinusoidQuestion,
    segmentWithLockedEllipses,
    segmentWithLockedVectors,
    segmentWithLockedPolygons,
    staticGraphQuestion,
    staticGraphQuestionWithAnotherWidget,
    segmentWithLockedLabels,
    unlimitedPolygonQuestion,
} from "./interactive-graph.testdata";

import type {APIOptions} from "../../types";

export default {
    title: "Perseus/Widgets/Interactive Graph",
};

const enableMafs: APIOptions = {
    flags: {
        mafs: {
            segment: true,
            polygon: true,
            "unlimited-polygon": true,
            "unlimited-point": true,
            angle: true,
            "interactive-graph-locked-features-labels": true,
        },
    },
};

type StoryArgs = Record<any, any>;

export const SideBySideFlipbook = (args: StoryArgs): React.ReactElement => (
    <Flipbook />
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

export const LinearSystem = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={linearSystemQuestion} />
);

export const Point = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={pointQuestion} />
);

export const PointWithMafs = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={pointQuestion}
    />
);

export const Polygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={polygonQuestion} />
);

export const PolygonWithMafs = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={polygonQuestion}
    />
);

export const UnlimitedPolygonWithMafs = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={unlimitedPolygonQuestion}
    />
);

export const PolygonWithMafsReadOnly = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs, readOnly: true}}
        question={polygonQuestion}
    />
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
        apiOptions={{...enableMafs}}
        question={segmentWithLockedPointsQuestion}
    />
);

export const SegmentWithMafsAndLockedLines = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithLockedLineQuestion}
    />
);

export const AllLockedLineSegments = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithAllLockedLineSegmentVariations}
    />
);

export const AllLockedLines = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithAllLockedLineVariations}
    />
);

export const AllLockedRays = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithAllLockedRayVariations}
    />
);

export const LockedVector = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithLockedVectors}
    />
);

export const LockedEllipse = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithLockedEllipses}
    />
);

export const LockedPolygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithLockedPolygons}
    />
);

export const LockedLabel = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...enableMafs}}
        question={segmentWithLockedLabels}
    />
);

export const Sinusoid = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

export const AngleWithMafs = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI apiOptions={enableMafs} question={angleQuestion} />
);

export const StaticGraph = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={enableMafs}
        question={staticGraphQuestion}
    />
);

export const StaticGraphWithAnotherWidget = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={enableMafs}
        question={staticGraphQuestionWithAnotherWidget()}
    />
);

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"
