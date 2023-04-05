import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1} from "../__testdata__/video.testdata";

export default {
    title: "Perseus/Widgets/Video",
};

type StoryArgs = Record<any, any>;

export const Question1: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
