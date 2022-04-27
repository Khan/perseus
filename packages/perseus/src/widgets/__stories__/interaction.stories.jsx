// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/interaction_testdata.js";

export default {
    title: "Perseus/Widgets/Interaction",
};

type StoryArgs = {||};

export const Question1 = (args: StoryArgs): React.Node => (
    <RendererWithDebugUI question={question1} />
);
