// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1, question2} from "../__testdata__/explanation_testdata.js";

export default {
    title: "Perseus/Widgets/Explanation",
};

type StoryArgs = {||};

export const Question1 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};

export const Question2 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question2} />;
};
