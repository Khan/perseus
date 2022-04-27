// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {
    absoluteValueQuestion,
    multipleAvailableTypesQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
} from "../__testdata__/grapher_testdata.js";

export default {
    title: "Perseus/Widgets/Grapher",
};

type StoryArgs = {||};

export const AbsoluteValueQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={absoluteValueQuestion} />;
};

export const ExponentialQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={exponentialQuestion} />;
};

export const LinearQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={linearQuestion} />;
};

export const LogarithmQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={logarithmQuestion} />;
};

export const QuadraticQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={quadraticQuestion} />;
};

export const SinusoidQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={sinusoidQuestion} />;
};

export const ComplexQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={multipleAvailableTypesQuestion} />;
};
