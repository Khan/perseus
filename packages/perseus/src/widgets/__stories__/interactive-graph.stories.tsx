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

export const Ray = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={rayQuestion} />
);

export const Segment = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={segmentQuestion} />
);

export const Sinusoid = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"
