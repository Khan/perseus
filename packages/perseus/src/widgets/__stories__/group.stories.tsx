import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/group_testdata' or its corresponding type declarations.
import {question1} from '../__testdata__/group_testdata';

export default {
    title: "Perseus/Widgets/Group",
};

type StoryArgs = Record<any, any>;

export const Question1: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
