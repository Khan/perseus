import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question} from "../__testdata__/transformer.testdata";

export default {
    title: "Perseus/Widgets/Transformer",
};

type StoryArgs = Record<any, any>;

export const Question = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question} />;
};
