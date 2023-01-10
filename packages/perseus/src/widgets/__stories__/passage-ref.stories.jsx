// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1, question2} from "../__testdata__/passage-ref_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/PassageRef",
}: Story);

export const ShortPassage = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};

export const LongPassage = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question2} />;
};
