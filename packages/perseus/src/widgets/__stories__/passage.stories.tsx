import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    question1,
    question2,
    question3,
} from "../__testdata__/passage.testdata";

export default {
    title: "Perseus/Widgets/Passage",
};

type StoryArgs = Record<any, any>;

export const SimpleQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const MultiPassageQuestion = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};

export const SingleNumberedPassage = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question3} />;
};
