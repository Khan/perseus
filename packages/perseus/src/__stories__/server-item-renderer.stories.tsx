import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../testing/server-item-renderer-with-debug-ui";
import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {
    itemWithInput,
    itemWithLintingError,
    labelImageItem,
    itemWithMultipleInputNumbers,
    itemWithMultipleWidgetTypes,
} from "../__testdata__/server-item-renderer.testdata";
import {ServerItemRenderer} from "../server-item-renderer";

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

export const WithLintingError = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRenderer
            problemNum={0}
            item={itemWithLintingError}
            dependencies={testDependenciesV2}
            linterContext={{
                contentType: "",
                highlightLint: true,
                paths: [],
                stack: [],
            }}
        />
    );
};

export const InputNumberWithInteractionCallback = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={itemWithMultipleInputNumbers}
            apiOptions={{
                interactionCallback: (data) => {
                    // We are logging the interaction callback data to the console
                    // eslint-disable-next-line no-console
                    console.log(data);
                },
            }}
        />
    );
};

export const MultiWidgetWithInteractionCallback = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={itemWithMultipleWidgetTypes}
            apiOptions={{
                interactionCallback: (data) => {
                    // We are logging the interaction callback data to the console
                    // eslint-disable-next-line no-console
                    console.log(data);
                },
            }}
        />
    );
};
