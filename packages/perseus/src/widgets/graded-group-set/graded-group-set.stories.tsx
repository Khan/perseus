import {ArticleRendererWithDebugUI} from "../../../../../testing/article-renderer-with-debug-ui";

import {
    article1,
    groupSetRadioRationaleQuestion,
} from "./graded-group-set.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set",
    component: ArticleRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that organizes multiple graded groups into a sequential set,\
                    allowing users to progress through a series of related problems or exercises.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const Article1: Story = {
    args: {
        json: article1,
    },
};

export const GroupSetRadioQuestion: Story = {
    args: {
        json: groupSetRadioRationaleQuestion,
    },
};
