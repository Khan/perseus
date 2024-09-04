import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    absoluteValueQuestion,
    multipleAvailableTypesQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
} from "./grapher.testdata";

export default {
    title: "Perseus/Widgets/Grapher",
};

type StoryArgs = Record<any, any>;

export const AbsoluteValueQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={absoluteValueQuestion} />;
};

export const ExponentialQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={exponentialQuestion} />;
};

export const LinearQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={linearQuestion} />;
};

export const LogarithmQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={logarithmQuestion} />;
};

export const QuadraticQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={quadraticQuestion} />;
};

export const SinusoidQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={sinusoidQuestion} />;
};

export const ComplexQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={multipleAvailableTypesQuestion} />;
};
