// @flow

import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../testing/server-item-renderer-with-debug-ui.jsx";
import {
    itemWithInput,
    labelImageItem,
} from "../__testdata__/item-renderer_testdata.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Renderers/Server Item Renderer",
}: Story);

export const InputNumberItem = (args: StoryArgs): React.Node => {
    return <ServerItemRendererWithDebugUI item={itemWithInput} />;
};

export const LabelImageItem = (args: StoryArgs): React.Node => {
    return <ServerItemRendererWithDebugUI item={labelImageItem} />;
};
