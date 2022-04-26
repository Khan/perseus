// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../perseus-testing/renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/passage-ref_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/PassageRef",
}: Story);

export const Question1 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};
