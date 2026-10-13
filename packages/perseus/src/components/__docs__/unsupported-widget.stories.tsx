import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// PerseusWidgetsMap can't name an unknown widget type.
// eslint-disable-next-line no-restricted-syntax
const widgets = {
    "transformer 1": {type: "transformer", options: {}},
    "never-a-widget 1": {type: "never-a-widget", options: {}},
} as unknown as PerseusWidgetsMap;

const meta: Meta = {
    title: "Components/Unsupported Widget",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

/**
 * Content that names a widget type this build doesn't implement shows this
 * notice in its place.
 */
export const UnknownWidgets: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ transformer 1]]\n\n[[☃ never-a-widget 1]]",
                widgets,
            }),
        }),
    },
};
