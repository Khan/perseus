import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/graded-group_testdata' or its corresponding type declarations.
import {question1} from '../__testdata__/graded-group_testdata';

type StoryArgs = {
    isMobile: boolean
};

type Story = {
    title: string,
    args: StoryArgs
};

export const Question1: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <RendererWithDebugUI
            question={question1}
            apiOptions={{
                isMobile: args.isMobile,
            }}
        />
    );
};

export default {
    title: "Perseus/Widgets/Graded Group",
    args: {
        isMobile: false,
    },
} as Story;
