import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
import {
    absoluteValueQuestion,
    multipleAvailableTypesQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/grapher_testdata' or its corresponding type declarations.
} from '../__testdata__/grapher_testdata';

export default {
    title: "Perseus/Widgets/Grapher",
};

type StoryArgs = Record<any, any>;

export const AbsoluteValueQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={absoluteValueQuestion} />;
};

export const ExponentialQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={exponentialQuestion} />;
};

export const LinearQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={linearQuestion} />;
};

export const LogarithmQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={logarithmQuestion} />;
};

export const QuadraticQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={quadraticQuestion} />;
};

export const SinusoidQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={sinusoidQuestion} />;
};

export const ComplexQuestion: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={multipleAvailableTypesQuestion} />;
};
