import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question1} from "./interaction.testdata";

export default {
    title: "Perseus/Widgets/Interaction",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => (
    <RendererWithDebugUI question={question1} />
);
