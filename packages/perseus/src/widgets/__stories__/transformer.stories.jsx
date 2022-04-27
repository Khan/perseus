// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question} from "../__testdata__/transformer_testdata.js";

export default {
    title: "Perseus/Widgets/Transformer",
};

type StoryArgs = {||};

export const Question = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question} />;
};
