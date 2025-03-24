import {splitPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {Flipbook} from "../../../../../dev/flipbook";
import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {ApiOptions} from "../../perseus-api";

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
    unlimitedPolygonWithCorrectAnswerQuestion,
    angleItem,
    circleItem,
    linearItem,
    linearSystemItem,
    pointItem,
    polygonItem,
    unlimitedPolygonWithCorrectAnswerItem,
    rayItem,
    segmentItem,
    sinusoidItem,
} from "./interactive-graph.testdata";

const defaultApiOptions = ApiOptions.defaults;

export default {
    title: "Perseus/Widgets/Interactive Graph",
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

export const Polygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={polygonQuestion} />
);

export const UnlimitedPolygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={unlimitedPolygonQuestion} />
);

export const Ray = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={rayQuestion} />
);

export const Segment = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={segmentQuestion} />
);

export const Sinusoid = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

export const LockedPoints = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedPointsQuestion}
    />
);

export const LockedLines = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedLineQuestion}
    />
);

export const AllLockedLineSegmentStyles = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithAllLockedLineSegmentVariations}
    />
);

export const AllLockedLineStyles = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithAllLockedLineVariations}
    />
);

export const AllLockedRayStyles = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithAllLockedRayVariations}
    />
);

export const LockedVector = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedVectors}
    />
);

export const LockedEllipse = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedEllipses}
    />
);

export const LockedPolygon = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedPolygons}
    />
);

export const LockedLabel = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={segmentWithLockedLabels}
    />
);

/**
 * Read only mode appears after a question is answered.
 */
export const PolygonReadOnly = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={{...defaultApiOptions, readOnly: true}}
        question={polygonQuestion}
    />
);

/**
 * Content authors can specify if they want a graph to be static, which
 * makes the graph non-interactive. This is generally used for hints.
 */
export const StaticGraph = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={staticGraphQuestion}
    />
);

export const StaticGraphWithAnotherWidget = (
    args: StoryArgs,
): React.ReactElement => (
    <RendererWithDebugUI
        apiOptions={defaultApiOptions}
        question={staticGraphQuestionWithAnotherWidget()}
    />
);

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"

export const AnswerlessAngle = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={angleItem} startAnswerless={true} />
);

export const AnswerlessCircle = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={circleItem} startAnswerless={true} />
);

export const AnswerlessLinear = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={linearItem} startAnswerless={true} />
);

export const AnswerlessLinearSystem = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI
        item={linearSystemItem}
        startAnswerless={true}
    />
);

export const AnswerlessPoint = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={pointItem} startAnswerless={true} />
);

export const AnswerlessPolygon = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={polygonItem} startAnswerless={true} />
);

export const AnswerlessUnlimitedPolygon = (
    args: StoryArgs,
): React.ReactElement => (
    <ServerItemRendererWithDebugUI
        item={unlimitedPolygonWithCorrectAnswerItem}
        startAnswerless={true}
    />
);

export const AnswerlessRay = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={rayItem} startAnswerless={true} />
);

export const AnswerlessSegment = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={segmentItem} startAnswerless={true} />
);

export const AnswerlessSinusoid = (args: StoryArgs): React.ReactElement => (
    <ServerItemRendererWithDebugUI item={sinusoidItem} startAnswerless={true} />
);
