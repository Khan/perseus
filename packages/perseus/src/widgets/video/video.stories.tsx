import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question1, question2, question3} from "./video.testdata";

export default {
    title: "Perseus/Widgets/Video",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const Question2 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};

export const Question3 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question3} />;
};
