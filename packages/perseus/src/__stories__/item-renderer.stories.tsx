import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../testing/item-renderer-with-debug-ui";
import {
    itemWithInput,
    labelImageItem,
    codeblockItem,
} from "../__testdata__/item-renderer.testdata";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Renderers/Item Renderer",
} as Story;

export const InputNumberItem = (args: StoryArgs): React.ReactElement => {
    return <ItemRendererWithDebugUI item={itemWithInput} />;
};

export const LabelImageItem = (args: StoryArgs): React.ReactElement => {
    return <ItemRendererWithDebugUI item={labelImageItem} />;
};

export const CodeblockItem = (args: StoryArgs): React.ReactElement => {
    return <ItemRendererWithDebugUI item={codeblockItem} />;
};
