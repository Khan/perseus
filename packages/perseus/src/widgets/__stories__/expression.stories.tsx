import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
import {
    expressionItem2,
    expressionItem3,
} from '../__testdata__/expression_testdata';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Widgets/Expression",
} as Story;

export const ExpressionItem2: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={expressionItem2.question} />;
};

export const ExpressionItem3: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={expressionItem3.question} />;
};
