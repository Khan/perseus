// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {article1} from "../__testdata__/graded-group-set_testdata.js";

type StoryArgs = {|
    isMobile: boolean,
|};

type GradedGroupSetStory = {|
    title: string,
    args: StoryArgs,
|};

export const Article1 = (args: StoryArgs): React.Node => {
    return (
        <RendererWithDebugUI
            apiOptions={{
                isMobile: args.isMobile,
            }}
            question={article1}
        />
    );
};

export default ({
    title: "Perseus/Widgets/Graded Group Set",
    args: {
        isMobile: false,
    },
}: GradedGroupSetStory);
