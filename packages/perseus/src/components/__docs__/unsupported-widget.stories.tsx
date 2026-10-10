import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// PerseusWidgetsMap can't name a widget type Perseus has never known.
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
 * Content that names a widget this build doesn't have, whether removed
 * (`transformer`) or never known (`never-a-widget`), shows this notice in
 * its place.
 */
export const RemovedAndUnknownWidgets: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    "A removed widget:\n\n[[☃ transformer 1]]\n\nA widget Perseus has never known:\n\n[[☃ never-a-widget 1]]",
                widgets,
            }),
        }),
    },
};
