import * as React from "react";

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
    sinusoidQuestion,
} from "../__testdata__/interactive-graph.testdata";

export default {
    title: "Perseus/Widgets/Interactive Graph",
};

type StoryArgs = Record<any, any>;

export const Angle: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={angleQuestion} />
);

export const Circle: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={circleQuestion} />
);

export const Linear: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={linearQuestion} />
);

export const LinearSystem: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={linearSystemQuestion} />
);

export const Point: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={pointQuestion} />
);

export const Polygon: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={polygonQuestion} />
);

export const Ray: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={rayQuestion} />
);

export const Segment: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={segmentQuestion} />
);

export const Sinusoid: React.FC<StoryArgs> = (args): React.ReactElement => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"
