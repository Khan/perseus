import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../testing/server-item-renderer-with-debug-ui";
import {
    itemWithInput,
    labelImageItem,
    satPassageItem,
} from "../__testdata__/item-renderer.testdata";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Renderers/Server Item Renderer",
} as Story;

export const InputNumberItem = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={itemWithInput} />;
};

export const LabelImageItem = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={labelImageItem} />;
};

export const SATPassageItem = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={satPassageItem} />;
};

export const SATPassageItemLeftColumn = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={satPassageItem}
            apiOptions={{renderColumn: "left"}}
        />
    );
};

export const SATPassageItemRightColumn = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={satPassageItem}
            apiOptions={{renderColumn: "right"}}
        />
    );
};
