import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1} from "../__testdata__/dropdown.testdata";

export default {
    title: "Perseus/Widgets/Dropdown",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
