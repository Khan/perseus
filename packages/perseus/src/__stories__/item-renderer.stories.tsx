import * as React from "react";

import {ItemRendererWithDebugUI} from '../../../../testing/item-renderer-with-debug-ui';
import {
    itemWithInput,
    labelImageItem,
} from '../__testdata__/item-renderer_testdata';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Renderers/Item Renderer",
} as Story;

export const InputNumberItem: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <ItemRendererWithDebugUI item={itemWithInput} />;
};

export const LabelImageItem: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <ItemRendererWithDebugUI item={labelImageItem} />;
};
