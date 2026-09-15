import * as React from "react";

import {itemWithImageLabelWithNoStyle} from "../../__testdata__/graphie.testdata";
import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../../widgets/__testutils__/story-decorators";
import {imageRegistration} from "../../widgets/image";
import Graphie from "../graphie";

import type {StoryObj, Meta} from "@storybook/react-vite";

type Story = StoryObj<typeof Graphie>;

const meta: Meta = {
    title: "Components/Graphie/Visual Regression Tests",
    component: Graphie,
    decorators: [registerWidgetsDecorator([imageRegistration])],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};
export default meta;

export const LabelsWithNoStyleProperty: Story = {
    render: () => (
        <ServerItemRendererWithDebugUI item={itemWithImageLabelWithNoStyle} />
    ),
};
