// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
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
} from "../__testdata__/interactive-graph_testdata.js";

export default {
    title: "Perseus/Widgets/Interactive Graph",
};

type StoryArgs = {||};

export const Angle = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={angleQuestion} />
);

export const Circle = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={circleQuestion} />
);

export const Linear = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={linearQuestion} />
);

export const LinearSystem = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={linearSystemQuestion} />
);

export const Point = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={pointQuestion} />
);

export const Polygon = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={polygonQuestion} />
);

export const Ray = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={rayQuestion} />
);

export const Segment = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={segmentQuestion} />
);

export const Sinusoid = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={sinusoidQuestion} />
);

// TODO(jeremy): As of Jan 2022 there are no peresus items in production that
// use the "quadratic" graph type.
// "quadratic"
