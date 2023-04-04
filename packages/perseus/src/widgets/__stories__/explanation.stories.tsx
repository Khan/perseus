import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1, question2} from "../__testdata__/explanation.testdata";

export default {
    title: "Perseus/Widgets/Explanation",
};

type StoryArgs = Record<any, any>;

export const Question1: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const Question2: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};
