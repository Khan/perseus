import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../testing/server-item-renderer-with-debug-ui";
import {
    itemWithInput,
    labelImageItem,
} from "../__testdata__/item-renderer.testdata";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Renderers/Server Item Renderer",
} as Story;

export const InputNumberItem: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={itemWithInput} />;
};

export const LabelImageItem: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={labelImageItem} />;
};
