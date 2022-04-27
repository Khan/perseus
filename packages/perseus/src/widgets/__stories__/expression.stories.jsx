// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {
    expressionItem2,
    expressionItem3,
} from "../__testdata__/expression_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Expression",
}: Story);

export const ExpressionItem2 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={expressionItem2.question} />;
};

export const ExpressionItem3 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={expressionItem3.question} />;
};
