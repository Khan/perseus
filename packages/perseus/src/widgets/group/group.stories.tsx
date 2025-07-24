import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {getFullGroupTestItem, question1} from "./group.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Group",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A container widget that allows for logical grouping of multiple widgets,\
                    enabling organized layout and shared context for related interactive elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Answerful: Story = {
    args: {
        item: getFullGroupTestItem(),
    },
};

export const Answerless: Story = {
    args: {
        item: getFullGroupTestItem(),
        startAnswerless: true,
    },
};
