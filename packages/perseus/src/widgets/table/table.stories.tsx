import {
    generateTestPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";

import {generateTableRenderer} from "./test-util";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {tableRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Table",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [registerWidgetsDecorator([tableRegistration])],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to input data into a table with customizable rows and columns.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

const tableItem: PerseusItem = generateTestPerseusItem({
    question: generateTableRenderer(),
});

export const AnswerfulTable: Story = {
    args: {
        item: tableItem,
    },
};

export const AnswerlessTable: Story = {
    args: {
        item: tableItem,
    },
};
