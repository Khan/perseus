// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {
    question1,
    question2,
    question3,
} from "../__testdata__/passage_testdata.js";

export default {
    title: "Perseus/Widgets/Passage",
};

type StoryArgs = {||};

export const SimpleQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};

export const MultiPassageQuestion = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question2} />;
};

export const SingleNumberedPassage = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question3} />;
};
