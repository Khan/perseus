// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/number-line_testdata.js";

export default {
    title: "Perseus/Widgets/Number Line",
};

type StoryArgs = {||};

export const Question1 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};
