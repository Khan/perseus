import * as React from "react";

import {RendererWithDebugUI} from '../../../../../testing/renderer-with-debug-ui';
import {article1} from '../__testdata__/graded-group-set_testdata';

type StoryArgs = {
    isMobile: boolean
};

type GradedGroupSetStory = {
    title: string,
    args: StoryArgs
};

export const Article1: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <RendererWithDebugUI
            apiOptions={{
                isMobile: args.isMobile,
            }}
            question={article1}
        />
    );
};

export default {
    title: "Perseus/Widgets/Graded Group Set",
    args: {
        isMobile: false,
    },
} as GradedGroupSetStory;
