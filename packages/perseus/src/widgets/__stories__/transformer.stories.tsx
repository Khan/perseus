import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/transformer_testdata' or its corresponding type declarations.
import {question} from '../__testdata__/transformer_testdata';

export default {
    title: "Perseus/Widgets/Transformer",
};

type StoryArgs = Record<any, any>;

export const Question: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question} />;
};
