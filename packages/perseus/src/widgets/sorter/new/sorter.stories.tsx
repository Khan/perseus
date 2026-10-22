import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    basicQuestion,
    texQuestion,
    twoCardVerticalQuestion,
} from "../sorter.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = {
    item: PerseusItem;
};

const meta = {
    title: "Widgets/Sorter/Drag and Drop",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    globals: {featureFlags: ["dnd-widget-sorter"]},
    parameters: {
        docs: {
            description: {
                component:
                    "The drag-and-drop Sorter, behind the `dnd-widget-sorter` feature flag. Learners drag each card from the choice bank into a blank, or move it with the card's actions menu.",
            },
        },
    },
    render: (args: StoryArgs) => (
        <ServerItemRendererWithDebugUI item={args.item} />
    ),
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        item: generateTestPerseusItem({question: texQuestion}),
    },
};

export const TextCards: Story = {
    args: {
        item: generateTestPerseusItem({question: basicQuestion}),
    },
};

export const VerticalLayout: Story = {
    args: {
        item: generateTestPerseusItem({question: twoCardVerticalQuestion}),
    },
};
