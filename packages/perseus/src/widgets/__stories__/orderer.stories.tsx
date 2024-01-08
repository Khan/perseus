import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1, questionWithImages} from "../__testdata__/orderer.testdata";

export default {
    title: "Perseus/Widgets/Orderer",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const QuestionWithImages = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={questionWithImages} />;
};
