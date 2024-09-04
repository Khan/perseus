import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1} from "./matrix.testdata";

export default {
    title: "Perseus/Widgets/Matrix",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
